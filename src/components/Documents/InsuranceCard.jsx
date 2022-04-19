import React, { useEffect, useState } from 'react'
import { Flex, useMediaQuery } from '@chakra-ui/react'
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

  const updateInsuranceStatus = async()=>{
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
  

  const [isMobileScreen] = useMediaQuery('(max-width:768px)');
  return (
    <Flex direction={!isMobileScreen? 'row': 'column'} p='3'>
      {
        rcaIsSet ?
        <EditRcaInsuranceModal updateFunction={updateInsuranceStatus} idvehicle={idvehicle} mr={!isMobileScreen? '2': '0'}/>
        :
        <CreateRcaInsuranceModal updateFunction={updateInsuranceStatus} idvehicle={idvehicle} mr={!isMobileScreen? '2': '0'}/>
      }
        {
          cascoIsSet ?
          <EditCascoInsuranceModal updateFunction={updateInsuranceStatus} idvehicle={idvehicle} ml={!isMobileScreen? '2': '0'} mt={!isMobileScreen? '0': '2'}/>
          :
          <CreateCascoInsuranceModal updateFunction={updateInsuranceStatus} idvehicle={idvehicle} ml={!isMobileScreen? '2': '0'} mt={!isMobileScreen? '0': '2'}/>
        }
    </Flex>
  )
}

export default InsuranceCard