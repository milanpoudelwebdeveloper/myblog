import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
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
import AuthFormWrapper from '@components/Common/AuthFormWrapper'

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
      <AuthFormWrapper>
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
      </AuthFormWrapper>
    </PublicRoute>
  )
}

export default ChangePassword
