import { Box, Button, Flex, Link, Spinner, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { verifyAccount } from '../services/auth'
import { useCustomToast } from '../hooks/useCustomToast'
import { PublicRoute } from '@components/RouteAccess'
import { AuthContext } from '../context/authContext'
import Image from 'next/image'

const VerifyAccount = () => {
  const [verifying, setVerifying] = useState(true)
  const router = useRouter()
  const { token } = router.query
  const { showToast } = useCustomToast()
  const [success, setSuccess] = useState(false)
  const { isLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    if (isLoggedIn) return
    if (token) {
      verifyAccount(token as string)
        .then((res) => {
          showToast(res.message, 'success')
          setVerifying(false)
          setSuccess(true)
          if (res?.redirectUrl) {
            router.push(res?.redirectUrl)
          }
        })
        .catch(() => {
          setVerifying(false)
        })
    }
  }, [token, isLoggedIn])

  return (
    <PublicRoute>
      <Flex justifyContent="center" alignItems="center" h="100vh" overflowY="hidden">
        {verifying ? (
          <Box textAlign="center">
            <Box position="relative" w={350} mx="auto">
              <Image src="/images/waiting.svg" alt="verified" layout="fill" objectFit="cover" />
            </Box>
            <Flex alignItems="center" gap={3}>
              <Text fontSize="xl">Please wait while we are verifying your account</Text>
              <Spinner color="blue.500" />
            </Flex>
          </Box>
        ) : success ? (
          <Box textAlign="center">
            <Box position="relative" w={350} mx="auto">
              <Image src="/images/success.svg" alt="verified" objectFit="cover" layout="fill" />
            </Box>
            <Text fontSize="xl">Account verified successfully</Text>
            <Link href="/login">
              <Button variant="unstyled" color="blue.500" textDecoration="underline">
                <Text mt={2}>You can login</Text>
              </Button>
            </Link>
          </Box>
        ) : (
          <Box textAlign="center">
            <Box position="relative" w={300} mx="auto">
              <Image src="/images/failed.webp" alt="verified" layout="fill" objectFit="cover" />
            </Box>
            <Text fontSize="lg" my={5}>
              Oops! Something went wrong while verifying your account
            </Text>
            <Button variant="unstyled" color="blue.500" textDecoration="underline" fontSize="sm">
              <Text mt={2}>The link may have expired. Please try sending another verification link.</Text>
            </Button>
          </Box>
        )}
      </Flex>
    </PublicRoute>
  )
}

export default VerifyAccount
