import React, { useContext, useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { FiMenu } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Divider, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { removeAuthTokenCookie, removeTenantIdCookie } from '../../services/cookie/cookieService';
import { login } from '../../state/user/userSlice';
import { AuthContext } from '../Context/AuthContex';
import MobileMenu from '../Menu/MobileMenu';

function Header() {
  const { t, i18n } = useTranslation();
  const { colorMode, toggleColorMode }=useColorMode();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [currentUserLocal, setCurrentUserLocal] = useState(null);

  const navigate = useNavigate()

  const {isAuthenticated, currentUser, isLoading} = useContext(AuthContext);
  const dispatch = useDispatch();

  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(() => {
    if(selectedLanguage == null){

      if(i18n.language==='gb'){
        setSelectedLanguage({countryCode:"gb", name:"English"})
      }
      else{
        setSelectedLanguage({countryCode:"ro", name:"Romana"})
      }
    }
  }, [selectedLanguage, i18n.language, currentUser]);

  useEffect(()=>{
    if(!isLoading){
      if(isAuthenticated){
        setCurrentUserLocal(currentUser);
      }
    }
  },[currentUser, isAuthenticated, isLoading]);
  
  const onLogout = ()=>{
    removeAuthTokenCookie();
    removeTenantIdCookie();

    dispatch(login({isAuthenticated:false, currentUser:null, currentTenant: null,isLoading:false, permissions:[]}));

    navigate("/login")
  }


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

  const headerBgColor = useColorModeValue('white', 'gray.800');
  const headerBorderBgColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={headerBgColor} borderBottom="1px" borderBottomColor={headerBorderBgColor} px={3} mx={4} my={2} borderRadius={14}>
      <Flex h={14} alignItems={'center'} justifyContent={'space-between'}>
        
        <Box display={{ base: 'block', md: 'none' }}>
          <IconButton mr={2} onClick={onOpen}>
            <FiMenu/>
          </IconButton>
          <MobileMenu isOpen={isOpen} onClose={onClose}/>
        </Box>
        <Box display={{ base: 'none', md: 'block' }}>
          
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
              <HStack>
                <ReactCountryFlag countryCode={selectedLanguage?.countryCode} svg/>
                <Text display={{ base: 'none', md: 'block' }}>{t(selectedLanguage?.name)}</Text>
                
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
          <Menu>
            <MenuButton
              rounded='16'
              cursor={'pointer'}
              minW={0}
              marginLeft={3}
            >
              <HStack>
                {/* <Text display={{ base: 'none', md: 'block' }}>{currentUser.name} {currentUser.surname}</Text> */}
                <Avatar size='sm'/>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem mb='1' onClick={()=>navigate('/Profile')}> 
                <Avatar size='sm' ml={3}/>
                <Text ml={3} display={{ base: 'none', md: 'block' }}>{currentUserLocal?.surname} {currentUserLocal?.name}</Text>
              </MenuItem>  
              <Divider/>
              <MenuItem my='1' onClick={()=>navigate('/Profile')}> 
                <Text ml={3}>
                  {t("Settings")}
                </Text>
              </MenuItem>  
              <Divider/>
              <MenuItem onClick={onLogout} mt='1'> 
                <Text ml={3}>
                  {t("Logout")}
                </Text>
              </MenuItem>  
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header;
