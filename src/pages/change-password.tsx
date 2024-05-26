import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Text } from '@chakra-ui/react'
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
import { LOGIN } from '@constants/routes'

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
    <PublicRoute>
      <Flex h="100vh" overflowY="scroll" justifyContent="center" alignItems="center">
        <Box
          w={{ base: 'full', md: '50%' }}
          minH={{ md: '100dvh', lg: 'full' }}
          overflow="hidden"
          maxH="full"
          display={{ base: 'none', md: 'block' }}
        >
          <Image src="/images/login.svg" alt="Login" w="full" h="full" objectFit="cover" objectPosition="center" />
        </Box>
        <Box borderRadius={24} bg="white" px={{ base: 7, md: 14, xl: 20 }} py={{ base: 9, '1xl': 20 }} textAlign="center" flex={1}>
          <Box mx="auto" maxW={{ base: 480, '1xl': 570 }}>
            <Text color="#202224" fontSize={{ base: '22px', '1xl': '24px' }} fontWeight="600">
              Change Password
            </Text>
            <form onSubmit={handleSubmit(submitHandler)}>
              <Box mt={6}>
                <FormControl mb={5} position="relative">
                  <FormLabel opacity={0.8} color="#202224" mb={3} fontSize={{ base: 'sm', '1xl': 'md' }}>
                    Password
                  </FormLabel>
                  <Input
                    type={passwordVisible ? 'text' : 'password'}
                    borderColor="#DFEAF2"
                    borderRadius={8}
                    bg="#F1F4F9"
                    _placeholder={{ color: '#718EBF' }}
                    placeholder="Enter Password"
                    fontSize={{ base: 'sm', '1xl': 'md' }}
                    {...register('password')}
                  />
                  <PasswordVisibilty visibility={passwordVisible} toggle={setPasswordVisible} />
                  {errors?.password && <ErrorText message={errors?.password?.message} />}
                </FormControl>
                <FormControl position="relative">
                  <FormLabel opacity={0.8} color="#202224" mb={3} fontSize={{ base: 'sm', '1xl': 'md' }}>
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
                    fontSize={{ base: 'sm', '1xl': 'md' }}
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
        </Box>
      </Flex>
    </PublicRoute>
  )
}

export default ChangePassword
