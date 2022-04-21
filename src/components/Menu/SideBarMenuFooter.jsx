import moment from 'moment'
import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

const SideBarMenuFooter = ({navSize}) => {
  return (
    <Flex flexDir="row" ml={navSize === "small" ? '0' : '4'} mt={{base:"2", md:'4'}} alignItems='center'>
      <Text textAlign='center' display={navSize === "small" ? 'none' : 'inline'} ml={4}>©{moment().format('yyyy')} MvManagement </Text>
      <Text textAlign='center' display={navSize === "small" ? 'inline' : 'none'}>©{moment().format('yyyy')}</Text>
    </Flex>
  )
}

export default SideBarMenuFooter