import React, { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import CreateRcaInsuranceModal from '../../modals/Documents/CreateRcaInsuranceModal'
import ClickableCard from '../Cards/ClickableCard'
import InsuranceNotSet from './Insurance/InsuranceNotSet'

const InsuranceCard = ({idVehicle}) => {
  const [rcaIsSet, setRcaIsSet] = useState(false);
  const [cascoIsSet, setCascoIsSet] = useState(false)

  return (
    <Flex direction='row' p='3'>
      {
        rcaIsSet ?
        <Flex>
          is set
        </Flex>
        :
        <CreateRcaInsuranceModal mr='2'/>
      }
        {
          cascoIsSet ?
          <Flex>
            is set
          </Flex>
          :
          <InsuranceNotSet insuranceType='casco'/>
        }
    </Flex>
  )
}

export default InsuranceCard