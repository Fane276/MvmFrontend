import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'

const Card = ({children, ...props}) => {
  const backgroundColor =  useColorModeValue('white', 'gray.800');
  const borderColor =  useColorModeValue('gray.200', 'gray.700');
  return (
    <Box 
      w='100%'
      minH='200px'
      shadow="lg"
      bgColor={backgroundColor}
      borderRadius='10'
      borderBottom='1px'
      borderColor={borderColor}
      {...props}
    >
      {children}
    </Box>
  )
}

export default Card