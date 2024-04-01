import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useContext, useState } from 'react'
import { loginSchema } from '../validations/authValidations'
import ErrorText from '@components/Common/ErrorText'
import { FieldValues, useForm } from 'react-hook-form'
import PasswordVisibilty from '@components/Common/PasswordVisibility'
import { ILogin, loginUser } from '../services/auth'
import { useCustomToast } from '../hooks/useCustomToast'
import { AuthContext } from '../context/authContext'
import { useRouter } from 'next/router'
import { PublicRoute } from '@components/RouteAccess'
import Link from 'next/link'

const UserLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const { showToast } = useCustomToast()
  const { setUserData, setIsLoading } = useContext(AuthContext)
  const [showResendLink, setShowResetLink] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const loginHandler = (data: FieldValues) => {
    loginUser(data as ILogin)
      .then((res) => {
        console.log('the response is', res)
        showToast(res?.message, 'success')
        if (res?.user) {
          const user = res?.user
          setUserData(user)
          const isAdmin = user.role === 'admin' || user.role === 'superadmin'
          setTimeout(() => {
            isAdmin ? router.push('/admin') : router.push('/')
          }, 700)
        }
      })
      .catch((e) => {
        console.log('the error is', e)
        showToast(e?.data?.message, 'error')
        if (e.status) {
          setShowResetLink(true)
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <PublicRoute>
      <Flex bg="#568AFF" h="100vh" overflowY="scroll" justifyContent="center" alignItems="center">
        <Box borderRadius={24} bg="white" px={14} py={20} textAlign="center">
          <Text color="#202224" fontSize="24px" fontWeight="600">
            Login to Account
          </Text>
          <Text fontSize="md" fontWeight="500" mt={4}>
            Please enter your email and password to continue
          </Text>
          <form onSubmit={handleSubmit(loginHandler)}>
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
                  {...register('email')}
                />
                {errors?.email && <ErrorText message={errors.email.message} />}
              </FormControl>
              <FormControl position="relative">
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
                {errors?.password && <ErrorText message={errors.password.message} />}
              </FormControl>
              <Text color="#202224" fontSize="md" opacity="0.6" textAlign="right" mt={5}>
                Forgot Password?
              </Text>
              {showResendLink && (
                <Link href="/sendVerification">
                  <Button variant="unstyled">
                    <Text color="#202224" fontSize="md" opacity="0.6" textAlign="right" mt={5}>
                      Resend verification link
                    </Text>
                  </Button>
                </Link>
              )}

              <Button bg="#4880FF" color="white" fontWeight="normal" type="submit" w="80%" mt={10}>
                Sign In
              </Button>
              <Flex justifyContent="center" mt={4}>
                <Text>Don&apos;t have an account?</Text>
                <Button variant="link" color="#4880FF" ml={1} textDecoration="underline">
                  Create an account
                </Button>
              </Flex>
            </Box>
          </form>
        </Box>
      </Flex>
    </PublicRoute>
  )
}

export default UserLogin
