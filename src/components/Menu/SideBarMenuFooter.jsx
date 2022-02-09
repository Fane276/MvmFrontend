import React from 'react'
import { Avatar, Flex, Text } from '@chakra-ui/react'

const SideBarMenuFooter = ({navSize}) => {
  return (
    <Flex flexDir="row" ml={navSize === "small" ? '0' : '4'} mt={{base:"2", md:'4'}} alignItems='center'>
      <Avatar size="sm" />
      {/* <Heading as="h4" size="sm">MvManagement</Heading> */}
      <Text  display={navSize === "small" ? 'none' : 'inline'} ml={4}>Version 1.0.0</Text>
    </Flex>
  )
}

export default SideBarMenuFooter