import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text } from '@chakra-ui/react'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  action: () => void
  type?: string
}
const DeleteModal = ({ isOpen, onClose, action, type = 'category' }: DeleteModalProps) => {
  const heading = type === 'category' ? 'Delete Category?' : 'Delete Blog?'
  const subMessage =
    type === 'category'
      ? ' Note: This action is irreversible. Blogs under this category can also be deleted.'
      : 'Note: This action is irreversible.'
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, .8)" />
      <ModalContent py={4}>
        <ModalHeader textAlign="center">{heading}</ModalHeader>
        <ModalCloseButton />
        <ModalBody py={3}>
          <Text fontSize="md" textAlign="center">
            Are you sure you want to delete this item?
          </Text>
          <Text fontSize="sm" textAlign="center" mt={4}>
            {subMessage}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button bg="red.500" color="white" onClick={action}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal
