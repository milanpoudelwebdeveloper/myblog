import { Box, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react'
import MainLayout from '@components/Common/MainLayout'
import React from 'react'

const PageNotFound = () => {
  const textColor = useColorModeValue('gray.800', 'white')

  return (
    <MainLayout hideSidebar={true}>
      <Flex justifyContent="center" alignItems="center" color={textColor}>
        <Text fontSize="230px" transform="rotate(-10deg)">
          4
        </Text>
        <Box position="relative">
          <Text fontSize="280px" zIndex={10}>
            0
          </Text>
          <Image src="/images/404.webp" maxW="full" h="auto" alt="404" position="absolute" top={40} left="0" zIndex={-1} />
        </Box>
        <Text fontSize="230px" transform="rotate(10deg)">
          4
        </Text>
      </Flex>
      <Text fontSize="2xl" fontWeight="600" textAlign="center" mt={4}>
        Page Not Found
      </Text>
    </MainLayout>
  )
}

export default PageNotFound
