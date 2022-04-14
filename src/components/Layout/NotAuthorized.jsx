import React from 'react'
import { useTranslation } from 'react-i18next'
import {GiPoliceCar} from 'react-icons/gi'
import { Text, VStack } from '@chakra-ui/react'

const NotAuthorized = () => {
  const {t}= useTranslation();
  return (
    <VStack>
      <GiPoliceCar size="10%" color="#E53E3E" className='animate__animated animate__pulse animate__slow animate__infinite'/>
      <Text textAlign='center'  fontSize='5xl'>{t("NotAuthorizedToViewThisPage")}</Text>
    </VStack>
  )
}

export default NotAuthorized