import React, { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import CreateCascoInsuranceModal from '../../modals/Documents/CreateCascoInsuranceModal'
import CreateRcaInsuranceModal from '../../modals/Documents/CreateRcaInsuranceModal'
import EditCascoInsuranceModal from '../../modals/Documents/EditCascoInsuranceModal'
import EditRcaInsuranceModal from '../../modals/Documents/EditRcaInsuranceModal'
import { getInsuranceStatus } from '../../services/documents/insuranceService'

const InsuranceCard = ({idvehicle}) => {
  const [rcaIsSet, setRcaIsSet] = useState(false);
  const [cascoIsSet, setCascoIsSet] = useState(false);

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
        <EditRcaInsuranceModal idvehicle={idvehicle} mr='2'/>
        :
        <CreateRcaInsuranceModal idvehicle={idvehicle} mr='2'/>
      }
        {
          cascoIsSet ?
          <EditCascoInsuranceModal idvehicle={idvehicle} ml='2'/>
          :
          <CreateCascoInsuranceModal idvehicle={idvehicle} ml='2'/>
        }
    </Flex>
  )
}

export default InsuranceCard