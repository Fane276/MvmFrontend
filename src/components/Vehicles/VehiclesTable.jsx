import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FiEye, FiTrash } from 'react-icons/fi'
import { useNavigate } from 'react-router';
import { Box, Flex, Select, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
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
    
  }, [endpoint, skipCount, maxResultCount, shouldUpdate])
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
            <Th>{t('Title')}</Th>
            <Th>{t('Make')}</Th>
            <Th>{t('Model')}</Th>
            <Th>{t('ProductionYear')}</Th>
            <Th>{t('RegistrationNumber')}</Th>
            <Th>{t('Actions')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            items.map((item)=>{
              return(

                <Tr key={item.id}>
                <Td>
                  {item.title}            
                </Td>
                <Td>
                  {item.makeAuto}            
                </Td>
                <Td>
                  {item.modelAuto}            
                </Td>
                <Td>
                  {item.productionYear}            
                </Td>
                <Td>
                  {item.registrationNumber}            
                </Td>
                <Td>
                  <Flex justifyContent='space-around'>
                    <FiEye onClick={()=>navigate(`/Vehicle/${item.id}`)}/> 
                    <ConfirmDeletionDialog name={t("vehicle")} isIcon={true} action={()=>deleteVehicle(item.id)} updateParentFunction={updateTable}>
                      <FiTrash color="#E53E3E"/> 
                    </ConfirmDeletionDialog>
                  </Flex>
                </Td>
              </Tr>
              )
            })
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default VehiclesTable