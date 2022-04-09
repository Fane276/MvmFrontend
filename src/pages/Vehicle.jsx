import React from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router'
import { Box, Flex, Text } from '@chakra-ui/react';
import Card from '../components/Cards/Card';
import CardHeader from '../components/Cards/CardHeader';
import InsuranceCard from '../components/Documents/InsuranceCard';
import AppLayout from '../components/Layout/AppLayout';

const Vehicle = () => {
  const {t} = useTranslation();
  const { idVehicle } = useParams();

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