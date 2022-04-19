import moment from 'moment'
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import {GiHomeGarage} from 'react-icons/gi'
import { Link } from 'react-router-dom';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Text, VStack } from '@chakra-ui/react';
import Card from '../components/Cards/Card';
import CardHeader from '../components/Cards/CardHeader';
import ExpiredDocumentsCard from '../components/Documents/ExpiredDocumentsCard';
import AppLayout from '../components/Layout/AppLayout';
import VehiclesTable from '../components/Vehicles/VehiclesTable';
import CreateVehicleModal from '../modals/vehicles/CreateVehicleModal';
import { getPricePerVehicle } from '../services/fuelManagement/fuelManagementService';

const chartBgColors = ['rgba(49, 130, 206, 0.2)', 'rgba(178, 245, 234, 0.2)', 'rgba(107, 70, 193, 0.2)', 'rgba(0, 163, 196, 0.2)']
const chartBorderColors = ['rgba(49, 130, 206, 1)', 'rgba(178, 245, 234, 1)', 'rgba(107, 70, 193, 1)','rgba(0, 163, 196, 1)'];

const Dashboard = () => {
  const { t } = useTranslation();
  const [graphData, setGraphData] = useState(null);
  const [graphOptions, setGraphOptions] = useState(null)

  const [vehicleTableShouldUpdate, setVehicleTableShouldUpdate] = useState();

  useEffect(() => {
    const asyncExecutor = async ()=>{
      var graphDataResult = await getPricePerVehicle();
      var graphData = graphDataResult.data.result;

      const options = {
        responsive: true,
        radius: "100%",
        plugins:{
          title: {
            display: true,
            text: `${t("TotalRefuelCostIs")} ${graphData.totalValues} LEI`,
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }
      setGraphOptions(options)
    
      const data = {
        labels: graphData.labels,
        datasets: [
          {
            label: '# of Votes',
            data: graphData.values,
            backgroundColor: graphData.values.map((val, index)=>chartBgColors[index % 4 + 0]),
            borderColor: graphData.values.map((val, index)=>chartBorderColors[index % 4 + 0]),
            borderWidth: 1
          },
        ],
      };
      setGraphData(data);
    }
    asyncExecutor();
  }, [t])
  
  const updateVehicleTableHandler = ()=>{
    setVehicleTableShouldUpdate(moment())
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
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>
                {t("Dashboard")}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Flex w="100%" direction='row' justifyContent='space-around'>
          <Box w='100%' mr='2'>
            <Card>

              <Flex w="100%" alignItems='center' justifyContent='center'>
                <Box w='400px'> 
                  {
                    graphData &&
                    graphData.labels.lenght > 0?
                    <Doughnut options={graphOptions} data={graphData}/>
                    :
                    <Flex w='100%' h={'200px'} justifyContent='center' alignItems='center'>
                      <Text>{t("NoDataAvailable")}</Text>
                    </Flex>
                  }
                </Box>
              </Flex>
            </Card>
            <ExpiredDocumentsCard mt='2'/>
          </Box>
          <Box w='100%' ml='2'>
            <Card>
              <CardHeader 
                title={t("MyGarage")} 
                action={<CreateVehicleModal updateFunction={()=>updateVehicleTableHandler()}/>}
              />
              <VehiclesTable shouldUpdate={vehicleTableShouldUpdate} endpoint='/api/Vehicle/GetCurrentUserPersonalVehicles'></VehiclesTable>
            </Card>
          </Box>
        </Flex>
      </VStack>
    </AppLayout>
  )
};

export default Dashboard;
