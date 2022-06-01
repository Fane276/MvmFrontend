import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsInfoCircle } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import InputMask from 'react-input-mask';
import PulseLoader from 'react-spinners/PulseLoader'
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, ModalFooter, Select, Tooltip, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import Select2 from '../../components/Form/Select2'
import ModalLayout from '../../components/Modals/ModalLayout'
import { getVehicle, updateVehicle } from '../../services/Vehicles/vehiclesService';

const vehicleTypes = [
  {
    label: "Necunoscuta",
    value: 0
  },
  {
    label: "Autoturism",
    value: 1
  },
  {
    label: "Motocicleta",
    value: 2
  }, 
  {
    label: "Rulota",
    value: 3
  }, 
  {
    label: "Autocamion",
    value: 4
  },
  {
    label: "Autobuz",
    value: 5
  },
  {
    label: "CamionSemiremorca",
    value: 6
  },
  {
    label: "Furgoneta",
    value: 7
  },
  {
    label: "Motostivuitor",
    value: 8
  },
  {
    label: "Remorca",
    value: 9
  },
  {
    label: "Semiremorca",
    value: 10
  },
  {
    label: "UtilajDeConstructii",
    value: 11
  },
  {
    label: "VehiculAgricol",
    value: 12
  }
]
const UpdateVehicleModal = ({idVehicle, updateFunction, ...props}) => {
  const {t} = useTranslation();
  const toast = useToast();
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const { handleSubmit, register, setValue, control, formState: { errors, isSubmitting } } = useForm();
  const onSubmit = async (data)=>{
    data.idMakeAuto = data.makeAuto.value;
    if(data.idMakeAuto === -1){
      data.OtherMakeAuto = data.makeAuto.other;
    }
    data.idModelAuto = data.model.value;
    if(data.idModelAuto === -1){
      data.OtherModelAuto = data.model.other;
    }
    console.log(data);
    await updateVehicle(data)
    .then((result)=>{
      if(result.status === 200){
        toast({
          title: t("VehicleUpdated"),
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

  const onOpenHandler = async ()=>{
    var result = await getVehicle(idVehicle)
    if(result.status === 200){
      var vehicle = result.data.result;
      console.log(vehicle)
      setValue("vehicleType", vehicle.vehicleType);
      setValue("makeAuto", {value: vehicle.idMakeAuto, text: vehicle.makeAuto});
      setValue("model", {value: vehicle.idModelAuto, text: vehicle.modelAuto});
      setValue("title", vehicle.title);
      setValue("id", vehicle.id);
      setValue("productionYear", vehicle.productionYear);
      setValue("registrationNumber", vehicle.registrationNumber);
      setValue("chassisNo", vehicle.chassisNo);
      setValue("tenantId", vehicle.tenantId);
      setValue("userId", vehicle.userId);

    }

    onOpen()
  }

  const tooltipColor = useColorModeValue('gray.900', 'gray.200')
  const tooltipBgColor = useColorModeValue('gray.100', 'gray.800')

  return (
    <>
      <FiEdit2 color='#00B5D8' onClick={onOpenHandler} {...props}/>
      <ModalLayout isOpen={isOpen} onClose={onClose} title={t("EditVehicle") } size='5xl'
        footerComponent={
          <ModalFooter alignContent="space-between">
            <Button onClick={onClose}>{t("Cancel")}</Button> 
            <Button onClick={handleSubmit(onSubmit)} isLoading={isSubmitting} spinner={<PulseLoader size={8} color='white' />} colorScheme='blue' ml={3}>
              {t("Save")}
            </Button>
          </ModalFooter>
        }
      >
        <FormControl isInvalid={errors.title}>
          <FormLabel>{t("Title")}</FormLabel>
          <Input placeholder={t("Title")} {...register("title", { required: true })} />
          {errors.title &&
          <FormErrorMessage>{t("TitleError")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.vehicleType}>
          <FormLabel>{t("VehicleType")}</FormLabel>
          <Select {...register("vehicleType", { required: true, valueAsNumber: true })}>
            { vehicleTypes && 
            vehicleTypes.map((item)=>{
              return <option key={item.value} value={item.value}>{item.label}</option>  
            })
            }
          </Select>
          {errors.vehicleType &&
          <FormErrorMessage>{t("VehicleTypeError")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl mt='2' isInvalid={errors.makeAuto}>
          <FormLabel>{t("Make")}</FormLabel>
          <Select2 
            dependsOn="vehicleType" 
            valueName="id" 
            textName="name" 
            endpoint='/api/services/app/AutoCatalogue/GetMakeByCategory' 
            control={control} 
            setValue={setValue} 
            register={register} 
            name='makeAuto' 
            registerOptions={{required:true}} 
            extraParameter="categorie"
            hasOtherOption={true}
            />
          {errors.makeAuto &&
          <FormErrorMessage>{t("MakeError")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl mt='2' isInvalid={errors.model}>
          <FormLabel>{t("Model")}</FormLabel>
          <Select2 
            dependsOn="makeAuto" 
            valueName="id" 
            textName="name" 
            endpoint='/api/services/app/AutoCatalogue/GetModels' 
            control={control} 
            setValue={setValue} 
            register={register} 
            name='model' 
            registerOptions={{required:true}} 
            extraParameter="idMarca"
            hasOtherOption={true}
          />
          {errors.model &&
          <FormErrorMessage>{t("Model")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.productionYear}>
          <FormLabel>{t("ProductionYear")}</FormLabel>
          <Input placehoder={t("ProductionYear")} {...register("productionYear", { required: true })} />
          {errors.productionYear &&
          <FormErrorMessage>{t("ProductionYearError")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.registrationNumber}>
          <Flex justifyContent='start' alignItems="center">
            <FormLabel mr={1}>
              {t("RegistrationNumber")}
            </FormLabel>
            <Tooltip label={t("RegistrationNumberError")} color={tooltipColor} bgColor={tooltipBgColor} borderRadius={10}>
              <Box mb={1}>
                <BsInfoCircle size="16px"/>
              </Box>
            </Tooltip>
          </Flex>
          <Input placehoder="AB12ABC" as={InputMask} style={{textTransform: "uppercase"}} mask="a*99aaa" maskChar={null} {...register("registrationNumber", { required: true })} />
          {errors.registrationNumber &&
          <FormErrorMessage>{t("RegistrationNumberError")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.chassisNo}>
          <FormLabel>{t("ChassisNo")}</FormLabel>
          <Input placehoder={t("ChassisNo")} {...register("chassisNo", { required: true })} />
          {errors.chassisNo &&
          <FormErrorMessage>{t("ChassisNo")}</FormErrorMessage>
          }
        </FormControl>
      </ModalLayout>
    </>
  )
}
  
export default UpdateVehicleModal;