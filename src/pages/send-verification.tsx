import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Text } from '@chakra-ui/react'
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
        <Flex w={{ base: 440, '1xl': 490 }} mx="auto">
          <Box borderRadius={24} w="full" bg="white" px={{ base: 8, xl: 12 }} py={{ base: 9, '1xl': 20 }} textAlign="center">
            <Text color="#202224" fontSize={{ base: 'xl', '1xl': '24px' }} fontWeight="bold">
              Send Verification Link
            </Text>
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
          </Box>
        </Flex>
      </Flex>
    </PublicRoute>
  )
}

export default SendVerificationLink
