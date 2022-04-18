import moment from 'moment';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import {GiHomeGarage} from 'react-icons/gi'
import { Link } from 'react-router-dom';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, VStack } from '@chakra-ui/react';
import Card from '../components/Cards/Card';
import CardHeader from '../components/Cards/CardHeader';
import AppLayout from '../components/Layout/AppLayout'
import VehiclesTable from '../components/Vehicles/VehiclesTable';
import CreateVehicleModal from '../modals/vehicles/CreateVehicleModal';

const VehiclesPage = () => 
  {const { t } = useTranslation();
  const [vehicleTableShouldUpdate, setVehicleTableShouldUpdate] = useState();

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
                {t("MyGarage")}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
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
      </VStack>
    </AppLayout>
  )
}

export default VehiclesPage