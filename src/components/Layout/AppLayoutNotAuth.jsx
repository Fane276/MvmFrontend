import React from 'react';
import { Flex, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import HeaderNoAuth from '../Header/HeaderNoAuth';

function AppLayoutNotAuth({ children, ...props }) {
  const bgGradient =  useColorModeValue('white', 'gray.800');
  const [isDesktopScreen] = useMediaQuery('(min-width:480px)');
  return (
    <Flex 
      minH="100vh"
      background={bgGradient}
      direction="column"
      {...props}
    >
      <HeaderNoAuth/>
      <Flex mt="5vh" px={isDesktopScreen? "30vw":"10vw"} alignItems="center" justifyContent="center" >
        {children}
      </Flex>
    </Flex>
  )
}

export default AppLayoutNotAuth;
