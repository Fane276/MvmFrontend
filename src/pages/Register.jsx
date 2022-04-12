import React from 'react'
import { useTranslation } from 'react-i18next';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import AppLayoutNotAuth from '../components/Layout/AppLayoutNotAuth';
import SelectTenantModal from '../components/Login/SelectTenantModal';
import RegisterForm from '../components/Register/RegisterForm';

const Register = () => {
  const { t } = useTranslation();

  const bgColor = useColorModeValue('gray.100','gray.900');

  return (
    <AppLayoutNotAuth>
        <Flex direction="column" background={bgColor} px={12} pb={12} pt={5} rounded={6} mx='1vh' w='100%'>
          <SelectTenantModal/>
          <Flex justifyContent="center" mt={7}>
            <Box textStyle='noAuthFormTitle' mb='5'>
              {t("Register")}
            </Box>
          </Flex>
          <RegisterForm/>
        </Flex>
    </AppLayoutNotAuth>
  );
}

export default Register