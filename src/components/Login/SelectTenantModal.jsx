import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiBriefcase } from 'react-icons/fi';
import { Box, Button, Flex, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { setTenantIdCookie } from '../../services/cookie/cookieService';
import { httpRequest } from '../../services/httpService';
import ModalLayout from '../Modals/ModalLayout';

function SelectTenantModal() {
  const { t } = useTranslation();
  const [tenantName, setTenantName] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { handleSubmit, register, setError, formState: { errors } } = useForm();
  

  const onSubmit = async (data)=>{
    var tenatAvailableRequest= await httpRequest.post("api/services/app/Account/IsTenantAvailable", data);
    var tenantAvailableResponse = tenatAvailableRequest.data.result;
    if(tenantAvailableResponse.tenantId){
      setTenantName(data.tenancyName);
      setTenantIdCookie(tenantAvailableResponse.tenantId);
      onClose()
    }
    else{
      setError("tenancyName",{type:"value", message:"Tenant does not exists"}, {shouldFocus: true})
    }
  }


  return (
    <>
      <Flex justifyContent="center">
          <Box onClick={onOpen} textTransform='capitalize'> {tenantName? tenantName : t("SelectTenant")} </Box>
      </Flex>
      <ModalLayout isOpen={isOpen} onClose={onClose} title={t("TenancyName")}
        footerComponent={
          <ModalFooter alignContent="space-between">
            <Button onClick={onClose}>{t("Cancel")}</Button> 
            <Button onClick={handleSubmit(onSubmit)} colorScheme='blue' ml={3}>
              {t("Save")}
            </Button>
          </ModalFooter>
        }
      >
        <FormControl isInvalid={errors.tenancyName}>
          <InputGroup >
            <InputLeftElement pointerEvents='none'>
              <FiBriefcase/>
            </InputLeftElement>
            <Input placeholder={t("EnterTenancyName")}
              {...register('tenancyName', {required: "Tenancy name is required"})}
              />
            
          </InputGroup>
          {errors.tenancyName && 
            <FormErrorMessage>{errors.tenancyName?.message}</FormErrorMessage>
          }
        </FormControl>
      </ModalLayout>
    </>
  );
}

export default SelectTenantModal;
