import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {FaCar, FaCarCrash, FaRegCalendarTimes} from 'react-icons/fa'
import {FiUser, FiUserX} from 'react-icons/fi'
import { Flex, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { documentType } from '../../lib/userDocTypeConst'
import ClickableCard from '../Cards/ClickableCard'

const ExpiredDocumentItem = ({document}) => {
  const {t} = useTranslation();
   
  const borderColor =  useColorModeValue('gray.200', 'gray.700');
  return (
    <ClickableCard w='100%' minH="100px" borderColor={borderColor}>
      <VStack>
          {document.documentType !== documentType.UserDocument?
        <Flex w='100%' flexDirection='row' justifyContent='center' alignItems='center' pb='1' borderBottomWidth='1px' borderBottomColor={borderColor}>
          <FaCar/>
          <Text ml='2' textAlign='start'>{document.vehicleTitle}</Text>
        </Flex>
        :
        <Flex w='100%' flexDirection='row' justifyContent='center' alignItems='center' pb='1' borderBottomWidth='1px' borderBottomColor={borderColor}>
          <FiUser/>
          <Text ml='2' textAlign='start'>{t("UserDocuments")}</Text>
        </Flex>
          }
        <Flex w='100%' justifyContent='center'>
          {
            document.documentType === documentType.Insurance?
            <FaCarCrash size='42px' color='#E53E3E'/>
            :
            (
              document.documentType === documentType.Periodical?
              <FaRegCalendarTimes size='42px' color='#E53E3E'/>
              :
              <FiUserX size='42px' color='#E53E3E'/>
            )
          }
        </Flex>
        <Flex justifyContent='center' px='10'>
          <Text textAlign='center' fontSize='2xl'>{t(document.name)}</Text>
        </Flex>
        <Flex textAlign='center' justifyContent='center' px='10'>
          <Text>{t('HasExpiredOn')} {moment(document.validTo).format("DD.MM.yyyy")}</Text>
        </Flex>
      </VStack>
    </ClickableCard>
  )
}

export default ExpiredDocumentItem