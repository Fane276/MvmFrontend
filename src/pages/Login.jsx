import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import AppLayoutNotAuth from '../components/Layout/AppLayoutNotAuth';
import LoginForm from '../components/Login/LoginForm';
import SelectTenantModal from '../components/Login/SelectTenantModal';

function Login() {
  const { t } = useTranslation();

  const bgColor = useColorModeValue('gray.100','gray.900');

  return (
    <AppLayoutNotAuth>
        
        <Flex direction="column" background={bgColor} px={12} pb={12} pt={5} rounded={6} ml='1vh' mr='1vh'>
          <SelectTenantModal/>
          <Flex justifyContent="center" mt={7}>
            <Box textStyle='noAuthFormTitle' mb='5'>
              {t("Login")}
            </Box>
          </Flex>
          <LoginForm/>
        </Flex>
    </AppLayoutNotAuth>
  );
}

export default Login;
