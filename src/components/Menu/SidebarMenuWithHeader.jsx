import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Header from "../Header/Header";
import SidebarMenu from "./SidebarMenu";

export default function SidebarMenuWithHeader({children}) {
  return (
    <Flex minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarMenu />
      <Box w="100%">
        <Header/>
        {children}
      </Box>
    </Flex>
  );
}