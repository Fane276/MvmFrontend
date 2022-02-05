import React from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import AppLayoutNotAuth from '../components/Layout/AppLayoutNotAuth';
import LoginForm from '../components/Login/LoginForm';

function Login() {

  const bgColor = useColorModeValue('gray.100','gray.900');

  return (
    <AppLayoutNotAuth>
        <Flex direction="column" background={bgColor} p={12} rounded={6} ml='1vh' mr='1vh'>
          <Flex justifyContent="center">
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
