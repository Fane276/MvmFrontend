import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import {FiTrash} from 'react-icons/fi'
import { useParams } from 'react-router'
import { Box, Divider, Flex, IconButton, Menu, MenuButton, MenuList, Text, useToast } from '@chakra-ui/react';
import Card from '../components/Cards/Card';
import CardHeader from '../components/Cards/CardHeader';
import ConfirmDeletionDialog from '../components/Dialogs/ConfirmDeletionDialog';
import InsuranceCard from '../components/Documents/InsuranceCard';
import AppLayout from '../components/Layout/AppLayout';
import { deleteInsurance, getInsuranceIds } from '../services/documents/insuranceService';

const Vehicle = () => {
  const {t} = useTranslation();
  const { idVehicle } = useParams();

  const [idRca, setIdRca] = useState();
  const [idCasco, setIdCasco] = useState();
  const toast = useToast();

  useEffect(()=>{
    const asyncExecutor = async()=>{
      var result = await getInsuranceIds(idVehicle);
      if(result.status === 200){
        result = result.data.result;
        setIdRca(result.rcaId);
        setIdCasco(result.cascoId);
      }
    }
    asyncExecutor();
  },[idVehicle])

  const delInsurance = async (idInsurance)=>{
    await deleteInsurance(idInsurance)
    .then((result)=>{
      console.log(result);
      if(result.status === 200){
        toast({
          title: t("InsuranceDeleted"),
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    })
    .catch((err)=>{
      if(err){
        toast({
          title: t("AnErrorOccurred"),
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    });
  }

  return (
    <AppLayout>
      <Flex direction='column' w='100%'>
        <Box w='100%' pb='3'>
          <Text fontSize='3xl'>Vehicle {idVehicle}</Text>
        </Box>
        <Flex w="100%" direction='row' justifyContent='space-around'>
          <Box w='100%'>
            <Card>
              <CardHeader 
                title={t("Insurance")}
                action={
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Delete insurance"
                      icon={<FiTrash/>}
                      variant='outline'
                    />
                    <MenuList>
                      <ConfirmDeletionDialog action={async ()=>{await delInsurance(idRca)}} name={t("mandatoryInsurance")} isMenuItem={true}>{t("DeleteMandatoryInsurance")}</ConfirmDeletionDialog>
                      <Divider/>
                      <ConfirmDeletionDialog action={async ()=>{await delInsurance(idCasco)}} name={t("cascoInsurance")} isMenuItem={true}>{t("DeleteMandatoryInsurance")}</ConfirmDeletionDialog>
                    </MenuList>
                  </Menu>
                }
                />
              <InsuranceCard idvehicle={idVehicle}/>
            </Card>
          </Box>
          <Box w='100%'>
          </Box>
        </Flex>
      </Flex>
    </AppLayout>
  )
}

export default Vehicle