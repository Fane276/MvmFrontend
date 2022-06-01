import moment from 'moment';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {FiPlus} from 'react-icons/fi'
import PulseLoader from 'react-spinners/PulseLoader'
import { Button, FormControl, FormErrorMessage, FormLabel, IconButton, ModalFooter, Select, useDisclosure, useToast } from '@chakra-ui/react';
import ChakraDatePicker from '../../components/Form/ChakraDatePicker';
import ModalLayout from '../../components/Modals/ModalLayout';
import { getPeriodicalDocumentsTypes, savePeriodicalDocument } from '../../services/documents/periodicalDocumentSerivce';

const CreatePeriodicalDocumentModal = ({ updateFunction, idvehicle, ...props}) => {
  const {t} = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [documentTypes, setDocumentTypes] = useState([])

  const toast = useToast();

  const { reset, handleSubmit, register, control, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data)=>{
    data.idVehicle = parseInt(idvehicle); 
    data.validFrom = moment(data.validFrom).format();
    data.validTo = moment(data.validTo).format();
    await savePeriodicalDocument(data)
    .then((result)=>{
      if(result.status === 200){
        toast({
          title: t("DocumentAdded"),
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

  const handleOnOpen = async ()=>{
    var result = await getPeriodicalDocumentsTypes();
    if(result.status === 200){
      var periodicalDocumentTypes = result.data.result.items
      setDocumentTypes(periodicalDocumentTypes);
    }
    
    reset(undefined, {
      dirtyFields: false
    })
    onOpen()
  }

  return (
    <>
      <IconButton onClick={handleOnOpen} {...props}>
        <FiPlus/>
      </IconButton>
      <ModalLayout isOpen={isOpen} onClose={onClose} title={t("AddPeriodicalDocument") } size='5xl'
        footerComponent={
          <ModalFooter alignContent="space-between">
            <Button onClick={onClose}>{t("Cancel")}</Button> 
            <Button onClick={handleSubmit(onSubmit)}  isLoading={isSubmitting} spinner={<PulseLoader size={8} color='white'/>} colorScheme='blue' ml={3}>
              {t("Save")}
            </Button>
          </ModalFooter>
        }
      >
        <FormControl isInvalid={errors.idPeriodicalDocumentType}>
          <FormLabel>{t("DocumentType")}</FormLabel>
          <Select defaultValue="-1" placeholder={t("SelectDocumentType")} {...register("idPeriodicalDocumentType", {required: true, setValueAs: v=>parseInt(v)})}>
            {documentTypes.map((elem)=>{
              return (<option key={elem.value} value={elem.value}>{t(elem.text)}</option>)
            })}
          </Select>
          {errors.idPeriodicalDocumentType &&
          <FormErrorMessage>{t("DocumentTypeError")}</FormErrorMessage>
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

export default CreatePeriodicalDocumentModal