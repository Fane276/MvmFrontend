import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {FiPlus, FiUserX} from 'react-icons/fi'
import {GiHomeGarage} from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, SimpleGrid, Text, VStack, useColorModeValue, useMediaQuery } from '@chakra-ui/react'
import UserDocumentCard from '../components/Documents/UserDocuments/UserDocumentCard'
import AppLayout from '../components/Layout/AppLayout'
import CreateUserDocumentModal from '../modals/UserDocuments/CreateUserDocumentModal'
import { getUserDocuments } from '../services/documents/userDocumentsService'

const UserDocumentsPage = () => {
  const [documentsList, setDocumentsList] = useState();
  const {t} = useTranslation();

  useEffect(() => {
    const asyncExecutor = async ()=>{
      await getUserDocuments().then((result)=>{
        if(result.status === 200){
          setDocumentsList(result.data.result.items);
        }
      })
    }
    asyncExecutor()
  }, [])

  const updateComponentHandler = async ()=>{
    await getUserDocuments().then((result)=>{
      if(result.status === 200){
        setDocumentsList(result.data.result.items);
      }
    })
  }

  const [isMobileScreen] = useMediaQuery('(max-width:768px)');
  const backgroundColor =  useColorModeValue('white', 'gray.800');
  return (
    <AppLayout>
      <VStack w="100%">
        <Flex justifyContent='space-between' w='100%'>
          <Box pb='3'>
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to='/'>
                  <GiHomeGarage/>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/Dashboard">
                  {t("Dashboard")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>
                  {t("UserDocuments")}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
          <Box pb='3'>
            <CreateUserDocumentModal bgColor={backgroundColor} updateFunction={updateComponentHandler}>
              <Flex>
                <FiPlus/>
                <Text ml='2'>{t("AddDocument")}</Text>
              </Flex>
            </CreateUserDocumentModal>
          </Box>
        </Flex>
        {documentsList &&
          documentsList.length > 0 ?
          <SimpleGrid columns={!isMobileScreen? '3' : '1'} spacing='20px' w='100%'>
            {
              documentsList.map((document)=>{
                return <UserDocumentCard updateFunction={updateComponentHandler} key={document.id} document={document}/>
              })
            }
          </SimpleGrid>
          :
          <Flex w='100%' h='100%' justifyContent='center' alignItems='center'>
            <VStack>
              <FiUserX className='animate__animated animate__zoomIn' size='100px'/>
              <Text fontSize='3xl'>{t("NoDocumentAddedYet")}</Text>
              <CreateUserDocumentModal bgColor={backgroundColor} updateFunction={updateComponentHandler}>
                <Flex>
                  <Text ml='2'>{t("AddADocumentNow")}</Text>
                </Flex>
              </CreateUserDocumentModal>
            </VStack>
          </Flex>
        }
      </VStack>
    </AppLayout>
  )
}

export default UserDocumentsPage