import React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';

function ModalLayout({children, isOpen, onClose, footerComponent, title}) {
  return (
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {children}
          </ModalBody>

          {footerComponent}
        </ModalContent>
      </Modal>
  );
}

export default ModalLayout;
