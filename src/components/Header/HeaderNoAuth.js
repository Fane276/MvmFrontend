import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MoonIcon, StarIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';

function HeaderNoAuth() {
  const { t, i18n } = useTranslation();
  const { colorMode, toggleColorMode }=useColorMode();
  const [selectedLanguage, setSelectedLanguage] = useState("ro");

  useEffect(() => {
    if(i18n.language==='en'){
      setSelectedLanguage("English")
    }
    else{
      setSelectedLanguage("Romana")
    }
  }, [selectedLanguage]);
  

  const lang = [
    {
      key:"ro",
      value:"Romana"
    },
    {
      key:"en",
      value:"English"
    }
  ]

  const changeLanguage = (languageKey, languageValue)=>{
    i18n.changeLanguage(languageKey);
    setSelectedLanguage(languageValue)
  }

  const headerBgColor = useColorModeValue('gray.100', 'gray.900');

  return (
    <Box bg={headerBgColor} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          MvManagement
        </Box>
        <Flex alignItems={"center"}>
          <Button onClick={toggleColorMode} rounded={'6'}>
            {colorMode === 'light' ? <MoonIcon/>: <SunIcon/>}
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              rounded={'6'}
              cursor={'pointer'}
              minW={0}
              marginLeft={3}
            >
              <HStack >
                <StarIcon/>
                <Text> {t(selectedLanguage)}</Text>
              </HStack>
            </MenuButton>
            <MenuList>
              {
                lang.map((language)=>{
                  return <MenuItem key={language.key} onClick={()=>changeLanguage(language.key, language.value)}> {t(language.value)}</MenuItem>  
                })
              }
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  )
}

export default HeaderNoAuth;
