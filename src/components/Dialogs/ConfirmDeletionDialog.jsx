import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, MenuItem, useDisclosure } from '@chakra-ui/react'

const ConfirmDeletionDialog = ({action, name, isMenuItem, children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const {t} = useTranslation();

  const handleButtonClick = (value) => {
    if(value === true){
      action()
    }
    onClose();
  }

  return (
    <>
      {isMenuItem?
        <MenuItem onClick={onOpen}>
          {children}
        </MenuItem>
        :
        <Button colorScheme='red' onClick={onOpen}>
          {children}
        </Button>
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
              {t("AreYouSureYouWantToDelete")} {name}?
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