import React from 'react'
import { FiX } from 'react-icons/fi'
import { Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, Flex, IconButton, Text } from '@chakra-ui/react'
import SideBarMenuFooter from './SideBarMenuFooter'
import SidebarContent from './SidebarContent'

const MobileMenu = ({isOpen, onClose}) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement='left'
      onClose={onClose}
      size='xs'
    >
      <DrawerContent>
        <Flex borderBottomWidth='1px' justifyContent="space-between" p={3} >
          <Text fontSize={24} fontWeight='bold'>
            MvManagement
          </Text>
          <IconButton onClick={onClose}>
            <FiX  />
          </IconButton>
        </Flex>
        <DrawerBody >
          <Flex w="100%">
            <SidebarContent navSize={"large"}/>
          </Flex>
        </DrawerBody>
        <Divider/>
        <Flex 
          p="3%"
          w="100%"
          justifyContent='center'
        >
          <SideBarMenuFooter/>
        </Flex>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileMenu