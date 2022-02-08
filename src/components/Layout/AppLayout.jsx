import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import SidebarMenuWithHeader from '../Menu/SidebarMenuWithHeader';

const AppLayout = ({children, ...props}) => {
  const bgGradient =  useColorModeValue('white', 'gray.800');
  return (
    <Flex 
      minH="100vh"
      background={bgGradient}
      direction="column"
      {...props}
    >
      <SidebarMenuWithHeader>
        <Flex p="4">
          {children}
        </Flex>
      </SidebarMenuWithHeader>
    </Flex>
  )
};

export default AppLayout;
