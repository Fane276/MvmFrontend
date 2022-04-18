import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FiTrash } from 'react-icons/fi'
import { Box, Flex, Select, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { fuelTypeToString, fuelUnitToString } from '../../lib/vehicleConst';
import { deleteRefill } from '../../services/fuelManagement/fuelManagementService';
import { httpRequestAuthenticated } from '../../services/httpService';
import ConfirmDeletionDialog from '../Dialogs/ConfirmDeletionDialog';
import PageButton from '../Vehicles/PageButton';

const LastRefuelTabel = ({shouldUpdate,endpoint}) => {
  
  const { t } = useTranslation();

  const [maxResultCount, setMaxResultCount] = useState(10);
  const [skipCount, setSkipCount] = useState(0);
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0)

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
            <Th>{t('Quantity')}</Th>
            <Th>{t('FuelType')}</Th>
            <Th>{t('AmountPayed')}</Th>
            <Th w='10'>{t('Actions')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            items.map((item)=>{
              return(

                <Tr key={item.id}>
                <Td>
                  {item.fuelAmount} {t(fuelUnitToString(item.fuelUnit))}            
                </Td>
                <Td>
                  {t(fuelTypeToString(item.fuelType))}            
                </Td>
                <Td>
                  {item.price} LEI
                </Td>
                <Td>
                  <Flex justifyContent='center'>
                    <ConfirmDeletionDialog name={t("refuel")} isIcon={true} action={()=>deleteRefill(item.id)}>
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

export default LastRefuelTabel