import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Text } from '@chakra-ui/react'
import ErrorText from '@components/Common/ErrorText'
import { countries } from '@constants/countries'
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpSchema } from '../validations/authValidations'
import { ISignUp, signUpUser } from '../services/auth'
import PasswordVisibilty from '@components/Common/PasswordVisibility'
import { useCustomToast } from '../hooks/useCustomToast'
import Link from 'next/link'
import { PublicRoute } from '@components/RouteAccess'
import HeadingSeo from '@components/Common/HeadingSeo'
import { LOGIN, SIGNUP } from '@constants/routes'

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const { showToast } = useCustomToast()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      country: 'Nepal'
    },
    resolver: yupResolver(signUpSchema)
  })

  const submitHandler = (data: FieldValues) => {
    signUpUser(data as ISignUp)
      .then((res) => {
        showToast(res?.message, 'success')
      })
      .catch((e) => {
        showToast(e, 'error')
      })
  }

  return (
    <>
      <HeadingSeo
        title="Sign Up | Code With Milan"
        description="Create an account to explore and dive into different programming blogs and articles."
        link={`https://codewithmilan.com/${SIGNUP}`}
      />
      <PublicRoute>
        <Flex bg="#568AFF" h="100vh" overflowY="scroll" justifyContent="center" alignItems="center" px={{ base: 6, lg: 4 }}>
          <Box
            borderRadius={24}
            bg="white"
            px={{ base: 8, xl: 12 }}
            py={{ base: 12, '1xl': 20 }}
            textAlign="center"
            w={{ base: 460, '1xl': 500 }}
            maxH={{ base: 490, '1xl': 540 }}
            overflowY="scroll"
          >
            <Text color="#202224" fontSize={{ base: 'xl', '1xl': '24px' }} fontWeight="bold" as="h1">
              Create an Account
            </Text>
            <Text fontSize={{ base: 'xs', md: 'md' }} mt={3} as="h2">
              Create a account to continue
            </Text>
            <form onSubmit={handleSubmit(submitHandler)}>
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
                  {errors?.email && <ErrorText message={errors?.email?.message} />}
                </FormControl>
                <FormControl mb={5}>
                  <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
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
                    fontSize={{ base: 'sm', '1xl': 'md' }}
                  />
                  {errors?.name && <ErrorText message={errors?.name?.message} />}
                </FormControl>
                <FormControl mb={5}>
                  <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
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
                    fontSize={{ base: 'sm', '1xl': 'md' }}
                  >
                    {countries?.map(({ name }) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </Select>

                  {errors?.country && <ErrorText message={errors?.country?.message} />}
                </FormControl>
                <FormControl mb={5} position="relative" fontSize={{ base: 'sm', '1xl': 'md' }}>
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
                    fontSize={{ base: 'sm', '1xl': 'md' }}
                  />
                  <PasswordVisibilty visibility={passwordVisible} toggle={setPasswordVisible} />
                  {errors?.password && <ErrorText message={errors?.password?.message} />}
                </FormControl>
                <FormControl position="relative">
                  <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
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

                <Button bg="#4880FF" color="white" fontSize={{ base: 'sm', '1xl': 'md' }} fontWeight="normal" type="submit" w="80%" mt={10}>
                  Sign Up
                </Button>
                <Flex justifyContent="center" alignItems="center" mt={4} fontSize={{ base: 'xs', '1xl': 'md' }}>
                  <Text as="h2">Already have an account?</Text>
                  <Link href={LOGIN}>
                    <Button variant="link" color="#4880FF" ml={1} fontSize={{ base: 'sm', '1xl': 'md' }} textDecoration="underline">
                      Sign In
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

export default SignUp
