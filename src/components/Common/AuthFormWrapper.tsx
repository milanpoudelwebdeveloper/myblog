import { Box, Flex, GlobalStyle, Image as ChakraImage, LightMode, Text } from '@chakra-ui/react'

import { PublicRoute } from '@components/RouteAccess'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
}

const AuthFormWrapper = ({ children }: Props) => {
  return (
    <PublicRoute>
      <LightMode>
        <GlobalStyle />
        <Flex h="100vh" overflowY="scroll" justifyContent="center" alignItems="center">
          <Box
            w={{ base: 'full', md: '50%' }}
            minH={{ md: '100dvh', lg: 'full' }}
            overflow="hidden"
            maxH="full"
            display={{ base: 'none', md: 'block' }}
          >
            <ChakraImage src="/images/login.svg" alt="Login" w="full" h="full" objectFit="cover" objectPosition="center" />
          </Box>
          <Box
            flex={1}
            maxH={{ base: 'auto', lg: 498, '1xl': 590 }}
            overflowY="auto"
            overflowX="hidden"
            borderRadius={24}
            bg="white"
            px={{ base: 7, md: 14, xl: 20 }}
            py={{ base: 4, md: 9, '1xl': 10 }}
            textAlign="center"
          >
            <Box mx="auto" maxW={{ base: 480, '1xl': 570 }}>
              <Link href="/" shallow passHref>
                <Flex gap={4} justifyContent="center" alignItems="center">
                  <Box
                    position="relative"
                    minW={{ base: 9, '1xl': 10 }}
                    minH={{ base: 9, '1xl': 10 }}
                    maxW="max-content"
                    maxH="full"
                    borderRadius="full"
                    overflow="hidden"
                  >
                    <Image
                      src="/images/logo.webp"
                      alt="logo"
                      fill
                      sizes="(min-width: 780px) 48px, 36px"
                      style={{
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                  <Text color="#202224" fontSize={{ base: 'xl', '1xl': '22px' }} fontWeight="bold" as="h1">
                    Code With Milan
                  </Text>
                </Flex>
              </Link>
              <Box>{children}</Box>
            </Box>
          </Box>
        </Flex>
      </LightMode>
    </PublicRoute>
  )
}

export default AuthFormWrapper
