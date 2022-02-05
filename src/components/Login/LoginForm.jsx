import React, { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import {FiEye, FiEyeOff, FiLock, FiUser} from 'react-icons/fi'
import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, useColorModeValue } from '@chakra-ui/react';
import { setAuthTokenCookie, setTenantIdCookie } from '../../services/cookie/cookieService';
import { httpRequest } from '../../services/httpService';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClick = () => setShowPassword(!showPassword)


  const {control, handleSubmit, register, formState: { errors } } = useForm();

  const inputBorderFocusColor = useColorModeValue('purple.600', 'purple.500');

  const onSubmit = async (data) => {
    console.log(data);

    var result = await httpRequest.post("api/TokenAuth/Authenticate",{
      ...data,
      rememberClient:true
    })
    console.log(result.data.result);
    await setTenantIdCookie("1");
    await setAuthTokenCookie(result.data.result.accessToken, result.data.result.expireInSeconds);

  }

  const {field: fieldEmail} = useController({
    control: control,
    defaultValue: "",
    name: "userNameOrEmailAddress",
    rules:{
      required: {value: true, message: "Valid email is required"}
    }
  });


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
              _focus={{boxShadow:"0 0 0 3px rgba(0, 0, 0, 0.6);"}}
              onClick={handleClick}>
              {showPassword ? 'Hide' : 'Show'}
            </IconButton>
          </InputRightElement>
        </InputGroup>
        {errors.password && 
          <FormErrorMessage>Email is required.</FormErrorMessage>
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
