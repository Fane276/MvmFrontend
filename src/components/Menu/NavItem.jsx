import React from 'react'
import { Flex, Icon, Link, Menu, Text, useColorModeValue } from '@chakra-ui/react'

const NavItem = ({navSize, onClick, title, icon, active = false}) => {

  const activeColor = useColorModeValue('blue.100', 'blue.900');
  const iconColor = useColorModeValue('gray.900', 'gray.200');

  return (
    <Flex
      mt={2}
      flexDir="column"
      w="100%"
      alignItems={navSize === 'small' ? 'center' : 'flex-start'}
    >
      <Menu>
        <Link
          backgroundColor={active === true && activeColor}
          p={2}
          borderRadius={8}
          _hover={{textDecor: 'none', backgroundColor: activeColor}}
          w={navSize === 'large' && "100%"}
          onClick={onClick}
        >
          <Flex justifyContent='flex-start'>
            <Icon as={icon} mt={1} mx={navSize === 'small' ? 2 : 0} fontSize='xl' color={iconColor}/>
            <Text ml={4} mt="2px"  display={navSize === 'small' ? 'none' : 'flex'}>{title}</Text>
          </Flex>
        </Link>
      </Menu>

    </Flex>
  )
}

export default NavItem