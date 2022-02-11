import React from 'react'
import { Avatar, Flex, Image, Text } from '@chakra-ui/react'

const SideBarMenuFooter = ({navSize}) => {
  return (
    <Flex flexDir="row" ml={navSize === "small" ? '0' : '4'} mt={{base:"2", md:'4'}} alignItems='center'>
      <Image h='42px'  src='mvm-logo-small.png'/>
      {/* <Heading as="h4" size="sm">MvManagement</Heading> */}
      <Text  display={navSize === "small" ? 'none' : 'inline'} ml={4}>Version 1.0.0</Text>
    </Flex>
  )
}

export default SideBarMenuFooter