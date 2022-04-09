import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaCar, FaCarCrash } from 'react-icons/fa'
import { Box, Flex, Text } from '@chakra-ui/react'
import ClickableCard from '../../Cards/ClickableCard'

const InsuranceNotSet = ({insuranceType, ...props}) => {

  const {t} = useTranslation();
  return (
    <ClickableCard w='100%' h='auto' p='5' {...props}>
      <Flex direction='column' justifyContent='center' alignItems='center' px='20'>
        <Box>
          {insuranceType === 'casco'? <FaCarCrash size='50px' color='#4299E1' /> : <FaCar size='50px' color='#4299E1'/>}
        </Box>
        <Text fontSize='larger' textAlign='center'>
          {insuranceType === 'casco'?t("CascoInsuranceNotSet") : t("MandatoryInsuranceNotSet")}
        </Text>
      </Flex>
    </ClickableCard>
  )
}

export default InsuranceNotSet