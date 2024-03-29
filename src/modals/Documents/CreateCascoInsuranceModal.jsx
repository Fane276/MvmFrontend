import moment from 'moment';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PulseLoader from 'react-spinners/PulseLoader'
import { Button, FormControl, FormErrorMessage, FormLabel, Input, ModalFooter, useDisclosure, useToast } from '@chakra-ui/react';
import InsuranceNotSet from '../../components/Documents/Insurance/InsuranceNotSet';
import ChakraDatePicker from '../../components/Form/ChakraDatePicker';
import Select2 from '../../components/Form/Select2';
import ModalLayout from '../../components/Modals/ModalLayout';
import { saveInsurance } from '../../services/documents/insuranceService';

const CreateCascoInsuranceModal = ({ updateFunction, idvehicle, ...props}) => {
  const {t} = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();

  const { reset, handleSubmit, register, setValue, control, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data)=>{
    data.insuranceType=1;
    data.idVehicle = parseInt(idvehicle); 
    data.validFrom = moment(data.validFrom).format();
    data.validTo = moment(data.validTo).format();
    data.idInsuranceCompany = data.insuranceCompany.value;
    
    await saveInsurance(data)
    .then((result)=>{
      if(result.status === 200){
        toast({
          title: t("InsuranceAdded"),
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    })
    .catch((err)=>{
      if(err){

        toast({
          title: t("AnErrorOccurred"),
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
    );
    
    onClose();
    updateFunction();
  }

  const handleOpen = () => { 
    reset(undefined, {
      dirtyFields: false
    })
    onOpen()
  }


  return (
    <>
      <InsuranceNotSet insuranceType='casco' onClick={handleOpen} {...props}/>
      <ModalLayout isOpen={isOpen} onClose={onClose} title={t("AddCascoInsurance") } size='5xl'
        footerComponent={
          <ModalFooter alignContent="space-between">
            <Button onClick={onClose}>{t("Cancel")}</Button> 
            <Button onClick={handleSubmit(onSubmit)}  isLoading={isSubmitting} spinner={<PulseLoader size={8} color='white'/>} colorScheme='blue' ml={3}>
              {t("Save")}
            </Button>
          </ModalFooter>
        }
      >
        <FormControl mt='2' isInvalid={errors.insuranceCompany}>
          <FormLabel>{t("InsuranceCompany")}</FormLabel>
          <Select2 
            valueName="value"
            textName="text"
            endpoint='/api/services/app/InsuranceCatalogue/GetInsuranceCompanies' 
            control={control} 
            setValue={setValue} 
            register={register} 
            name='insuranceCompany' 
            rules={{required:true}}
            />
          {errors.insuranceCompany &&
          <FormErrorMessage>{t("InsuranceCompanyError")}</FormErrorMessage>
          }
        </FormControl>
        
        <FormControl isInvalid={errors.insurancePolicyNumber}>
          <FormLabel>{t("InsurancePolicyNumber")}</FormLabel>
          <Input {...register("insurancePolicyNumber", { required: true })} />
          {errors.insurancePolicyNumber &&
          <FormErrorMessage>{t("InsurancePolicyNumberError")}</FormErrorMessage>
          }
        </FormControl>
        
        <FormControl isInvalid={errors.validFrom}>
          <FormLabel>{t("ValidFrom")}</FormLabel>
          <ChakraDatePicker
          control={control}
          name='validFrom'
          rules={{ required: true }}
          />
          {errors.validFrom &&
          <FormErrorMessage>{t("ValidFromError")}</FormErrorMessage>
          }
        </FormControl>
        
        <FormControl isInvalid={errors.validTo}>
          <FormLabel>{t("ValidTo")}</FormLabel>
          <ChakraDatePicker
          control={control}
          name='validTo'
          rules={{ required: true }}
          />
          {errors.validTo &&
          <FormErrorMessage>{t("ValidToError")}</FormErrorMessage>
          }
        </FormControl>
      </ModalLayout>
    </>
  )
}

export default CreateCascoInsuranceModal