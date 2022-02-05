import React from 'react';
import { MoonIcon, StarIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Text, VStack, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';

function HeaderNoAuth() {
  const { colorMode, toggleColorMode }=useColorMode();
  const {isOpen, onOpen, onClose} = useDisclosure();

  var headerBgColor = useColorModeValue('gray.100', 'gray.900');

  return (
    <Box bg={headerBgColor} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          MvManagement
        </Box>
        <Flex alignItems={"center"}>
          <Button onClick={toggleColorMode} rounded={'6'}>
            {colorMode === 'light' ? <MoonIcon/>: <SunIcon/>}
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              rounded={'6'}
              cursor={'pointer'}
              minW={0}
              marginLeft={3}
            >
              <HStack >
                <StarIcon/>
                <Text> Romana</Text>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>Romana</MenuItem>  
              <MenuItem>English</MenuItem>  
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  )
}

export default HeaderNoAuth;
