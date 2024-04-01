import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import ErrorText from '@components/Common/ErrorText'
import { FieldValues, useForm } from 'react-hook-form'
import { sendVerificationLink } from '../services/auth'
import { useCustomToast } from '../hooks/useCustomToast'
import { PublicRoute } from '@components/RouteAccess'
import { useTimer } from '../hooks/useTimer'

const SendVerificationLink = () => {
  const { showToast } = useCustomToast()
  const [enabled, setEnabled] = useState(false)
  const { realTimer, timer, resetTimer } = useTimer(0, enabled)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const resendLink = (data: FieldValues) => {
    console.log('the data is', data)
    sendVerificationLink(data?.email)
      .then((message) => {
        !enabled && setEnabled(true)
        resetTimer(120)
        showToast(message, 'success')
      })
      .catch((e) => {
        showToast(e, 'error')
      })
  }

  return (
    <PublicRoute>
      <Flex bg="#568AFF" h="100vh" overflowY="scroll" justifyContent="center" alignItems="center">
        <Flex w={500} mx="auto">
          <Box borderRadius={24} w="full" bg="white" px={14} py={20} textAlign="center">
            <Text color="#202224" fontSize="24px" fontWeight="600">
              Send Verification Link
            </Text>
            <Text fontSize="md" fontWeight="500" mt={4}>
              Please enter your email to continue
            </Text>
            <form onSubmit={handleSubmit(resendLink)}>
              <Box mt={6}>
                <FormControl mb={5}>
                  <FormLabel opacity={0.8} color="#202224">
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
                  />
                  {errors?.email && <ErrorText message={errors.email.message} />}
                </FormControl>
                <Button variant="unstyled" isDisabled={timer > 0} type="submit">
                  <Text color="#202224" fontSize="md" opacity="0.6" textAlign="right" mt={5}>
                    Send verification link {timer > 0 ? `in ${realTimer}` : ''}
                  </Text>
                </Button>
              </Box>
            </form>
          </Box>
        </Flex>
      </Flex>
    </PublicRoute>
  )
}

export default SendVerificationLink
