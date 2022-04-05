import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Flex } from '@chakra-ui/react';
import Card from '../components/Cards/Card';
import CardHeader from '../components/Cards/CardHeader';
import AppLayout from '../components/Layout/AppLayout';
import VehiclesTable from '../components/Vehicles/VehiclesTable';
import CreateVehicleModal from '../modals/vehicles/CreateVehicleModal';

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <AppLayout>
      <Flex w="100%" direction='row' justifyContent='space-around'>
        <Box w='100%'>
        </Box>
        <Box w='100%'>
          <Card>
            <CardHeader 
              title={t("MyVehicles")} 
              action={<CreateVehicleModal/>}
            />
            <VehiclesTable endpoint='/api/Vehicle/GetCurrentUserPersonalVehicles'></VehiclesTable>
          </Card>
        </Box>
      </Flex>
    </AppLayout>
  )
};

export default Dashboard;
