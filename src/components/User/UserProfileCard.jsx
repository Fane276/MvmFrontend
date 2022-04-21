import React from 'react'
import { useTranslation } from 'react-i18next'
import { Flex, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import Card from '../Cards/Card'
import CardHeader from '../Cards/CardHeader';

const UserProfileCard = ({user, ...props}) => {
  const {t} = useTranslation();

  const borderColor =  useColorModeValue('gray.200', 'gray.700');
  const LabelColor =  useColorModeValue('gray.400', 'gray.500');
  return (
    <Card {...props}>
      <CardHeader 
        title={t("AboutYou")}
      />
      <VStack w="100$" p='5'>
        <Flex w='100%' justifyContent='space-between' pb='1' px='2' borderBottom='1px' borderColor={borderColor}>
          <Text fontSize='lg' color={LabelColor}>{t("Name")}:</Text>
          <Text fontSize='lg'>{user.fullName}</Text>
        </Flex>
        <Flex w='100%' justifyContent='space-between' pb='1' px='2' borderBottom='1px' borderColor={borderColor}>
          <Text fontSize='lg' color={LabelColor}>{t("Username")}:</Text>
          <Text fontSize='lg'>{user.userName}</Text>
        </Flex>
        <Flex w='100%' justifyContent='space-between' pb='1' px='2' borderBottom='1px' borderColor={borderColor}>
          <Text fontSize='lg' color={LabelColor}>{t("Email")}:</Text>
          <Text fontSize='lg'>{user.emailAddress}</Text>
        </Flex>
        <Flex w='100%' justifyContent='space-between' pb='1' px='2' borderBottom='1px' borderColor={borderColor}>
          <Text fontSize='lg' color={LabelColor}>{t("Password")}:</Text>
          <Text fontSize='lg'>********</Text>
        </Flex>
      </VStack>
    </Card>
  )
}

export default UserProfileCard