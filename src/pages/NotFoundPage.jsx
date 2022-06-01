import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaCarCrash } from 'react-icons/fa'
import { Text, VStack } from '@chakra-ui/react'
import AppLayoutNotAuth from '../components/Layout/AppLayoutNotAuth'

const NotFoundPage = () => {
  const {t} = useTranslation();
  return (
    <AppLayoutNotAuth>
      <VStack>
        <FaCarCrash size="20%" color="#E53E3E" className='animate__animated animate__bounceIn'/>
        <Text textAlign='center'  fontSize='5xl'>{t("PageYouAreTryingToAccessDoesNotExist")}</Text>
      </VStack>
    </AppLayoutNotAuth>
  )
}

export default NotFoundPage