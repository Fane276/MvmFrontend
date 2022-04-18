import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {FaRegAddressCard} from 'react-icons/fa'
import {FiEdit, FiFileText, FiTrash} from 'react-icons/fi'
import {GiKeyCard} from 'react-icons/gi'
import { Flex, IconButton, Text, VStack, useColorModeValue, useToast } from '@chakra-ui/react'
import { deleteUserDocument } from '../../../services/documents/userDocumentsService'
import Card from '../../Cards/Card'
import ConfirmDeletionDialog from '../../Dialogs/ConfirmDeletionDialog'

const UserDocumentCard = ({ updateFunction, document}) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const {t} = useTranslation()
  const toast = useToast()

  useEffect(() => {
    var validToMoment = moment(document.validTo);
    var isNotPassed = moment().isSameOrBefore(validToMoment);
    if(isNotPassed){
      setIsAvailable(true);
    }
    else{
      setIsAvailable(false);
    }
  }, [document])

  const deleteDocumentHandle = async (data) =>{
    await deleteUserDocument(data)
    .then((result)=>{
      if(result.status === 200){
        toast({
          title: t("DocumentDeleted"),
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        updateFunction();
      }
    })
    .catch((err)=>{
      if(err){

        toast({
          title: t("AnErrorOccurred"),
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
    );
  }
  

  const backgroundColor =  useColorModeValue('white', 'gray.800');
  const borderColor =  useColorModeValue('gray.200', 'gray.700');
  return (
    <Card w='100%' borderColor={!isAvailable? 'red.600' : borderColor} pt='5'>
      <VStack>
        <Flex justifyContent='center' px='20'>
          {
            document.documentType === 1? 
              <GiKeyCard size="70px"></GiKeyCard>
            :
            (
              document.documentType === 2?
                <FaRegAddressCard size="70px"></FaRegAddressCard>
              :
                <FiFileText size="70px"></FiFileText>
              )
            }
        </Flex>
        
        <Flex justifyContent='center' px='20'>
          {
            document.documentType === 1? 
              <Text fontSize='2xl'>{t('DrivingLicence')}</Text>
            :
            (
              document.documentType === 2?
                <Text fontSize='2xl'>{t('IdCard')}</Text>
              :
                <Text fontSize='2xl'>{document.otherDocumentType}</Text>
              )
            }
          
        </Flex>
        <Flex justifyContent='center' px='20'>
          {
            isAvailable?
              <Text>{t('IsAvailableUntil')} {moment(document.validTo).format("DD.MM.yyyy")}</Text>
            :
              <Text>{t('HasExpiredOn')} {moment(document.validTo).format("DD.MM.yyyy")}</Text>
          }
        </Flex>
        <Flex justifyContent='flex-end' w='100%' px='5' pb='2'>
          <IconButton m='0' bgColor={backgroundColor}>
            <FiEdit/>
          </IconButton>
          <ConfirmDeletionDialog name={t("document")} action={async () => await deleteDocumentHandle(document.id)} isIcon={true} isButton={true} bgColor={backgroundColor}>
            <FiTrash/>
          </ConfirmDeletionDialog>
        </Flex>

      </VStack>
    </Card>
  )
}

export default UserDocumentCard