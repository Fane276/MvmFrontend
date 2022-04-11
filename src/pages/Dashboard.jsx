import React from 'react';
import { useTranslation } from 'react-i18next';
import {GiHomeGarage} from 'react-icons/gi'
import { Link } from 'react-router-dom';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, VStack } from '@chakra-ui/react';
import Card from '../components/Cards/Card';
import CardHeader from '../components/Cards/CardHeader';
import AppLayout from '../components/Layout/AppLayout';
import VehiclesTable from '../components/Vehicles/VehiclesTable';
import CreateVehicleModal from '../modals/vehicles/CreateVehicleModal';

const Dashboard = () => {
  const { t } = useTranslation();
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
          <Box w='100%'>
          </Box>
          <Box w='100%'>
            <Card>
              <CardHeader 
                title={t("MyGarage")} 
                action={<CreateVehicleModal/>}
              />
              <VehiclesTable endpoint='/api/Vehicle/GetCurrentUserPersonalVehicles'></VehiclesTable>
            </Card>
          </Box>
        </Flex>
      </VStack>
    </AppLayout>
  )
};

export default Dashboard;
