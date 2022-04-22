import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Flex, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import Header from "../Header/Header";
import SidebarMenu from "./SidebarMenu";

export default function SidebarMenuWithHeader({children}) {
  const [ navSize, setNavSize] = useState("large");

  const {collapsed} = useSelector((state)=>state.menu.value);
  
  const [isMobileScreen] = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    if(collapsed){
      setNavSize('small')
    }
    else{
      setNavSize('large')
    }
  }, [collapsed])

  return (
    <Flex bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarMenu />
      <Box w="100%" minH='100vh' pl={!isMobileScreen && (navSize === 'large'? '300px': '100px')}>
        <Header/>
        {children}
      </Box>
    </Flex>
  );
}