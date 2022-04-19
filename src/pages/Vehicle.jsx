import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import {FiTrash} from 'react-icons/fi'
import {GiHomeGarage} from 'react-icons/gi'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Divider, Flex, IconButton, Menu, MenuButton, MenuList, VStack, useToast } from '@chakra-ui/react';
import Card from '../components/Cards/Card';
import CardHeader from '../components/Cards/CardHeader';
import ConfirmDeletionDialog from '../components/Dialogs/ConfirmDeletionDialog';
import InsuranceCard from '../components/Documents/InsuranceCard';
import PeriodicalDocumentsOutlineCard from '../components/Documents/PeriodicalDocuments/PeriodicalDocumentsOutlineCard';
import AppLayout from '../components/Layout/AppLayout';
import LastRefuelTabel from '../components/Refuel/LastRefuelTabel';
import AddRefillModal from '../modals/FuelManagement/AddRefillModal';
import { deleteInsurance, getInsuranceIds } from '../services/documents/insuranceService';
import { getPricePerLastDays } from '../services/fuelManagement/fuelManagementService';

const Vehicle = () => {
  const {t} = useTranslation();
  const { idVehicle } = useParams();

  const [idRca, setIdRca] = useState();
  const [idCasco, setIdCasco] = useState();
  const [dataPriceConsumtion, setDataPriceConsumtion] = useState(null)
  const [chartBarOptions, setChartBarOptions] = useState(null)
  const [refuelTableShouldUpdate, setRefuelTableShouldUpdate] = useState();

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
  
  useEffect(()=>{
    const asyncExecutor = async()=>{
      var graphDataResult = await getPricePerLastDays(idVehicle);
      var graphData = graphDataResult.data.result;
      const options = {
        plugins: {
          title: {
            display: true,
            text: `${t("TotalCostIs")} ${graphData.totalValues} LEI`,
          },
        },
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            stacked: false,
          },
        },
      };
      setChartBarOptions(options);
      const data = {
        labels: graphData.labels,
        datasets: [
          {
            label: t("CostPerDay"),
            data: graphData.values.map((val) => val),
            backgroundColor: 'rgba(49, 130, 206, 0.4)',
          },
        ],
      };
      setDataPriceConsumtion(data);
    }
    asyncExecutor();
  
  },[idVehicle, t])

  const delInsurance = async (idInsurance)=>{
    await deleteInsurance(idInsurance)
    .then((result)=>{
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

  const updateChart = async()=>{
    var graphDataResult = await getPricePerLastDays(idVehicle);
    var graphData = graphDataResult.data.result;
    const options = {
      plugins: {
        title: {
          display: true,
          text: `${t("TotalCostIs")} ${graphData.totalValues} LEI`,
        },
      },
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        x: {
          stacked: false,
        },
      },
    };
    setChartBarOptions(options);
    const data = {
      labels: graphData.labels,
      datasets: [
        {
          label: t("CostPerDay"),
          data: graphData.values.map((val) => val),
          backgroundColor: '#90CDF4',
          borderColor: '#63B3ED'
        },
      ],
    };
    setDataPriceConsumtion(data);
  }


  const vehicleAddedHandler = ()=>{
    setRefuelTableShouldUpdate(moment());
    updateChart();
  }

  return (
    <AppLayout>
      <VStack w='100%'>
        <Box w='100%' pb='3'>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to='/'>
                <GiHomeGarage/>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to='/dashboard'>
                {t("Dashboard")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>Vehicle {idVehicle}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Flex w="100%" direction='row' justifyContent='space-around'>
          <Box w='100%' m='2' ml='0'>
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
                      <ConfirmDeletionDialog action={async ()=>{await delInsurance(idCasco)}} name={t("cascoInsurance")} isMenuItem={true}>{t("DeleteCascoInsurance")}</ConfirmDeletionDialog>
                    </MenuList>
                  </Menu>
                }
                />
              <InsuranceCard idvehicle={idVehicle}/>
            </Card>
            <Card mt='4'>
              {
                dataPriceConsumtion &&
                <Bar options={chartBarOptions} data={dataPriceConsumtion} />
              }
            </Card>
          </Box>
          <Box w='100%' m='2' mr='0'>
            <Card mb='2'>
              <CardHeader 
                title={t("FuelManagement")} 
                action={<AddRefillModal updateFunction={vehicleAddedHandler} idVehicle={idVehicle}/>}
              />
              <LastRefuelTabel shouldUpdate={refuelTableShouldUpdate} endpoint={`/api/FuelManagement/GetVehicleRefills?IdVehicle=${idVehicle}`}/>
            </Card>
            <PeriodicalDocumentsOutlineCard m='2' idVehicle={idVehicle}/>
          </Box>
        </Flex>
      </VStack>
    </AppLayout>
  )
}

export default Vehicle