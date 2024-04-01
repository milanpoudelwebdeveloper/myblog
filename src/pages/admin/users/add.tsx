import { useCustomToast } from '@/src/hooks/useCustomToast'
import { createUser } from '@/src/services/user'
import { Box, Button, Center, Divider, FormControl, FormLabel, Input, Select, Text } from '@chakra-ui/react'
import MainLayout from '@components/Admin/Common/MainLayout'
import ErrorText from '@components/Common/ErrorText'
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'

interface IData {
  email: string
  role: string
}

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { showToast } = useCustomToast()

  const submitHandler = (data: FieldValues) => {
    createUser(data as IData)
      .then((res) => {
        showToast(res?.message, 'success')
      })
      .catch((e) => {
        showToast(e, 'error')
      })
  }

  enum roles {
    admin = 'admin',
    writer = 'writer'
  }

  const roleOptions = [roles.admin, roles.writer]

  return (
    <MainLayout>
      <Box>
        <Text fontSize="lg" fontWeight="500" textAlign="center" color="#1814F3">
          Add A User
        </Text>
        <Divider mt={3} borderColor="#1814F3" w={10} borderWidth={2} mx="auto" />
        <Box mt={7} bg="white" pt={10} pb={16} borderRadius={14}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Box alignItems="center" px={20} gap={20} mx="auto">
              <FormControl mb={5} maxW={450} mx="auto">
                <FormLabel opacity={0.8} color="#202224">
                  Select Role
                </FormLabel>
                <Select
                  borderColor="#DFEAF2"
                  borderRadius={8}
                  bg="#F1F4F9"
                  _placeholder={{ color: '#718EBF' }}
                  placeholder="Select Role"
                  variant="custom"
                  {...register('role', {
                    required: 'Role is required'
                  })}
                >
                  {roleOptions?.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </Select>

                {errors?.role && <ErrorText message={errors?.role?.message} />}
              </FormControl>
              <FormControl maxW={450} mx="auto">
                <FormLabel color="#232323" fontSize="md">
                  Email
                </FormLabel>
                <Input
                  type="email"
                  borderColor="#DFEAF2"
                  borderRadius={17}
                  bg="#FFF"
                  _placeholder={{ color: '#718EBF' }}
                  placeholder="Enter Valid Email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }
                  })}
                />
                {errors?.email && <ErrorText message={errors?.email?.message} />}
              </FormControl>
              <Center mt={10}>
                <Button bg="#4880FF" color="white" fontWeight="normal" type="submit">
                  Submit
                </Button>
              </Center>
            </Box>
          </form>
        </Box>
      </Box>
    </MainLayout>
  )
}

export default AddUser
