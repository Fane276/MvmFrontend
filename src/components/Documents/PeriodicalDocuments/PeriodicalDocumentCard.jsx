import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {BsFileEarmarkCheck, BsFileEarmarkExcel} from 'react-icons/bs'
import { FiTrash } from 'react-icons/fi'
import { Flex, Text, VStack, useColorModeValue, useToast } from '@chakra-ui/react'
import UpdatePeriodicalDocumentModal from '../../../modals/PeriodicalDocuments/UpdatePeriodicalDocumentModal'
import { deletePeriodicalDocument } from '../../../services/documents/periodicalDocumentSerivce'
import Card from '../../Cards/Card'
import ConfirmDeletionDialog from '../../Dialogs/ConfirmDeletionDialog'

const PeriodicalDocumentCard = ({ updateFunction, document}) => {
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
    await deletePeriodicalDocument(data)
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
        <Flex justifyContent='center' px='10'>
          {
            isAvailable? 
              <BsFileEarmarkCheck size="70px" color='#38A169'></BsFileEarmarkCheck>
            :
              <BsFileEarmarkExcel size="70px" color='#E53E3E'></BsFileEarmarkExcel>
          }
        </Flex>
        
        <Flex justifyContent='center' px='10'>
          <Text fontSize='2xl'>{t(document.periodicalDocumentType)}</Text>
        </Flex>
        <Flex justifyContent='center' px='10'>
          {
            isAvailable?
              <Text>{t('IsAvailableUntil')} {moment(document.validTo).format("DD.MM.yyyy")}</Text>
            :
              <Text>{t('HasExpiredOn')} {moment(document.validTo).format("DD.MM.yyyy")}</Text>
          }
        </Flex>
        <Flex justifyContent='space-between' w='100%' px='5' pb='2'>
          <UpdatePeriodicalDocumentModal idDocument={document.id} m='0' bgColor={backgroundColor} updateFunction={updateFunction}/>
          <ConfirmDeletionDialog name={t("document")} action={async () => await deleteDocumentHandle({idDocument: document.id, idVehicle: document.idVehicle })} isIcon={true} isButton={true} bgColor={backgroundColor}>
            <FiTrash color='#E53E3E'/>
          </ConfirmDeletionDialog>
        </Flex>

      </VStack>
    </Card>
  )
}

export default PeriodicalDocumentCard