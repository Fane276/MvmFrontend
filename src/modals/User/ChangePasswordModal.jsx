import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiEye, FiEyeOff, FiLock, FiUnlock } from 'react-icons/fi';
import PulseLoader from 'react-spinners/PulseLoader'
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, ModalFooter, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import ModalLayout from '../../components/Modals/ModalLayout'
import { changePassword } from '../../services/user/userService';

const ChangePasswordModal = ({ updateFunction, ...props}) => {
  const {t} = useTranslation();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { handleSubmit, register, getValues, formState: { errors, isSubmitting } } = useForm();

  const inputBorderFocusColor = useColorModeValue('purple.600', 'purple.500');
  
  const onSubmit = async (data)=>{
    await changePassword(data)
    .then((result)=>{
      if(result.status === 200){
        toast({
          title: t("PasswordChanged"),
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
    onOpen()
  }

  return (
    <>
      <Button onClick={onOpenHandler} {...props}>
        <HStack spacing='5'>
          <FiLock size='20px'/>
          <Text fontSize='xl'>{t("ChangePassword")}</Text>
        </HStack>
      </Button>
      <ModalLayout isOpen={isOpen} onClose={onClose} title={t("ChangePassword") } size='5xl'
        footerComponent={
          <ModalFooter alignContent="space-between">
            <Button onClick={onClose}>{t("Cancel")}</Button> 
            <Button onClick={handleSubmit(onSubmit)} isLoading={isSubmitting} spinner={<PulseLoader size={8} color='white' />} colorScheme='blue' ml={3}>
              {t("Save")}
            </Button>
          </ModalFooter>
        }
      >
        <FormControl isInvalid={errors.currentPassword} mt='2'>
          <FormLabel>{t("CurrentPassword")}</FormLabel>
          <InputGroup >
            <InputLeftElement pointerEvents='none'>
              <FiUnlock/>
            </InputLeftElement>
            <Input placeholder={t("CurrentPassword")} type={showCurrentPassword ? 'text' : 'password'} focusBorderColor={inputBorderFocusColor}
              {...register('currentPassword', {required: true, })}
              />
            <InputRightElement>
              <IconButton 
                size='sm' 
                aria-label='Show password'
                icon={showCurrentPassword ? <FiEye /> : <FiEyeOff/>}
                onClick={()=>setShowCurrentPassword(!showCurrentPassword)}>
                {showCurrentPassword ? 'Hide' : 'Show'}
              </IconButton>
            </InputRightElement>
          </InputGroup>
          {errors.currentPassword && 
            <FormErrorMessage>{t("CurrentPasswordError")}</FormErrorMessage>
          }
        </FormControl>
        <FormControl isInvalid={errors.newPassword} mt='2'>
          <FormLabel>{t("NewPassword")}</FormLabel>
          <InputGroup >
            <InputLeftElement pointerEvents='none'>
              <FiLock/>
            </InputLeftElement>
            <Input placeholder={t("NewPassword")} type={showPassword ? 'text' : 'password'} focusBorderColor={inputBorderFocusColor}
              {...register('newPassword', {required: true, })}
              />
            <InputRightElement>
              <IconButton 
                size='sm' 
                aria-label='Show password'
                icon={showPassword ? <FiEye /> : <FiEyeOff/>}
                onClick={()=>setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </IconButton>
            </InputRightElement>
          </InputGroup>
          {errors.newPassword && 
            <FormErrorMessage>{t("NewPasswordError")}</FormErrorMessage>
          }
        </FormControl>
        <FormControl isInvalid={errors.confirmPassword} mt='2'>
          <FormLabel>{t("ConfirmPassword")}</FormLabel>
          <InputGroup >
            <InputLeftElement pointerEvents='none'>
              <FiLock/>
            </InputLeftElement>
            <Input placeholder={t("ConfirmPassword")} type={showConfirmPassword ? 'text' : 'password'} focusBorderColor={inputBorderFocusColor}
              {...register('confirmPassword', {required: true, validate:(value)=>{
                if(!value || getValues("newPassword")!==value){
                  return false;
                }
                return true;
              } })}
              />
            <InputRightElement>
              <IconButton 
                size='sm' 
                aria-label='Show confirm password'
                icon={showConfirmPassword ? <FiEye /> : <FiEyeOff/>}
                onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? 'Hide' : 'Show'}
              </IconButton>
            </InputRightElement>
          </InputGroup>
          {errors.confirmPassword && 
            <FormErrorMessage>{t("ConfirmPasswordError")}</FormErrorMessage>
          }
        </FormControl>
      </ModalLayout>
    </>
  )
}

export default ChangePasswordModal