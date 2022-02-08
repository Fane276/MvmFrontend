import React from 'react';
import { Box, CloseButton, Flex, Text, useColorModeValue } from '@chakra-ui/react';

const SidebarContent = ({ onClose, ...rest }) => {

  const menuBgColor = useColorModeValue('white','gray.900');
  const menuBorderColor = useColorModeValue('gray.200', 'gray.700');


  return (
    <Box
      transition="3s ease"
      bg={menuBgColor}
      borderRight="1px"
      borderRightColor={menuBorderColor}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h={14} alignItems="center" px="8" justifyContent="space-between" borderBottom="0px" borderBottomColor={menuBorderColor}>
        <Text fontSize="xl" fontWeight="bold">
        MvManagement
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {/* {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))} */}
    </Box>
  );
};

export default SidebarContent;
