import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiPlus } from 'react-icons/fi';
import { Button, IconButton, ModalFooter, useDisclosure } from '@chakra-ui/react';
import Select2 from '../../components/Form/Select2'
import ModalLayout from '../../components/Modals/ModalLayout'

const CreateVehicleModal = () => {
  const {t} = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { handleSubmit, register, setValue,setError, control, formState: { errors } } = useForm();

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
        <Select2 endpoint='/api/services/app/AutoCatalogue/GetMakeByCategory?categorie=1' control={control} setValue={setValue} register={register} name='IdMake' registerOptions={{required:true}} hasOtherOption={true}/>
      </ModalLayout>
    </>
  )
}

export default CreateVehicleModal