import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {GiHomeGarage} from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, SimpleGrid, VStack, useColorModeValue } from '@chakra-ui/react'
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
            <CreateUserDocumentModal bgColor={backgroundColor} updateFunction={updateComponentHandler}/>
          </Box>
        </Flex>
        <SimpleGrid columns={3} spacing='20px' w='100%'>
          {documentsList &&
            documentsList.map((document)=>{
              return <UserDocumentCard updateFunction={updateComponentHandler} key={document.id} document={document}/>
            })
          }
        </SimpleGrid>
      </VStack>
    </AppLayout>
  )
}

export default UserDocumentsPage