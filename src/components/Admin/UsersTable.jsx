import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Box, Flex, Select, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { httpRequestAuthenticated } from '../../services/httpService';
import PageButton from '../Vehicles/PageButton';

const UsersTable = ({shouldUpdate, endpoint}) => {
  
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
            <Th textAlign='center'>{t('Name')}</Th>
            <Th textAlign='center'>{t('EmailAddress')}</Th>
            <Th textAlign='center'>{t('UserName')}</Th>
            <Th textAlign='center'>{t('CreationDate')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            items.length>0 ?(
            items.map((item)=>{
              return(
                <Tr key={item.id}>
                <Td textAlign='center'>
                  {item.fullName}            
                </Td>
                <Td textAlign='center'>
                  {item.emailAddress}            
                </Td>
                <Td textAlign='center'>
                  {item.userName}            
                </Td>
                <Td textAlign='center'>
                  {moment(item.creationTime).format('DD.MM.yyyy')}            
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

export default UsersTable