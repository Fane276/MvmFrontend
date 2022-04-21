import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {GiHomeGarage} from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, SimpleGrid, Text, VStack, useColorModeValue, useMediaQuery } from '@chakra-ui/react'
import Card from '../components/Cards/Card'
import AppLayout from '../components/Layout/AppLayout'
import UserProfileCard from '../components/User/UserProfileCard'
import ChangePasswordModal from '../modals/User/ChangePasswordModal'
import ModifyUserInfoModal from '../modals/User/ModifyUserInfoModal'
import { getCurrentUserInfo } from '../services/user/userService'

const Profile = () => {
  const [user, setUser] = useState();
  const {t} = useTranslation();

  useEffect(() => {
    const asyncExecutor = async()=>{
      var result = await getCurrentUserInfo();
      if(result.status === 200){
        setUser(result.data.result);
      }
    }
    asyncExecutor();
  }, [setUser])
  
  const onUpdateHandler = async ()=>{
    var result = await getCurrentUserInfo();
    if(result.status === 200){
      setUser(result.data.result);
    }
  }

 
  const backgroundColor =  useColorModeValue('white', 'gray.800');
  const borderColor =  useColorModeValue('gray.200', 'gray.700');
  const [isMobileScreen] = useMediaQuery('(max-width:768px)');
  return (
    <AppLayout>
      <VStack w='100%'>
        <Box w='100%' pb='3'>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to='/'>
                <GiHomeGarage/>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to='/'>
                {t("Dashboard")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>
                {user && user.fullName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <SimpleGrid columns={!isMobileScreen ? '2' : '1'} spacing='20px' w='100%'>
          {user?
            <UserProfileCard user={user}/>
          :
          <Card>
            <Flex w='100%' h='200px' justifyContent='center' alignItems='center'>
              <Text>{t("UserNotLoggedIn")}</Text>
            </Flex>
          </Card>
          }
          <Flex direction='column' justifyContent='space-around'  py={!isMobileScreen? '10' : '0'} px={!isMobileScreen? '20' : '0'}>
            <ModifyUserInfoModal updateFunction={()=>onUpdateHandler()} w='100%' h="70px" borderColor={borderColor} borderRadius='10' backgroundColor={backgroundColor} shadow="lg" /> 
            <ChangePasswordModal updateFunction={()=>onUpdateHandler()} mt='2' w='100%' h="70px" borderColor={borderColor} borderRadius='10' backgroundColor={backgroundColor} shadow="lg" /> 
          </Flex>
        </SimpleGrid>
      </VStack>
    </AppLayout>
  )
}

export default Profile