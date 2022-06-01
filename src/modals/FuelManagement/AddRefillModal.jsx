import moment from 'moment';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiPlus } from 'react-icons/fi';
import PulseLoader from 'react-spinners/PulseLoader'
import { Select } from '@chakra-ui/react';
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, IconButton, ModalFooter, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useDisclosure, useToast } from '@chakra-ui/react';
import ChakraDatePicker from '../../components/Form/ChakraDatePicker';
import ModalLayout from '../../components/Modals/ModalLayout'
import { FuelType, FuelUnit } from '../../lib/vehicleConst';
import { addRefill } from '../../services/fuelManagement/fuelManagementService';

const AddRefillModal = ({ updateFunction, idVehicle, ...props}) => {
  const {t} = useTranslation();
  const fuelUnits = Object.getOwnPropertyNames(FuelUnit).map((value, index)=>{return {value: index, label: value}});
  const fuelTypes = Object.getOwnPropertyNames(FuelType).map((value, index)=>{return {value: index, label: value}});

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure()

  const {reset, control, handleSubmit, setValue, register, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data)=>{
    data.idVehicle = idVehicle;
    data.refillDate = moment(data.refillDate).format();

    await addRefill(data)
    .then((result)=>{
      if(result.status === 200){
        toast({
          title: t("SavedSuccessfully"),
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
    }
    );

    onClose();
    updateFunction();
  }

  const handleModalOpen = () =>{
    setValue('refillDate', moment().toDate())
    
    reset(undefined, {
      dirtyFields: false
    })
    onOpen();
  }

  return (
    <>
      <IconButton onClick={handleModalOpen} {...props}>
        <FiPlus/>
      </IconButton>
      <ModalLayout isOpen={isOpen} onClose={onClose} title={t("AddRefillInfo") } size='5xl'
        footerComponent={
          <ModalFooter alignContent="space-between">
            <Button onClick={onClose}>{t("Cancel")}</Button> 
            <Button onClick={handleSubmit(onSubmit)} isLoading={isSubmitting} spinner={<PulseLoader size={8} color='white' />} colorScheme='blue' ml={3}>
              {t("Save")}
            </Button>
          </ModalFooter>
        }
      >
        <FormControl isInvalid={errors.fuelAmount}>
          <FormLabel>{t("FuelAmount")}</FormLabel>
          <HStack w="100%" spacing='0'>
            <NumberInput defaultValue={0} precision={2} step={0.2} w="80%">
              <NumberInputField {...register("fuelAmount", { required: true, valueAsNumber: true, validate:(value)=>{
                if(value && value<=0){
                  return false;
                }
                return true;
              }})} borderRightRadius='0' />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Select w="20%" defaultValue="-1" borderLeftRadius='0' {...register("fuelUnit")}>
              {fuelUnits.map((elem)=>{
                return (<option key={elem.value} value={elem.value}>{t(elem.label)}</option>)
              })}
            </Select>
          </HStack>
          {errors.fuelAmount &&
          <FormErrorMessage>{t("FuelAmountError")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.fuelType}>
          <FormLabel>{t("FuelType")}</FormLabel>
          <Select placeholder={t("Select")} {...register("fuelType", { required: true})}>
            {fuelTypes.map((elem)=>{
              return (<option key={elem.value} value={elem.value}>{t(elem.label)}</option>)
            })}
          </Select>
          {errors.fuelType &&
          <FormErrorMessage>{t("FuelTypeError")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.price}>
          <FormLabel>{t("Price")}</FormLabel>
          <NumberInput defaultValue={0} precision={2} step={0.2}>
            <NumberInputField {...register("price", { required: true, valueAsNumber: true, validate:(value)=>{
              if(value && value<=0){
                return false;
              }
              return true;
            }})}/>
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {errors.price &&
          <FormErrorMessage>{t("PriceError")}</FormErrorMessage>
          }
        </FormControl>   

        <FormControl isInvalid={errors.refillDate}>
          <FormLabel>{t("RefillDate")}</FormLabel>
          <ChakraDatePicker
          control={control}
          name='refillDate'
          rules={{ required: true }}
          />
          {errors.refillDate &&
          <FormErrorMessage>{t("RefillDateError")}</FormErrorMessage>
          }
        </FormControl>
      </ModalLayout>
    </>
  )
}

export default AddRefillModal