import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {FiEye, FiEyeOff, FiLock, FiUser} from 'react-icons/fi'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import PulseLoader from 'react-spinners/PulseLoader'
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, useColorModeValue, useToast } from '@chakra-ui/react';
import { getCurrentUserPermissions, getSessionInfo } from '../../services/account/accountService';
import { getAuthTokenCookie, getTenantIdCookie, setTenantIdCookie } from '../../services/cookie/cookieService';
import { httpRequest, httpRequestAuthenticated } from '../../services/httpService';
import {tokenAuth} from '../../services/tokenAuth/tokenAuthService';
import { login } from '../../state/user/userSlice';

const LoginForm = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false)
  const handleClick = () => setShowPassword(!showPassword)
  const dispatch = useDispatch()

  const toast = useToast();
  
  const {handleSubmit, register, formState: { errors, isSubmitting } } = useForm();

  const inputBorderFocusColor = useColorModeValue('purple.600', 'purple.500');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    var tenantIdCookie = getTenantIdCookie();
    if(tenantIdCookie === undefined){
      setTenantIdCookie(1);
      httpRequest.defaults.headers['Abp.TenantId'] = getTenantIdCookie();
    }else{
      httpRequest.defaults.headers['Abp.TenantId'] = tenantIdCookie;
    }

    await tokenAuth(data).then(async (result)=>{
      if(result.status === 200){
        httpRequestAuthenticated.defaults.headers['Abp.TenantId'] = getTenantIdCookie();
        httpRequestAuthenticated.defaults.headers['Authorization'] = `Bearer ${ getAuthTokenCookie()}`;
        var currentSession = await getSessionInfo();
        currentSession = currentSession.data.result;
        var userPermissionsRequest = await getCurrentUserPermissions();
        var permissions = userPermissionsRequest.data.result.items;
        dispatch(login({isAuthenticated:true, currentUser:currentSession.user, currentTenant: currentSession.tenant,isLoading:false, permissions: permissions}));

        navigate("/")
      }
      else{
        toast({
          title: t("WrongUserNameOrPassword"),
          status: 'error',
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
  }


  return (
    <Flex direction='column' mb={3}>
      <FormControl isInvalid={errors.userNameOrEmailAddress}>
        <FormLabel htmlFor='userNameOrEmailAddress'>{t("Email")}</FormLabel>
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
        <FormLabel htmlFor='password'>{t("Password")}</FormLabel>
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
          <FormErrorMessage>Password is required.</FormErrorMessage>
        }
      </FormControl>
      <Button colorScheme='blue' variant='solid' onClick={handleSubmit(onSubmit)} isLoading={isSubmitting} spinner={<PulseLoader size={8} color='white' />} mt='5'>
        {t("Login")}
      </Button>
      <Button colorScheme='blue' variant='outline' onClick={()=>navigate("/register")} mt='2'>
        {t("Register")}
      </Button>
    </Flex>
  )
};

export default LoginForm;
