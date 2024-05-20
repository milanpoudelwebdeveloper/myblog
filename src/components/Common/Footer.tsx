import { emailSchema } from '@/src/validations/authValidations'
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import ErrorText from './ErrorText'
import { addSubscription } from '@/src/services/subscriptions'
import { useCustomToast } from '@/src/hooks/useCustomToast'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const router = useRouter()
  const { showToast } = useCustomToast()
  const isBlogDetailPage = router.pathname.includes('/blog/')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(emailSchema)
  })

  const submitHandler = (data: { email: string }) => {
    addSubscription(data?.email)
      .then((res) => {
        showToast(res?.message, 'success')
      })
      .catch((e) => showToast(e, 'error'))
  }

  return (
    <Box mx={isBlogDetailPage ? 4 : 0} borderRadius={10} bg="#1B1B1B" color="white" textAlign="center" mt={{ base: 10, lg: 20 }} mb={7}>
      <Box py={10} px={3}>
        <Text fontSize={{ base: 'xl', md: '28px', xl: '30px', '1xl': '36px' }}>Programming | Coding | Learning</Text>
        <Text
          mx="auto"
          lineHeight="1.9"
          fontSize={{ base: 'xs', md: 'sm', xl: 'md', '1xl': 'lg' }}
          fontWeight="300"
          mt={4}
          mb={{ base: 7, '1xl': 8 }}
          maxW={{ base: 580, '1xl': 900 }}
          textAlign="center"
        >
          Subscribe to learn about new technology and updates. Join over 1000+ members community to stay up to date with latest articles.
        </Text>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Box w={{ base: '80%', lg: '40%' }} mx="auto">
            <Flex borderRadius={8} py={1} px={1} bg="white" color="black">
              <Input type="email" placeholder="Enter your email" fontSize={{ base: 'sm', '1xl': 'md' }} {...register('email')} />

              <Button type="submit" bg="#1B1B1B" color="white" fontSize={{ base: 'xs', md: 'sm', '1xl': 'md' }} h={10}>
                Subscribe
              </Button>
            </Flex>
            {errors.email && <ErrorText message={errors.email.message} />}
          </Box>
        </form>
      </Box>
      <Flex
        justifyContent="space-between"
        py={7}
        px={{ base: 3, md: 10 }}
        borderTopWidth={1}
        borderColor="rgb(255, 255, 255)"
        mt={{ base: 3, '1xl': 7 }}
        color="white"
        direction={{ base: 'column', md: 'row' }}
        gap={4}
      >
        <Text fontSize={{ base: 'xs', md: 'sm', xl: 'md', '1xl': 'lg' }}>&copy; {currentYear} Code With Milan. All rights reserved.</Text>

        <Flex fontSize={{ base: 'xs', md: 'sm', xl: 'md', '1xl': 'lg' }} justifyContent="center">
          <Text>Made with &#x2764; by </Text>
          <Link href="https://milanpoudel1.com.np" target="_blank">
            <Text color="#FFD700" ml={1} cursor="pointer">
              Milan Poudel
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
