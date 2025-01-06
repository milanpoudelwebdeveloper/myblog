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
import HeadingSeo from '@components/Common/HeadingSeo'
import { LOGIN, SIGNUP } from '@constants/routes'
import AuthFormWrapper from '@components/Common/AuthFormWrapper'
import { useRouter } from 'next/router'

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const { showToast } = useCustomToast()
  const router = useRouter()
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
        router.push(LOGIN)
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
        link={`https://www.codewithmilan.com/${SIGNUP}`}
      />
      <AuthFormWrapper>
        <Box mx="auto">
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
                  autoComplete="off"
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
                  autoComplete="off"
                />
                <PasswordVisibilty visibility={confirmPasswordVisible} toggle={setConfirmPasswordVisible} />
                {errors?.confirmPassword && <ErrorText message={errors?.confirmPassword?.message} />}
              </FormControl>

              <Button bg="#4880FF" color="white" fontSize={{ base: 'sm', '1xl': 'md' }} fontWeight="normal" type="submit" w="80%" mt={10}>
                Sign Up
              </Button>
              <Flex justifyContent="center" alignItems="center" mt={4} fontSize={{ base: 'xs', '1xl': 'md' }}>
                <Text as="h2">Already have an account?</Text>
                <Link href={LOGIN} shallow>
                  <Button variant="link" color="#4880FF" ml={1} fontSize={{ base: 'sm', '1xl': 'md' }} textDecoration="underline">
                    Sign In
                  </Button>
                </Link>
              </Flex>
            </Box>
          </form>
        </Box>
      </AuthFormWrapper>
    </>
  )
}

export default SignUp
