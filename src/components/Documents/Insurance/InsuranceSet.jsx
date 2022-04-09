import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import {FiCheckCircle, FiXCircle} from 'react-icons/fi'
import { Box, Flex, Text } from '@chakra-ui/react';
import ClickableCard from '../../Cards/ClickableCard';

const InsuranceSet = ({insuranceType, valabilTo, ...props}) => {
  const {t} = useTranslation(); 
  const [isAvailable, setIsAvailable] = useState(false);
  useEffect(() => {
    var validToMoment = moment(valabilTo);
    var isNotPassed = moment().isSameOrBefore(validToMoment);
    if(isNotPassed){
      setIsAvailable(true);
    }
    else{
      setIsAvailable(false);
    }

  }, [valabilTo])
  

  return (
    <ClickableCard w='100%' h='auto' p='5' {...props}>
      <Flex direction='column' justifyContent='center' alignItems='center' px='15'>
        <Box>
          {isAvailable?  <FiCheckCircle size='50px' color='#38A169'/>: <FiXCircle size='50px' color='#E53E3E'/>}
        </Box>
        {isAvailable?
        <Text fontSize='larger' textAlign='center'>
          {insuranceType === 'casco'?t("CascoInsuranceAvailableTo") : t("MandatoryInsuranceAvailableTo")} 
          {moment(valabilTo).format("DD.MM.yyyy")}
        </Text>
        :
        <Text fontSize='larger' textAlign='center'>
          {insuranceType === 'casco'?t("CascoInsuranceIsExpiredFrom") : t("MandatoryInsuranceIsExpiredFrom")} 
          {moment(valabilTo).add(1,"day").format("DD.MM.yyyy")}
        </Text>
        }
      </Flex>
    </ClickableCard>
  )
}

export default InsuranceSet