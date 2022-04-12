import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaRegAddressCard } from 'react-icons/fa'
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from 'react-icons/fi'
import { useNavigate } from 'react-router';
import PulseLoader from 'react-spinners/PulseLoader'
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, useColorModeValue, useToast } from '@chakra-ui/react';
import ValidationRules from '../../lib/validationRules';
import { registerUser } from '../../services/account/accountService';

const RegisterForm = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleClick = () => setShowPassword(!showPassword)
  const toast = useToast()
  const {handleSubmit, register, getValues, formState: { errors, isSubmitting } } = useForm();

  const inputBorderFocusColor = useColorModeValue('purple.600', 'purple.500');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await registerUser(data)
    .then((result)=>{
      if(result.status === 200){
        toast({
          title: t("AccountCreated"),
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        navigate('/login');
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
  }


  return (
    <Flex direction='column' mb={3}>
      <FormControl isInvalid={errors.surname}>
        <FormLabel>{t("Surname")}</FormLabel>
        <InputGroup >
          <InputLeftElement pointerEvents='none'>
            <FiUser/>
          </InputLeftElement>
          <Input placeholder={t("Surname")} focusBorderColor={inputBorderFocusColor}
            {...register('surname', {required: true})}
            />
          
        </InputGroup>
        {errors.surname && 
          <FormErrorMessage>{t("SurnameError")}</FormErrorMessage>
        }
      </FormControl>
      <FormControl isInvalid={errors.name}>
        <FormLabel>{t("Name")}</FormLabel>
        <InputGroup >
          <InputLeftElement pointerEvents='none'>
            <FiUser/>
          </InputLeftElement>
          <Input placeholder={t("Name")} focusBorderColor={inputBorderFocusColor}
            {...register('name', {required: true})}
            />
          
        </InputGroup>
        {errors.name && 
          <FormErrorMessage>{t("NameError")}</FormErrorMessage>
        }
      </FormControl>
      <FormControl isInvalid={errors.userName}>
        <FormLabel>{t("UserName")}</FormLabel>
        <InputGroup >
          <InputLeftElement pointerEvents='none'>
            <FaRegAddressCard/>
          </InputLeftElement>
          <Input placeholder={t("UserName")} focusBorderColor={inputBorderFocusColor}
            {...register('userName', {required: true})}
            />
          
        </InputGroup>
        {errors.userName && 
          <FormErrorMessage>{t("UserNameError")}</FormErrorMessage>
        }
      </FormControl>
      <FormControl isInvalid={errors.emailAddress}>
        <FormLabel>{t("Email")}</FormLabel>
        <InputGroup >
          <InputLeftElement pointerEvents='none'>
            <FiMail/>
          </InputLeftElement>
          <Input placeholder='email@domain.com' focusBorderColor={inputBorderFocusColor}
            {...register('emailAddress', {required: true, pattern: ValidationRules.emailValidation})}
            />
          
        </InputGroup>
        {errors.emailAddress && 
          <FormErrorMessage>{t("EmailError")}</FormErrorMessage>
        }
      </FormControl>
      <FormControl isInvalid={errors.password} mt='2'>
        <FormLabel>{t("Password")}</FormLabel>
        <InputGroup >
          <InputLeftElement pointerEvents='none'>
            <FiLock/>
          </InputLeftElement>
          <Input placeholder={t("Password")} type={showPassword ? 'text' : 'password'} focusBorderColor={inputBorderFocusColor}
            {...register('password', {required: true, })}
            />
          <InputRightElement>
            <IconButton 
              size='sm' 
              aria-label='Show password'
              icon={showPassword ? <FiEye /> : <FiEyeOff/>}
              onClick={handleClick}>
              {showPassword ? 'Hide' : 'Show'}
            </IconButton>
          </InputRightElement>
        </InputGroup>
        {errors.password && 
          <FormErrorMessage>{t("PasswordError")}</FormErrorMessage>
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
              if(!value || getValues("password")!==value){
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
      <Button colorScheme='blue' variant='solid' onClick={handleSubmit(onSubmit)} isLoading={isSubmitting} spinner={<PulseLoader size={8} color='white' />} mt='5'>
        {t("Register")}
      </Button>
      <Button colorScheme='blue' variant='outline' onClick={()=>navigate("/login")} mt='2'>
        {t("Login")}
      </Button>
    </Flex>
  )
}

export default RegisterForm