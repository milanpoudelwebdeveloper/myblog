import React, { useContext, useEffect } from 'react'
import { Box, Button, Center, Flex, FormControl, FormLabel, Input, Select, Textarea } from '@chakra-ui/react'
import { countries } from '@constants/countries'
import { FieldValues, useForm } from 'react-hook-form'
import ErrorText from '@components/Common/ErrorText'
import { yupResolver } from '@hookform/resolvers/yup'
import { settingsSchema } from '@/src/validations/settings'
import { AuthContext } from '@/src/context/authContext'
import { IUpdateUser, updateInformation } from '@/src/services/user'
import { useCustomToast } from '@/src/hooks/useCustomToast'
import { useRouter } from 'next/router'
import { HOME } from '@constants/routes'

const InformationSettings = () => {
  const { user } = useContext(AuthContext)
  const { showToast } = useCustomToast()
  const router = useRouter()
  const genders = ['Male', 'Female', 'Others']
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(settingsSchema),
    defaultValues: {
      ...user
    }
  })

  useEffect(() => {
    reset(user)
  }, [user])

  const submitHabndler = (data: FieldValues) => {
    updateInformation(data as IUpdateUser)
      .then((res) => {
        if (res?.message) {
          showToast(res?.message, 'success')
          router.push(HOME)
        }
      })
      .catch((e) => {
        showToast(e, 'error')
      })
  }
  return (
    <form onSubmit={handleSubmit(submitHabndler)}>
      <Flex gap={14} mb={4}>
        <Box flex={1} mb={5}>
          <FormControl>
            <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
              Your Name
            </FormLabel>
            <Input placeholder="Full Name" fontSize={{ base: 'sm', '1xl': 'md' }} {...register('name')} />
          </FormControl>
          {errors?.name && <ErrorText message={errors?.name?.message} />}
        </Box>
        <Box flex={1} mb={5}>
          <FormControl>
            <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }} {...register('name')}>
              Your Email
            </FormLabel>
            <Input disabled type="email" placeholder="Email Address" fontSize={{ base: 'sm', '1xl': 'md' }} {...register('email')} />
          </FormControl>
          {errors?.email && <ErrorText message={errors?.email?.message} />}
        </Box>
      </Flex>
      <Flex gap={14} mb={4}>
        <Box flex={1} mb={5}>
          <FormControl>
            <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
              Country
            </FormLabel>
            <Select placeholder="Select Country" fontSize={{ base: 'sm', '1xl': 'md' }} {...register('country')}>
              {countries?.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
          {errors?.country && <ErrorText message={errors?.country?.message} />}
        </Box>
        <Box flex={1} mb={5}>
          <FormControl>
            <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
              Gender
            </FormLabel>
            <Select placeholder="Select Gender" fontSize={{ base: 'sm', '1xl': 'md' }} {...register('gender')}>
              {genders?.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </Select>
          </FormControl>
          {errors?.gender && <ErrorText message={errors?.gender?.message} />}
        </Box>
      </Flex>
      <FormControl>
        <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
          Your bio (Optional)
        </FormLabel>
        <Textarea placeholder="Your Bio" fontSize={{ base: 'sm', '1xl': 'md' }} rows={6} {...register('bio')} />
      </FormControl>
      {errors?.bio && <ErrorText message={errors?.bio?.message} />}
      <Center mt={5}>
        <Button
          isLoading={isSubmitting}
          loadingText="Saving..."
          type="submit"
          mt={8}
          bg="#6941C6"
          color="white"
          fontSize={{ md: 'sm', '1xl': 'md' }}
          fontWeight="normal"
        >
          Save Info
        </Button>
      </Center>
    </form>
  )
}

export default InformationSettings
