import React, { useState } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'

const ClickableCard = ({onClick, children, ...props}) => {
  const [isHovered, setIsHovered] = useState(false);

  const backgroundColor =  useColorModeValue('white', 'gray.800');
  const borderColorHover =  useColorModeValue('gray.200', 'gray.600');
  const borderColor =  useColorModeValue('gray.100', 'gray.800');

  const onHoverHandler=(state)=>{
    setIsHovered(state);
  }

  return (
    <Box
      w='100%'
      h='100%'
      shadow={isHovered? "lg" : "sm" }
      bgColor={backgroundColor}
      borderRadius='10'
      border='1px'
      borderColor={isHovered? borderColorHover : borderColor }
      onClick={onClick}
      onMouseEnter={()=>onHoverHandler(true)}
      onMouseLeave={()=>onHoverHandler(false)}
      p='3'
      {...props}  
    >
    {children} 
    </Box>
  )
}

export default ClickableCard