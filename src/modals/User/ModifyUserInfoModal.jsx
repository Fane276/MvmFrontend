import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiEdit3 } from 'react-icons/fi';
import PulseLoader from 'react-spinners/PulseLoader'
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, ModalFooter, Text, useDisclosure, useToast } from '@chakra-ui/react';
import ModalLayout from '../../components/Modals/ModalLayout'
import ValidationRules from '../../lib/validationRules';
import { getCurrentUserInfo, updateUserInfo } from '../../services/user/userService';

const ModifyUserInfoModal = ({ updateFunction, ...props}) => {
  const {t} = useTranslation();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { handleSubmit, register, setValue, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data)=>{
    await updateUserInfo(data)
    .then((result)=>{
      if(result.status === 200){
        toast({
          title: t("InformationUpdated"),
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    })
    .catch((err)=>{
      if(err){
        if(err.data.error.message){
          toast({
            title: err.data.error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
        else{
          toast({
            title: t("AnErrorOccurred"),
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      }
    });

    onClose();
    updateFunction();
  }

  const onOpenHandler = async ()=>{
    var result = await getCurrentUserInfo()
    if(result.status === 200){
      var document = result.data.result;
      setValue("id", document.id);
      setValue("userName", document.userName);
      setValue("surname", document.surname);
      setValue("name", document.name);
      setValue("emailAddress", document.emailAddress);
    }
    onOpen()
  }

  return (
    <>
      <Button onClick={onOpenHandler} {...props}>
        <HStack spacing='5'>
          <FiEdit3 size='20px'/>
          <Text fontSize='xl'>{t("EditYourInformation")}</Text>
        </HStack>
      </Button>
      <ModalLayout isOpen={isOpen} onClose={onClose} title={t("EditYourInformation") } size='5xl'
        footerComponent={
          <ModalFooter alignContent="space-between">
            <Button onClick={onClose}>{t("Cancel")}</Button> 
            <Button onClick={handleSubmit(onSubmit)} isLoading={isSubmitting} spinner={<PulseLoader size={8} color='white' />} colorScheme='blue' ml={3}>
              {t("Save")}
            </Button>
          </ModalFooter>
        }
      >
        <FormControl isInvalid={errors.userName}>
          <FormLabel>{t("Username")}</FormLabel>
          <Input {...register("userName", { required: true })} />
          {errors.userName &&
          <FormErrorMessage>{t("UsernameError")}</FormErrorMessage>
          }
        </FormControl> 

        <FormControl isInvalid={errors.surname}>
          <FormLabel>{t("Surname")}</FormLabel>
          <Input {...register("surname", { required: true })} />
          {errors.surname &&
          <FormErrorMessage>{t("SurnameError")}</FormErrorMessage>
          }
        </FormControl> 

        <FormControl isInvalid={errors.name}>
          <FormLabel>{t("Name")}</FormLabel>
          <Input {...register("name", { required: true })} />
          {errors.name &&
          <FormErrorMessage>{t("NameError")}</FormErrorMessage>
          }
        </FormControl> 

        <FormControl isInvalid={errors.emailAddress}>
          <FormLabel>{t("EmailAddress")}</FormLabel>
          <Input {...register("emailAddress", {required: true, pattern: ValidationRules.emailValidation})} />
          {errors.emailAddress &&
          <FormErrorMessage>{t("EmailAddressError")}</FormErrorMessage>
          }
        </FormControl> 
      </ModalLayout>
    </>
  )
}

export default ModifyUserInfoModal