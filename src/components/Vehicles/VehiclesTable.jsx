import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FiEye, FiTrash } from 'react-icons/fi'
import { useNavigate } from 'react-router';
import { Box, Flex, Select, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import UpdateVehicleModal from '../../modals/vehicles/UpdateVehicleModal';
import { deleteVehicle } from '../../services/Vehicles/vehiclesService';
import { httpRequestAuthenticated } from '../../services/httpService';
import ConfirmDeletionDialog from '../Dialogs/ConfirmDeletionDialog';
import PageButton from './PageButton';

const VehiclesTable = ({shouldUpdate, endpoint}) => {

  const { t } = useTranslation();

  const [maxResultCount, setMaxResultCount] = useState(10);
  const [skipCount, setSkipCount] = useState(0);
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0)
  
  const navigate = useNavigate();

  useEffect(() => {
    const asyncExecuter = async()=>{
      var result = await httpRequestAuthenticated.get(endpoint, {
        params:{
          MaxResultCount: maxResultCount,
          SkipCount: skipCount
        }
      })
      if(result.data.success === true){
        result = result.data.result;
        setItems(result.items);
        setTotalCount(result.totalCount)

        var lastPage= Math.floor(result.totalCount/maxResultCount);
        setLastPage(lastPage)
      }
    }
    asyncExecuter()
    
  }, [endpoint, skipCount, maxResultCount, shouldUpdate, navigate])
  const updateTable = async()=>{
    var result = await httpRequestAuthenticated.get(endpoint, {
      params:{
        MaxResultCount: maxResultCount,
        SkipCount: skipCount
      }
    })
    if(result.data.success === true){
      result = result.data.result;
      setItems(result.items);
      setTotalCount(result.totalCount)

      var lastPage= Math.floor(result.totalCount/maxResultCount);
      setLastPage(lastPage)
    }
  }

  const handlePageChanged=(pageId)=>{
    setCurrentPage(pageId);
    setSkipCount(Math.floor(pageId*maxResultCount));
  }
  
  const handleMaxCountChanged=(event)=>{
    setMaxResultCount(event.target.value);
  }

  return (
    <TableContainer>
      <Table variant='striped' colorScheme='blue'>
        <TableCaption>
          <Flex direction='row' alignItems='center' justifyContent='space-between'>
            <Box>
              {t("CurrentlyDisplayed")} {items.length} {t("outOf")} {totalCount}
            </Box>
            <Box>
              <Select value={maxResultCount} onChange={handleMaxCountChanged} size='sm' borderRadius='10'>
                {
                  [10,15,20,25].map((selectOption)=>{
                    return(
                      <option key={selectOption} value={selectOption}>{selectOption}</option>
                    )
                  })
                }
              </Select>
            </Box>
            <Box>
              <PageButton currentPage={currentPage} lastPage={lastPage} handlePageClick={handlePageChanged}></PageButton>
            </Box>
          </Flex>
        </TableCaption>
        <Thead>
          <Tr>
            <Th textAlign='center'>{t('Title')}</Th>
            <Th textAlign='center'>{t('Make')}</Th>
            <Th textAlign='center'>{t('Model')}</Th>
            <Th textAlign='center'>{t('ProductionYear')}</Th>
            <Th textAlign='center'>{t('RegistrationNumber')}</Th>
            <Th textAlign='center'>{t('Actions')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            items.length>0 ?(
            items.map((item)=>{
              return(

                <Tr key={item.id}>
                <Td textAlign='center'>
                  {item.title}            
                </Td>
                <Td textAlign='center'>
                  {item.makeAuto}            
                </Td>
                <Td textAlign='center'>
                  {item.modelAuto}            
                </Td>
                <Td textAlign='center'>
                  {item.productionYear}            
                </Td>
                <Td textAlign='center'>
                  {item.registrationNumber.toUpperCase()}            
                </Td>
                <Td textAlign='center'>
                  <Flex justifyContent='space-around'>
                    <FiEye onClick={()=>navigate(`/Vehicle/${item.id}`)}/> 
                    <UpdateVehicleModal idVehicle={item.id} style={{marginLeft:'20px'}} updateFunction={updateTable}/> 
                    <ConfirmDeletionDialog name={t("vehicle")} isIcon={true} action={()=>deleteVehicle(item.id)} updateParentFunction={updateTable}>
                      <FiTrash style={{marginLeft:'20px'}} color="#E53E3E"/> 
                    </ConfirmDeletionDialog>
                  </Flex>
                </Td>
              </Tr>
              )
            })
            ) 
            :
            <Tr justifyContent='center' alignItems='center'>
              <Td colSpan={6}>
                <Text textAlign='center'>{t("NoDataAvailable")}</Text>
              </Td>
            </Tr>
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default VehiclesTable