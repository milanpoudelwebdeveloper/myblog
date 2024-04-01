import React, { useContext, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select
} from '@chakra-ui/react'
import ErrorText from '@components/Common/ErrorText'
import { countries } from '@constants/countries'
import { yupResolver } from '@hookform/resolvers/yup'
import { editProfileSchema } from '@/src/validations/authValidations'
import { FieldValues, useForm } from 'react-hook-form'
import { IUpdateUser, updateInformation } from '@/src/services/user'
import { useCustomToast } from '@/src/hooks/useCustomToast'
import { AuthContext } from '@/src/context/authContext'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
}
const UpdateInfo = ({ isOpen, onClose }: DeleteModalProps) => {
  const { user, updateUserInformation } = useContext(AuthContext)
  const { showToast } = useCustomToast()
  const [closeAllowed, setCloseAllowed] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      country: 'Nepal'
    },
    resolver: yupResolver(editProfileSchema)
  })

  const submitHandler = (data: FieldValues) => {
    updateInformation({ id: user?.id, ...data } as IUpdateUser)
      .then((res) => {
        showToast(res?.message, 'success')
        updateUserInformation?.(data as IUpdateUser)
      })
      .catch((e) => showToast(e, 'error'))
      .finally(() => {
        setCloseAllowed(true)
        onClose()
      })
  }

  const closeHandler = () => {
    if (closeAllowed) {
      onClose()
    } else {
      showToast('Please update your information', 'warning')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={closeHandler} isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, .8)" />
      <ModalContent py={7} w={470}>
        <ModalHeader textAlign="center">Update Your Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody borderRadius={24} bg="white" textAlign="center">
          <form onSubmit={handleSubmit(submitHandler)}>
            <Box mt={6}>
              <FormControl mb={5}>
                <FormLabel opacity={0.8} color="#202224">
                  Full Name
                </FormLabel>
                <Input
                  type="text"
                  borderColor="#DFEAF2"
                  borderRadius={8}
                  bg="#F1F4F9"
                  _placeholder={{ color: '#718EBF' }}
                  placeholder="Enter Full Name"
                  {...register('name')}
                />
                {errors?.name && <ErrorText message={errors?.name?.message} />}
              </FormControl>
              <FormControl mb={5}>
                <FormLabel opacity={0.8} color="#202224">
                  Country
                </FormLabel>
                <Select
                  borderColor="#DFEAF2"
                  borderRadius={8}
                  bg="#F1F4F9"
                  _placeholder={{ color: '#718EBF' }}
                  placeholder="Select Country"
                  variant="custom"
                  {...register('country')}
                >
                  {countries?.map(({ name }) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </Select>
                {errors?.country && <ErrorText message={errors?.country?.message} />}
              </FormControl>
              <Button bg="#4880FF" color="white" fontWeight="normal" type="submit" w="80%" mt={10}>
                Update
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default UpdateInfo
