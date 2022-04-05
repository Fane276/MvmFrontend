import { Select } from 'chakra-react-select';
import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiPlus } from 'react-icons/fi';
import { Button, IconButton, ModalFooter, useDisclosure } from '@chakra-ui/react';
import Select2 from '../../components/Form/Select2'
import ModalLayout from '../../components/Modals/ModalLayout'

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


const CreateVehicleModal = () => {
  const [vehicleType, setVehicleType] = useState();
  const {t} = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { handleSubmit, register, setValue, getValues, control, formState: { errors } } = useForm();


useEffect(() => {
}, [vehicleType])

  const onChangeVehicleType = (value) =>{
    setVehicleType(value.value);
  }

  const onSubmit = async (data)=>{
    console.log(data)
  }
  return (
    <>
      <IconButton onClick={onOpen}>
        <FiPlus/>
      </IconButton>
      <ModalLayout isOpen={isOpen} onClose={onClose} title={t("CreateVehicle") } size='5xl'
        footerComponent={
          <ModalFooter alignContent="space-between">
            <Button onClick={onClose}>{t("Cancel")}</Button> 
            <Button onClick={handleSubmit(onSubmit)} colorScheme='blue' ml={3}>
              {t("Save")}
            </Button>
          </ModalFooter>
        }
      >
        <Select options={vehicleTypes} onChange={onChangeVehicleType} name="idVehicleType" />
        
        <Select2 extraParameterValue={vehicleType} extraParameter={"categorie"} endpoint='/api/services/app/AutoCatalogue/GetMakeByCategory' control={control} setValue={setValue} register={register} name='IdMake' registerOptions={{required:true}} hasOtherOption={true}/>
      </ModalLayout>
    </>
  )
}

export default CreateVehicleModal