import {SingleDatepicker} from 'chakra-dayzed-datepicker'
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { dateTimeTheme } from '../../app/theme/theme';
import InsuranceNotSet from '../../components/Documents/Insurance/InsuranceNotSet';
import Select2 from '../../components/Form/Select2';
import ModalLayout from '../../components/Modals/ModalLayout';

const CreateRcaInsuranceModal = ({...props}) => {
  const {t} = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [date, setDate] = useState(new Date());

  const { handleSubmit, register, setValue, getValues, control, formState: { errors } } = useForm();

  const onSubmit = async (data)=>{
    console.log(data)


    onClose();
  }
  return (
    <>
      <InsuranceNotSet insuranceType='rca' onClick={onOpen} {...props}/>
      <ModalLayout isOpen={isOpen} onClose={onClose} title={t("AddMandatoryInsurance") } size='5xl'
        footerComponent={
          <ModalFooter alignContent="space-between">
            <Button onClick={onClose}>{t("Cancel")}</Button> 
            <Button onClick={handleSubmit(onSubmit)} colorScheme='blue' ml={3}>
              {t("Save")}
            </Button>
          </ModalFooter>
        }
      >
        <FormControl mt='2' isInvalid={errors.idInsuranceCompany}>
          <FormLabel>{t("InsuranceCompany")}</FormLabel>
          <Select2 endpoint='/api/services/app/InsuranceCatalogue/GetInsuranceCompanies' control={control} setValue={setValue} register={register} name='idInsuranceCompany' registerOptions={{required:true}}/>
          {errors.idInsuranceCompany &&
          <FormErrorMessage>{t("InsuranceCompanyError")}</FormErrorMessage>
          }
        </FormControl>
        
        <FormControl isInvalid={errors.isurancePolicyNumber}>
          <FormLabel>{t("IsurancePolicyNumber")}</FormLabel>
          <Input {...register("isurancePolicyNumber", { required: false })} />
          {errors.isurancePolicyNumber &&
          <FormErrorMessage>{t("IsurancePolicyNumberError")}</FormErrorMessage>
          }
        </FormControl>
        
        <FormControl isInvalid={errors.validFrom}>
          <FormLabel>{t("ValidFrom")}</FormLabel>
          <SingleDatepicker
            name="date-input"
            date={date}
            onDateChange={setDate}
            propsConfigs={dateTimeTheme}
          />
          {errors.validFrom &&
          <FormErrorMessage>{t("IsurancePolicyNumberError")}</FormErrorMessage>
          }
        </FormControl>
      </ModalLayout>
    </>
  )
}

export default CreateRcaInsuranceModal