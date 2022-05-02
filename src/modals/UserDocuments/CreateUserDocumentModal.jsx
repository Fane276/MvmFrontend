import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PulseLoader from 'react-spinners/PulseLoader'
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, ModalFooter, Select, Text, useDisclosure, useToast } from '@chakra-ui/react';
import ChakraDatePicker from '../../components/Form/ChakraDatePicker';
import FileInput from '../../components/Form/FileInput';
import ModalLayout from '../../components/Modals/ModalLayout';
import AppConsts from '../../lib/appconst';
import { UserDocumentType } from '../../lib/userDocTypeConst';
import { saveUserDocument } from '../../services/documents/userDocumentsService';

const CreateUserDocumentModal = ({ children, updateFunction, ...props}) => {
  const {t} = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const userDocumentTypes = Object.getOwnPropertyNames(UserDocumentType).map((value, index)=>{return {value: index, label: value}});

  const [ocrIsLoading, setOcrIsLoading] = useState(false);
  
  const { handleSubmit, register, watch, setValue, control, formState: { errors, isSubmitting } } = useForm();
  
  const documentType = watch("documentType");
  const file_upload = watch("file_upload");

  const onSubmit = async (data)=>{
    data.validFrom = moment(data.validFrom).format();
    data.validTo = moment(data.validTo).format();

    await saveUserDocument(data)
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
    updateFunction()
  }

  useEffect(() => {
    if(file_upload && file_upload[0]){
      var formData = new FormData();
      formData.append("file", file_upload[0]);
      setOcrIsLoading(true);

      axios.post(`${AppConsts.ocrBaseUrl}extract_text`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((result)=>{
        if(result && result.status === 200){
          const dateRegex = new RegExp(/(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)\d\d/);
          var dateFromIsValid = dateRegex.test(result.data.FromDate)
          var dateToIsValid = dateRegex.test(result.data.ToDate)
          if(dateFromIsValid && dateToIsValid){
            var dateFrom = moment(result.data.FromDate, 'DD.MM.yyyy');
            if(dateFrom){
              setValue("validFrom", new Date(dateFrom.format()))
            }
            var dateTo =moment(result.data.ToDate, 'DD.MM.yyyy');
            if(dateTo){
              setValue("validTo", new Date(dateTo.format()))
            }
            setValue('documentType', UserDocumentType.DrivingLicence)

            setOcrIsLoading(false);

            toast({
              title: t("DataExtractedSuccessfully"),
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
          }
        }
      })
      .catch((err)=>{
        setOcrIsLoading(false);
        if(err.response.status === 500){
          toast({
            title: t("DataCouldNotBeExtracted"),
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
          setValue('file_upload',[])
        }
      })
    }
  
  }, [file_upload, setValue, t, toast])
  

  return (
    <>
      <Button onClick={onOpen} {...props}>
        {children}
      </Button>
      <ModalLayout isOpen={isOpen} onClose={onClose} title={t("AddPersonalDocument") } size='5xl'
        footerComponent={
          <ModalFooter alignContent="space-between">
            <Button onClick={onClose}>{t("Cancel")}</Button> 
            <Button onClick={handleSubmit(onSubmit)}  isLoading={isSubmitting} spinner={<PulseLoader size={8} color='white'/>} colorScheme='blue' ml={3}>
              {t("Save")}
            </Button>
          </ModalFooter>
        }
      >
        
        <FormControl isInvalid={errors.documentType}>
          <FormLabel>{t("DocumentType")}</FormLabel>
          <Select defaultValue="-1" placeholder={t("SelectDocumentType")} {...register("documentType", {required: true, setValueAs: v=>parseInt(v)})}>
            {userDocumentTypes.map((elem)=>{
              return (<option key={elem.value} value={elem.value}>{t(elem.label)}</option>)
            })}
          </Select>
          {errors.documentType &&
          <FormErrorMessage>{t("DocumentTypeError")}</FormErrorMessage>
          }
        </FormControl>

        {documentType === 0 && 
          <FormControl isInvalid={errors.otherDocumentType}>
            <FormLabel>{t("OtherDocumentType")}</FormLabel>
            <Input {...register("otherDocumentType", { validate:(value)=>{
              if(documentType === 0 && !value)
                return false;
              return true;
            }})} />
            {errors.otherDocumentType &&
            <FormErrorMessage>{t("OtherDocumentTypeError")}</FormErrorMessage>
            }
          </FormControl>
        }

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
        <Flex justifyContent='center' my='10'>
          <Text>- {t("OR")} -</Text>
        </Flex>
        <FileInput accept='image/jpeg,image/png' multiple={false} control={control} name='file_upload' isLoading={ocrIsLoading}/>
        {/* <Dropzone multiple={false} onDrop={acceptedFiles => console.log(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <Card minH='20px' p='5'>
              <VStack {...getRootProps()}>
                <FiShare size='20px'/>
                <Text>{t("ExtractFromImage")}</Text>
                <input {...getInputProps()} />
              </VStack>
            </Card>
          )}
        </Dropzone> */}
      </ModalLayout>
    </>
  )
}

export default CreateUserDocumentModal