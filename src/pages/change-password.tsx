import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import ErrorText from '@components/Common/ErrorText'
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createPasswordSchema } from '../validations/authValidations'
import { changePassword } from '../services/auth'
import PasswordVisibilty from '@components/Common/PasswordVisibility'
import { useCustomToast } from '../hooks/useCustomToast'
import { PublicRoute } from '@components/RouteAccess'
import { useRouter } from 'next/router'
import HeadingSeo from '@components/Common/HeadingSeo'
import { CHANGE_PASSWORD, LOGIN } from '@constants/routes'

const ChangePassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const { showToast } = useCustomToast()
  const router = useRouter()
  const { token } = router.query
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createPasswordSchema)
  })

  const submitHandler = (data: FieldValues) => {
    const newPassword = data?.password
    changePassword(newPassword, token as string)
      .then((res) => {
        showToast(res?.message, 'success')
        setTimeout(() => {
          router.push(LOGIN)
        }, 1000)
      })
      .catch((e) => {
        showToast(e, 'error')
      })
  }

  return (
    <>
      <HeadingSeo
        title="Change Password | Code With Milan"
        description="Change your password to continue reading the blogs"
        link={`https://codewithmilan.com/${CHANGE_PASSWORD}`}
      />
      <PublicRoute>
        <Flex bg="#568AFF" h="100vh" overflowY="scroll" justifyContent="center" alignItems="center">
          <Box borderRadius={24} bg="white" px={14} py={20} textAlign="center" w={580} maxH={540} overflowY="scroll">
            <Text color="#202224" fontSize="24px" fontWeight="600">
              Create an Account
            </Text>
            <Text fontSize="md" fontWeight="500" mt={4}>
              Create a account to continue
            </Text>
            <form onSubmit={handleSubmit(submitHandler)}>
              <Box mt={6}>
                <FormControl mb={5} position="relative">
                  <FormLabel opacity={0.8} color="#202224">
                    Password
                  </FormLabel>
                  <Input
                    type={passwordVisible ? 'text' : 'password'}
                    borderColor="#DFEAF2"
                    borderRadius={8}
                    bg="#F1F4F9"
                    _placeholder={{ color: '#718EBF' }}
                    placeholder="Enter Password"
                    {...register('password')}
                  />
                  <PasswordVisibilty visibility={passwordVisible} toggle={setPasswordVisible} />
                  {errors?.password && <ErrorText message={errors?.password?.message} />}
                </FormControl>
                <FormControl position="relative">
                  <FormLabel opacity={0.8} color="#202224">
                    Confirm Password
                  </FormLabel>
                  <Input
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    borderColor="#DFEAF2"
                    borderRadius={8}
                    bg="#F1F4F9"
                    _placeholder={{ color: '#718EBF' }}
                    placeholder="Confirm Password"
                    {...register('confirmPassword')}
                  />
                  <PasswordVisibilty visibility={confirmPasswordVisible} toggle={setConfirmPasswordVisible} />
                  {errors?.confirmPassword && <ErrorText message={errors?.confirmPassword?.message} />}
                </FormControl>

                <Button bg="#4880FF" color="white" fontWeight="normal" type="submit" w="80%" mt={10}>
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Flex>
      </PublicRoute>
    </>
  )
}

export default ChangePassword
