import React, { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import CreateRcaInsuranceModal from '../../modals/Documents/CreateRcaInsuranceModal'
import { getInsuranceStatus } from '../../services/documents/insuranceService'
import InsuranceNotSet from './Insurance/InsuranceNotSet'

const InsuranceCard = ({idvehicle}) => {
  const [rcaIsSet, setRcaIsSet] = useState(false);
  const [cascoIsSet, setCascoIsSet] = useState(false)

  useEffect(() => {
    const asyncExecutor = async()=>{
      var result = await getInsuranceStatus(idvehicle);

      if(result.status === 200){
        if(result.data.result.rca){
          setRcaIsSet(true);
        }
        if(result.data.result.casco){
          setCascoIsSet(true);
        }
      }

    }
    asyncExecutor();
  }, [idvehicle])
  

  return (
    <Flex direction='row' p='3'>
      {
        rcaIsSet ?
        <Flex>
          is set
        </Flex>
        :
        <CreateRcaInsuranceModal idvehicle={idvehicle} mr='2'/>
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