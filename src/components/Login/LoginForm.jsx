import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {FiEye, FiEyeOff, FiLock, FiUser} from 'react-icons/fi'
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, useColorModeValue } from '@chakra-ui/react';
import {tokenAuth} from '../../services/tokenAuth/tokenAuthService';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClick = () => setShowPassword(!showPassword)


  const {handleSubmit, register, formState: { errors } } = useForm();

  const inputBorderFocusColor = useColorModeValue('purple.600', 'purple.500');

  const onSubmit = async (data) => {
    try{

      var isSuccess = await tokenAuth(data);
      if(isSuccess){
        console.log("success token auth");
      }
      else{
        console.log("fail token auth");
      }
    }
    catch (err){
      console.log(err);
    }
  }


  return (
    <Flex direction='column' mb={3}>
      <FormControl isInvalid={errors.userNameOrEmailAddress}>
        <FormLabel htmlFor='userNameOrEmailAddress'>Email</FormLabel>
        <InputGroup >
          <InputLeftElement pointerEvents='none'>
            <FiUser/>
          </InputLeftElement>
          <Input placeholder='email@domain.com' focusBorderColor={inputBorderFocusColor}
            {...register('userNameOrEmailAddress', {required: true})}
            />
          
        </InputGroup>
        {errors.userNameOrEmailAddress && 
          <FormErrorMessage>Email is required.</FormErrorMessage>
        }
      </FormControl>
      <FormControl isInvalid={errors.password} mt='2'>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <InputGroup >
          <InputLeftElement pointerEvents='none'>
            <FiLock/>
          </InputLeftElement>
          <Input placeholder='password' type={showPassword ? 'text' : 'password'} focusBorderColor={inputBorderFocusColor}
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
          <FormErrorMessage>Password is required.</FormErrorMessage>
        }
      </FormControl>
      <Button colorScheme='blue' variant='solid' onClick={handleSubmit(onSubmit)} mt='5'>
        Login
      </Button>
      <Button colorScheme='blue' variant='outline' onClick={handleSubmit(onSubmit)} mt='2'>
        Register
      </Button>
    </Flex>
  )
};

export default LoginForm;
