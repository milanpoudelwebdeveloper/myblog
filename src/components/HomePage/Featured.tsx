import React from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'

const Featured = () => {
  return (
    <Box>
      <Image src="/images/image1.webp" alt="featured" borderRadius="10px" width="100%" height="300px" objectFit="cover" />
      <Text color="#6941C6" fontSize="sm" fontWeight="600" my={4}>
        Milan Poudel &#x2022; 2021-10-11
      </Text>
      <Text color="#1A1A1A" fontSize={{ base: 'xl', '1xl': '24px' }} fontWeight="600">
        UX review presentations
      </Text>
      <Text fontSize={{ base: 'sm', '1xl': 'md' }} color="#667085" my={4}>
        How do you create compelling presentations that wow your colleagues and impress your managers?
      </Text>
      <Flex gap={2} fontSize={{ base: 'sm', '1xl': 'md' }}>
        <Box bg="#F9F5FF" color="#6941C6" p={2} width="max-content">
          Programming
        </Box>
        <Box bg="#FDF2FA" color="#C11574" p={2} width="max-content">
          React
        </Box>
      </Flex>
    </Box>
  )
}

export default Featured
