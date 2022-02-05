import React from 'react';
import { Flex, LinkOverlay, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import HeaderNoAuth from '../Header/HeaderNoAuth';

function AppLayoutNotAuth({ children, ...props }) {
  const [minWidth1024] = useMediaQuery("(min-width: 1024px)");
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
