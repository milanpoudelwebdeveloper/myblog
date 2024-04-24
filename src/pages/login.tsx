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
import HeadingSeo from '@components/Common/HeadingSeo'
import { LOGIN, SEND_VERIFICATION, SIGNUP } from '@constants/routes'

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
        showToast(e?.data?.message, 'error')
        if (e.status) {
          setShowResetLink(true)
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <HeadingSeo
        title="Login | Code With Milan"
        description="Login to your account to continue reading the blogs"
        link={`https://www.codewithmilan.com/${LOGIN}`}
      />

      <PublicRoute>
        <Flex bg="#568AFF" h="100vh" overflowY="scroll" justifyContent="center" alignItems="center" px={{ base: 6, lg: 4 }}>
          <Box
            borderRadius={24}
            bg="white"
            px={{ base: 8, xl: 12 }}
            py={{ base: 9, '1xl': 20 }}
            textAlign="center"
            w={{ base: 440, '1xl': 490 }}
          >
            <Text color="#202224" fontSize={{ base: 'xl', '1xl': '24px' }} fontWeight="bold" as="h1">
              Login to Account
            </Text>
            <Text fontSize={{ base: 'xs', md: 'md' }} mt={4} as="h2">
              Please enter your credentials to continue
            </Text>
            <form onSubmit={handleSubmit(loginHandler)}>
              <Box mt={6}>
                <FormControl mb={5}>
                  <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
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
                    fontSize={{ base: 'sm', '1xl': 'md' }}
                  />
                  {errors?.email && <ErrorText message={errors.email.message} />}
                </FormControl>
                <FormControl position="relative">
                  <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
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
                    fontSize={{ base: 'sm', '1xl': 'md' }}
                    autoComplete="off"
                  />
                  <PasswordVisibilty visibility={passwordVisible} toggle={setPasswordVisible} />
                  {errors?.password && <ErrorText message={errors.password.message} />}
                </FormControl>
                <Link href={SEND_VERIFICATION} shallow>
                  <Button
                    variant="unstyled"
                    ml="auto"
                    color="#202224"
                    fontSize={{ base: 'sm', '1xl': 'md' }}
                    fontWeight="normal"
                    opacity="0.6"
                    textAlign="right"
                    my={{ base: 2, '1xl': 5 }}
                  >
                    Forgot Password?
                  </Button>
                </Link>
                {showResendLink && (
                  <Link href={SEND_VERIFICATION} shallow>
                    <Button variant="unstyled">
                      <Text color="#202224" fontSize="md" opacity="0.6" textAlign="right">
                        Resend verification link
                      </Text>
                    </Button>
                  </Link>
                )}

                <Button
                  bg="#4880FF"
                  color="white"
                  fontWeight="normal"
                  type="submit"
                  w="80%"
                  mt={{ base: 7, '1xl': 10 }}
                  fontSize={{ base: 'sm', '1xl': 'md' }}
                >
                  Sign In
                </Button>
                <Flex justifyContent="center" alignItems="center" mt={5} fontSize={{ base: 'xs', '1xl': 'md' }}>
                  <Text as="h2" flexShrink={0}>
                    Don&apos;t have an account?
                  </Text>
                  <Link href={SIGNUP} shallow>
                    <Button variant="link" mb={1} fontSize={{ base: 'sm', '1xl': 'md' }} color="#4880FF" ml={1} textDecoration="underline">
                      Create one
                    </Button>
                  </Link>
                </Flex>
              </Box>
            </form>
          </Box>
        </Flex>
      </PublicRoute>
    </>
  )
}

export default UserLogin
