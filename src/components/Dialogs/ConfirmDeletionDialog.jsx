import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {FiAlertCircle} from 'react-icons/fi'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, HStack, IconButton, MenuItem, Text, useDisclosure, useToast } from '@chakra-ui/react'

const ConfirmDeletionDialog = ({action, name, isMenuItem, isIcon, isButton, children, updateParentFunction, ...props}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const {t} = useTranslation();

  const toast = useToast();

  const handleButtonClick = (value) => {
    if(value === true){
      action().then((result)=>{
        if(result && result.status === 200){
          toast({
            title: `${t("Deleted")} ${name}`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          updateParentFunction()
        }
      })
    }
    onClose();
  }

  return (
    <>
      {isMenuItem?
        <MenuItem onClick={onOpen} {...props}>
          {children}
        </MenuItem>
        :
        (
          isIcon?
            (isButton?
              <IconButton onClick={onOpen} {...props}>
                {children}
              </IconButton>
              :
              <HStack onClick={onOpen} {...props}>
                {children}
              </HStack>
            )
          :
        <Button colorScheme='red' onClick={onOpen} {...props}>
          {children}
        </Button>
        )
      }

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {t("Delete")} {name}
            </AlertDialogHeader>

            <AlertDialogBody>
              <Flex w="100%" direction='column' justifyContent='center' alignItems='center'>
                <FiAlertCircle className='animate__animated animate__tada animate__slow animate__infinite' color='#805AD5' size='100px'/>
                <Text mt='4'>
                {t("AreYouSureYouWantToDelete")} {name}?
                </Text>
              </Flex>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={()=>handleButtonClick(false)}>
                {t("Cancel")}
              </Button>
              <Button colorScheme='red' onClick={()=>handleButtonClick(true)} ml={3}>
                {t("Delete")}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default ConfirmDeletionDialog