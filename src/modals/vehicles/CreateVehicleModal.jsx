import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsInfoCircle } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';
import InputMask from 'react-input-mask';
import PulseLoader from 'react-spinners/PulseLoader'
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, ModalFooter, Select, Tooltip, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import Select2 from '../../components/Form/Select2'
import ModalLayout from '../../components/Modals/ModalLayout'
import { createVehicle } from '../../services/Vehicles/vehiclesService';
import { getTenantIdCookie } from '../../services/cookie/cookieService';

const CreateVehicleModal = ({updateFunction}) => {
  const {t} = useTranslation();
  const vehicleTypes = [
    {
      label: t("Necunoscuta"),
      value: 0
    },
    {
      label: t("Autoturism"),
      value: 1
    },
    {
      label: t("Motocicleta"),
      value: 2
    }, 
    {
      label: t("Rulota"),
      value: 3
    }, 
    {
      label: t("Autocamion"),
      value: 4
    },
    {
      label: t("Autobuz"),
      value: 5
    },
    {
      label: t("CamionSemiremorca"),
      value: 6
    },
    {
      label: t("Furgoneta"),
      value: 7
    },
    {
      label: t("Motostivuitor"),
      value: 8
    },
    {
      label: "Remorca",
      value: 9
    },
    {
      label: t("Semiremorca"),
      value: 10
    },
    {
      label: t("UtilajDeConstructii"),
      value: 11
    },
    {
      label: t("VehiculAgricol"),
      value: 12
    }
  ]

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { reset, handleSubmit, register, setValue, control, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data)=>{
    var tenantIdCookie = getTenantIdCookie();
    if(tenantIdCookie !== undefined){
      data.tenantId = getTenantIdCookie();
    }

    data.idMakeAuto = data.makeAuto.value;
    if(data.idMakeAuto === -1){
      data.idMakeAuto = undefined;
      data.otherAutoMake = data.makeAuto.other;
    }
    data.idModelAuto = data.model.value;
    if(data.idModelAuto === -1){
      data.idModelAuto = undefined;
      data.OtherAutoModel = data.model.other;
    }
    await createVehicle(data)
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

  const handleOpen = () => {
    reset(undefined, {
      dirtyFields: false
    })
    onOpen();
  }

  const tooltipColor = useColorModeValue('gray.900', 'gray.200')
  const tooltipBgColor = useColorModeValue('gray.100', 'gray.800')

  return (
    <>
      <IconButton onClick={handleOpen}>
        <FiPlus/>
      </IconButton>
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
          <Input placeholder={t("Title")} {...register("title", { required: true })} />
          {errors.title &&
          <FormErrorMessage>{t("TitleError")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.idVehicleType}>
          <FormLabel>{t("VehicleType")}</FormLabel>
          <Select {...register("idVehicleType", { required: true, valueAsNumber: true })}>
            { vehicleTypes && 
            vehicleTypes.map((item)=>{
              return <option key={item.value} value={item.value}>{item.label}</option>  
            })
            }
          </Select>
          {errors.idVehicleType &&
          <FormErrorMessage>{t("VehicleTypeError")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl mt='2' isInvalid={errors.makeAuto}>
          <FormLabel>{t("Make")}</FormLabel>
          <Select2 
            dependsOn="idVehicleType" 
            valueName="id" 
            textName="name" 
            endpoint='/api/services/app/AutoCatalogue/GetMakeByCategory' 
            control={control} 
            setValue={setValue} 
            register={register} 
            name='makeAuto' 
            rules={{required:true}} 
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
            rules={{required:true}} 
            extraParameter="idMarca"
            hasOtherOption={true}
          />
          {errors.model &&
          <FormErrorMessage>{t("ModelError")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.productionYear}>
          <FormLabel>{t("ProductionYear")}</FormLabel>
          <Input placeholder={t("ProductionYear")} {...register("productionYear", { required: true })} />
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
          <Input as={InputMask} style={{textTransform: "uppercase"}} placeholder="AB12ABC" mask="a*99aaa" maskChar={null} {...register("registrationNumber", { required: true })} />
          {errors.registrationNumber &&
          <FormErrorMessage>{t("RegistrationNumberError")}</FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.chassisNo}>
          <FormLabel>{t("ChassisNo")}</FormLabel>
          <Input placeholder={t("ChassisNo")} {...register("chassisNo", { required: true })} />
          {errors.chassisNo &&
          <FormErrorMessage>{t("ChassisNo")}</FormErrorMessage>
          }
        </FormControl>
      </ModalLayout>
    </>
  )
}

export default CreateVehicleModal