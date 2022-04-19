import moment from 'moment';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {FiPlus, FiShare} from 'react-icons/fi'
import PulseLoader from 'react-spinners/PulseLoader'
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, ModalFooter, Select, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react';
import Card from '../../components/Cards/Card';
import ChakraDatePicker from '../../components/Form/ChakraDatePicker';
import ModalLayout from '../../components/Modals/ModalLayout';
import { UserDocumentType } from '../../lib/userDocTypeConst';
import { saveUserDocument } from '../../services/documents/userDocumentsService';

const CreateUserDocumentModal = ({ updateFunction, ...props}) => {
  const {t} = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const userDocumentTypes = Object.getOwnPropertyNames(UserDocumentType).map((value, index)=>{return {value: index, label: value}});
  
  const { handleSubmit, register, watch, control, formState: { errors, isSubmitting } } = useForm();
  
  const documentType = watch("documentType");

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
  return (
    <>
      <Button {...props}>
        <Flex onClick={onOpen} >
          <FiPlus/>
          <Text ml='2'>{t("AddDocument")}</Text>
        </Flex>
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
        <Card minH='20px' p='5'>
          <VStack>
            <FiShare size='20px'/>
            <Text>{t("ExtractFromImage")}</Text>
          </VStack>
        </Card>
      </ModalLayout>
    </>
  )
}

export default CreateUserDocumentModal