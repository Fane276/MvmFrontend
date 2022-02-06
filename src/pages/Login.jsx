import React, { useEffect } from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import AppLayoutNotAuth from '../components/Layout/AppLayoutNotAuth';
import LoginForm from '../components/Login/LoginForm';
import SelectTenantModal from '../components/Login/SelectTenantModal';
import useAuth from '../utils/auth/useAuth';

function Login() {

  var [isAuthenticated, currentUser] = useAuth();

  useEffect(() => {
    console.log(isAuthenticated);
    console.log(currentUser);
  }, [isAuthenticated, currentUser]);


  const bgColor = useColorModeValue('gray.100','gray.900');

  return (
    <AppLayoutNotAuth>
        
        <Flex direction="column" background={bgColor} px={12} pb={12} pt={5} rounded={6} ml='1vh' mr='1vh'>
          <SelectTenantModal/>
          <Flex justifyContent="center" mt={7}>
            <Box textStyle='noAuthFormTitle' mb='5'>
              Login
            </Box>
          </Flex>
          <LoginForm/>
        </Flex>
    </AppLayoutNotAuth>
  );
}

export default Login;
