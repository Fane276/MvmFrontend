import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Box, Divider, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import SideBarMenuFooter from './SideBarMenuFooter';
import SidebarContent from './SidebarContent';

const SidebarMenu = ({ children, ...rest }) => {
  const [ navSize, setNavSize] = useState("large");


  const menuBgColor = useColorModeValue('white','gray.800');
  const menuBorderColor = useColorModeValue('gray.200', 'gray.700');


  return (
    <Flex
      pos="sticky"
      h="100vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      w={navSize === "small" ? "100px" : "300px"}
      flexDir="column"
      justifyContent="space-between"
      backgroundColor={menuBgColor}
      borderRightWidth="1px"
      borderRightColor={menuBorderColor}
      display={{ base: 'none', md: 'flex' }}
      {...rest}
    >
      <Flex
        p="5%"
        flexDir="column"
        alignItems={navSize === "small" ? 'center' : 'flex-start'}
        as="nav"
      >
        <Flex 
          mt={5}
          px={3}
          w="100%"
          alignItems='center'
          justifyContent = "space-between"
        >
        <Text fontSize={16} fontWeight='bold'>
          {navSize === "small"? 
            <Image h='42px'  src='mvm-logo-small.png'/>
            :
            <Image h='42px'  src='mvm-logo-large.png'/>
          }
        </Text>
        {/* <IconButton
          p="0.5"
          background="none"
          _hover={{ backgroud: 'none' }}
          icon={<FiMenu/>}
          onClick={()=>{
              if(navSize === "small"){
                setNavSize("large")
              }
              else{
                setNavSize("small")
              }
          }}
        /> */}
        <Box
          onClick={()=>{
            if(navSize === "small"){
              setNavSize("large")
            }
            else{
              setNavSize("small")
            }
          }}
        >
        {
          navSize === "small"?
          <FiChevronRight/>
          :
          <FiChevronLeft/>
          
        }
        </Box>
        </Flex>
        <SidebarContent navSize={navSize}/>
      </Flex>
      
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? 'center' : 'flex-start'}
        mb={4}
      >
        <Divider />
        <SideBarMenuFooter navSize={navSize}/>
      </Flex>
    </Flex>
  );
};

export default SidebarMenu;
