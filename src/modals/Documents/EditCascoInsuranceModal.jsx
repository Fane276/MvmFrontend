import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PulseLoader from 'react-spinners/PulseLoader'
import { Button, FormControl, FormErrorMessage, FormLabel, Input, ModalFooter, useDisclosure, useToast } from '@chakra-ui/react';
import InsuranceSet from '../../components/Documents/Insurance/InsuranceSet';
import ChakraDatePicker from '../../components/Form/ChakraDatePicker';
import Select2 from '../../components/Form/Select2';
import ModalLayout from '../../components/Modals/ModalLayout';
import { getInsuranceStatus, updateInsurance } from '../../services/documents/insuranceService';

const EditCascoInsuranceModal = ({updateFunction, idvehicle, ...props}) => {
  const {t} = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const [validDate, setValidDate] = useState();

  const { handleSubmit, register, setValue, control, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    const asyncExecutor=async()=>{
      var result = await getInsuranceStatus(idvehicle);
      result =result.data.result.casco;
      setValidDate(result.validTo);
      setValue("id", result.id);
      setValue("validFrom", new Date(result.validFrom));
      setValue("validTo", new Date(result.validTo));
      setValue("insurancePolicyNumber", result.insurancePolicyNumber);
      setValue("idInsuranceCompany", result.idInsuranceCompany);
    }
    asyncExecutor();
  }, [idvehicle, setValue])
  


  const onSubmit = async (data)=>{
    data.insuranceType=0;
    data.id= parseInt(data.id); 
    data.idVehicle= parseInt(idvehicle); 
    data.validFrom = moment(data.validFrom).format();
    data.validTo = moment(data.validTo).format();
    data.idInsuranceCompany = data.insuranceCompany.value;

    await updateInsurance(data)
    .then((result)=>{
      if(result.status === 200){
        toast({
          title: t("InsuranceEdited"),
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
  return (
    <>
      <InsuranceSet insuranceType='casco' valabilTo={validDate} onClick={onOpen} {...props} />
      <ModalLayout isOpen={isOpen} onClose={onClose} title={t("ModifyCascoInsurance") } size='5xl'
        footerComponent={
          <ModalFooter alignContent="space-between">
            <Button onClick={onClose}>{t("Cancel")}</Button> 
            <Button onClick={handleSubmit(onSubmit)} isLoading={isSubmitting} spinner={<PulseLoader size={8} color='white'/>} colorScheme='blue' ml={3}>
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
            rules={{required:true}}/>
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

export default EditCascoInsuranceModal