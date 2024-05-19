import { useContext, useState } from 'react'
import { Box, Button, Center, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { changePasswordSchema } from '@/src/validations/authValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
import PasswordVisibilty from '@components/Common/PasswordVisibility'
import ErrorText from '@components/Common/ErrorText'
import { updatePassword } from '@/src/services/auth'
import { useCustomToast } from '@/src/hooks/useCustomToast'
import { AuthContext } from '@/src/context/authContext'
import { useRouter } from 'next/router'

const ChangePassword = () => {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const { setLogOut } = useContext(AuthContext)
  const router = useRouter()
  const { showToast } = useCustomToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(changePasswordSchema)
  })

  const onSubmit = (data: FieldValues) => {
    updatePassword(data?.oldPassword, data?.password)
      .then((res) => {
        setLogOut()
        showToast(res?.message, 'success')
        router.push('/login')
      })
      .catch((e) => {
        showToast(e, 'error')
      })
  }
  return (
    <Box px={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={5} position="relative" fontSize={{ base: 'sm', '1xl': 'md' }}>
          <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
            Current Password
          </FormLabel>
          <Input
            type={oldPasswordVisible ? 'text' : 'password'}
            placeholder="Current Password"
            {...register('password')}
            fontSize={{ base: 'sm', '1xl': 'md' }}
            {...register('oldPassword')}
          />
          <PasswordVisibilty visibility={oldPasswordVisible} toggle={setOldPasswordVisible} />
          {errors?.oldPassword && <ErrorText message={errors?.oldPassword?.message} />}
        </FormControl>
        <FormControl mb={5} position="relative" fontSize={{ base: 'sm', '1xl': 'md' }}>
          <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
            New Password
          </FormLabel>
          <Input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="New Password"
            {...register('password')}
            fontSize={{ base: 'sm', '1xl': 'md' }}
            {...register('password')}
          />
          <PasswordVisibilty visibility={passwordVisible} toggle={setPasswordVisible} />
          {errors?.password && <ErrorText message={errors?.password?.message} />}
        </FormControl>
        <FormControl position="relative" mt={7}>
          <FormLabel opacity={0.8} color="#202224" fontSize={{ base: 'sm', '1xl': 'md' }}>
            Confirm Password
          </FormLabel>
          <Input
            type={confirmPasswordVisible ? 'text' : 'password'}
            placeholder="Confirm Password"
            fontSize={{ base: 'sm', '1xl': 'md' }}
            {...register('confirmPassword')}
          />
          <PasswordVisibilty visibility={confirmPasswordVisible} toggle={setConfirmPasswordVisible} />
          {errors?.confirmPassword && <ErrorText message={errors?.confirmPassword?.message} />}
        </FormControl>
        <Center mt={5}>
          <Button
            isLoading={isSubmitting}
            loadingText="Updating..."
            type="submit"
            mt={8}
            bg="#6941C6"
            color="white"
            fontSize={{ md: 'sm', '1xl': 'md' }}
            fontWeight="normal"
          >
            Update
          </Button>
        </Center>
      </form>
    </Box>
  )
}

export default ChangePassword
