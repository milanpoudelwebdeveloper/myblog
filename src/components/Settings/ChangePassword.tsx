import { useState } from 'react'
import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { signUpSchema } from '@/src/validations/authValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import PasswordVisibilty from '@components/Common/PasswordVisibility'
import ErrorText from '@components/Common/ErrorText'

const ChangePassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const {
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signUpSchema)
  })
  return (
    <Box>
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
    </Box>
  )
}

export default ChangePassword
