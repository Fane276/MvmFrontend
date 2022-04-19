import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'
import { getExpiredDocuments } from '../../services/documents/userDocumentsService'
import Card from '../Cards/Card'
import CardHeader from '../Cards/CardHeader'
import ExpiredDocumentItem from './ExpiredDocumentItem'

const ExpiredDocumentsCard = ({...props}) => {
  const [documentsList, setDocumentsList] = useState([]);

  const {t} = useTranslation();

  useEffect(() => {
    const asyncExecutor = async ()=>{
      await getExpiredDocuments().then((result)=>{
        if(result.status === 200){
          setDocumentsList(result.data.result.items);
        }
      })
    }
    asyncExecutor()
  }, [])

  const borderColor =  useColorModeValue('gray.200', 'gray.700');
  return (
    <Card borderColor={documentsList && documentsList.length >0 ? 'red.600' : borderColor} {...props}>
      <CardHeader title={t("RequiresAtention")}/>
      <SimpleGrid columns={documentsList && documentsList.length >0 ? 2:1} spacing='10px' w='100%' p='5'>
          {documentsList &&
            documentsList.length >0 ?
              documentsList.map((document)=>{
                return <ExpiredDocumentItem document={document} key={document.id}/>
              })
            :
            <Flex w='100%' h={'200px'} justifyContent='center' alignItems='center'>
              <Text textAlign='center'>{t("NoDataAvailable")}</Text>
            </Flex>
          }
      </SimpleGrid>
    </Card>
  )
}

export default ExpiredDocumentsCard