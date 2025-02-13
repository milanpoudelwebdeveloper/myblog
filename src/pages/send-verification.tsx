import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ErrorText from '@components/Common/ErrorText'
import { FieldValues, useForm } from 'react-hook-form'
import { sendVerificationLink } from '../services/auth'
import { useCustomToast } from '../hooks/useCustomToast'
import { PublicRoute } from '@components/RouteAccess'
import { useTimer } from '../hooks/useTimer'
import AuthFormWrapper from '@components/Common/AuthFormWrapper'
import { useRouter } from 'next/router'
import { LOGIN } from '@constants/routes'

const SendVerificationLink = () => {
  const { showToast } = useCustomToast()
  const router = useRouter()
  const [enabled, setEnabled] = useState(false)
  const { realTimer, timer, resetTimer } = useTimer(0, enabled)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const resendLink = (data: FieldValues) => {
    sendVerificationLink(data?.email)
      .then((message) => {
        !enabled && setEnabled(true)
        resetTimer(120)
        showToast(message, 'success')
      })
      .catch((e) => {
        showToast(e?.data?.message, 'error')
        if (e?.status === 403) {
          router.push(LOGIN)
        }
      })
  }

  return (
    <PublicRoute>
      <AuthFormWrapper>
        <form onSubmit={handleSubmit(resendLink)}>
          <Box mt={12}>
            <FormControl mb={10}>
              <FormLabel mb={4} opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
                Email
              </FormLabel>
              <Input
                type="email"
                borderColor="#DFEAF2"
                borderRadius={8}
                bg="#F1F4F9"
                _placeholder={{ color: '#718EBF' }}
                placeholder="Enter Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                fontSize={{ base: 'sm', '1xl': 'md' }}
                py={{ base: 5, '1xl': 6 }}
              />
              {errors?.email && <ErrorText message={errors.email.message} />}
            </FormControl>
            <Button variant="unstyled" isDisabled={timer > 0} type="submit">
              <Text color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }} opacity="0.6" textAlign="right" mt={5}>
                Send verification link {timer > 0 ? `in ${realTimer}` : ''}
              </Text>
            </Button>
          </Box>
        </form>
      </AuthFormWrapper>
    </PublicRoute>
  )
}

export default SendVerificationLink
