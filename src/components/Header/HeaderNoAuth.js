import React, { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue, useMediaQuery } from '@chakra-ui/react';

function HeaderNoAuth() {
  const { t, i18n } = useTranslation();
  const { colorMode, toggleColorMode }=useColorMode();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isMobileScreen] = useMediaQuery('(min-width:480px)');

  useEffect(() => {
    if(selectedLanguage == null){

      if(i18n.language==='gb'){
        setSelectedLanguage({countryCode:"gb", name:"English"})
      }
      else{
        setSelectedLanguage({countryCode:"ro", name:"Romana"})
      }
    }
  }, [selectedLanguage,i18n.language]);
  

  const lang = [
    {
      key:"ro",
      value:"Romana"
    },
    {
      key:"gb",
      value:"English"
    }
  ]

  const changeLanguage = (languageKey, languageValue)=>{
    if(languageKey==='gb'){
      i18n.changeLanguage("en");
      setSelectedLanguage({countryCode:"gb", name:"English"})
    }
    else{
      i18n.changeLanguage(languageKey);
      setSelectedLanguage({countryCode: languageKey, name: languageValue})
    }
  }

  const headerBgColor = useColorModeValue('gray.100', 'gray.900');
  const headerBorderBgColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={headerBgColor} borderBottom={1} borderBottomColor={headerBorderBgColor} px={4} mx={4} my={2} borderRadius={14}>
      <Flex h={14} alignItems={'center'} justifyContent={'space-between'}>
        <Box ml='3'>
          {
            isMobileScreen?
            <Image h='42px'  src='mvm-logo-large.png'/>
            :
            <Image h='42px'  src='mvm-logo-small.png'/>
          }
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
                <ReactCountryFlag countryCode={selectedLanguage?.countryCode} svg/>
                <Text> {t(selectedLanguage?.name)}</Text>
              </HStack>
            </MenuButton>
            <MenuList>
              {
                lang.map((language)=>{
                  return <MenuItem key={language.key} onClick={()=>changeLanguage(language.key, language.value)}> 
                  <ReactCountryFlag countryCode={language.key} svg/>
                  <Text ml={3}>
                    {t(language.value)}
                  </Text>
                  </MenuItem>  
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
