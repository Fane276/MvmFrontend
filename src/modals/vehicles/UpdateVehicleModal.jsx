import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiEdit2 } from 'react-icons/fi';
import PulseLoader from 'react-spinners/PulseLoader'
import { Button, FormControl, FormErrorMessage, FormLabel, IconButton, Input, ModalFooter, Select, useDisclosure, useToast } from '@chakra-ui/react';
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

  const [vehicleMake, setVehicleMake] = useState();
  const [vehicle, setVehicle] = useState();
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const { handleSubmit, register, watch, setValue, control, formState: { errors, isSubmitting } } = useForm();
  const vehicleType = watch('idVehicleType');

  const onChangeVehicleMake = (value) =>{
    setVehicleMake(value);
  }

  const onSubmit = async (data)=>{

    await updateVehicle(data)
    .then((result)=>{
      if(result.status === 200){
        toast({
          title: t("VehicleAdded"),
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
      setValue("idVehicleType", vehicle.vehicleType);
      setValue("idMakeAuto", vehicle.idMakeAuto);
      setValue("idModelAuto", vehicle.idModelAuto);
      setValue("title", vehicle.title);
      setValue("id", vehicle.id);
      setValue("productionYear", vehicle.productionYear);
      setValue("registrationNumber", vehicle.registrationNumber);
      setValue("chassisNo", vehicle.chassisNo);
      setValue("tenantId", vehicle.tenantId);
      setValue("userId", vehicle.userId);

      setVehicle(vehicle);
    }

    onOpen()
  }
  return (
    <>
      <FiEdit2 onClick={onOpenHandler} {...props}/>
      <ModalLayout isOpen={isOpen} onClose={onClose} title={t("AddVehicle") } size='5xl'
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
          <Input {...register("title", { required: true })} />
          {errors.title &&
          <FormErrorMessage>{t("TitleError")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.idVehicleType}>
          <FormLabel>{t("VehicleType")}</FormLabel>
          <Select defaultValue="-1" {...register("idVehicleType", {required: true, setValueAs: v=>parseInt(v)})}>
            {vehicleTypes.map((elem)=>{
              return (<option key={elem.value} value={elem.value}>{elem.label}</option>)
            })}
          </Select>
          {errors.idVehicleType &&
          <FormErrorMessage>{t("VehicleTypeError")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl mt='2' isInvalid={errors.idMake}>
          <FormLabel>{t("Make")}</FormLabel>
          <Select2 extraParameterValue={vehicleType} defaultValue={vehicle && {id: vehicle.idMakeAuto, value: vehicle.makeAuto}} extraParameter={"categorie"} onChange={onChangeVehicleMake} endpoint='/api/services/app/AutoCatalogue/GetMakeByCategory' control={control} setValue={setValue} register={register} name='idMakeAuto' registerOptions={{required:true}} hasOtherOption={true}/>
          {errors.idMake &&
          <FormErrorMessage>{t("MakeError")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl mt='2' isInvalid={errors.idModel}>
          <FormLabel>{t("Model")}</FormLabel>
          <Select2 extraParameterValue={vehicleMake} defaultValue={vehicle && {id: vehicle.idModelAuto, value: "ana"}} extraParameter={"idMarca"} endpoint='/api/services/app/AutoCatalogue/GetModels' control={control} setValue={setValue} register={register} name='idModelAuto' registerOptions={{required:true}} hasOtherOption={true}/>
          {errors.idModel &&
          <FormErrorMessage>{t("Model")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.productionYear}>
          <FormLabel>{t("ProductionYear")}</FormLabel>
          <Input {...register("productionYear", { required: true })} />
          {errors.productionYear &&
          <FormErrorMessage>{t("ProductionYearError")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.registrationNumber}>
          <FormLabel>{t("RegistrationNumber")}</FormLabel>
          <Input {...register("registrationNumber", { required: true })} />
          {errors.registrationNumber &&
          <FormErrorMessage>{t("RegistrationNumberError")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.chassisNo}>
          <FormLabel>{t("ChassisNo")}</FormLabel>
          <Input {...register("chassisNo", { required: true })} />
          {errors.chassisNo &&
          <FormErrorMessage>{t("ChassisNo")}</FormErrorMessage>
          }
        </FormControl>
        
        
        
      </ModalLayout>
    </>
  )
}
  
export default UpdateVehicleModal;