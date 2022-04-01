import React from 'react'
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'

const CardHeader = ({title, action, props}) => {
  const borderColor =  useColorModeValue('gray.200', 'gray.700');
  return (
    <Flex 
      w='100%' 
      direction='row' 
      justifyContent='space-between'
      alignItems='center'
      borderBottom="1px"
      borderColor= {borderColor}
      px='3'
      py='2'
      {...props}
    >
      <Text fontSize='2xl'>
        {title}
      </Text>
      <Box>
        {action}
      </Box>
    </Flex>
  )
}

export default CardHeader