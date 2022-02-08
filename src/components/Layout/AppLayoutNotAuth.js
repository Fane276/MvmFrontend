import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import HeaderNoAuth from '../Header/HeaderNoAuth';

function AppLayoutNotAuth({ children, ...props }) {
  const bgGradient =  useColorModeValue('white', 'gray.800')
  return (
    <Flex 
      minH="100vh"
      background={bgGradient}
      direction="column"
      {...props}
    >
      <HeaderNoAuth/>
      <Flex mt="5vh" px="30vw" alignItems="center" justifyContent="center" >

        {children}
      </Flex>
    </Flex>
  )
}

export default AppLayoutNotAuth;
