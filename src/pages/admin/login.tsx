import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import React from 'react'

const AdminLogin = () => {
  return (
    <Flex bg="#568AFF" h="100vh" overflowY="scroll" justifyContent="center" alignItems="center">
      <Box borderRadius={24} bg="white" px={14} py={20} textAlign="center">
        <Text color="#202224" fontSize="24px" fontWeight="600">
          Login to Account
        </Text>
        <Text fontSize="md" fontWeight="500" mt={4}>
          Please enter your email and password to continue
        </Text>
        <Box mt={6}>
          <FormControl mb={5}>
            <FormLabel opacity={0.8} color="#202224">
              Email
            </FormLabel>
            <Input
              type="email"
              borderColor="#DFEAF2"
              borderRadius={8}
              bg="#F1F4F9"
              _placeholder={{ color: '#718EBF' }}
              placeholder="Enter Email"
            />
          </FormControl>
          <FormControl>
            <FormLabel opacity={0.8} color="#202224">
              Password
            </FormLabel>
            <Input
              type="password"
              borderColor="#DFEAF2"
              borderRadius={8}
              bg="#F1F4F9"
              _placeholder={{ color: '#718EBF' }}
              placeholder="Enter Password"
            />
          </FormControl>
          <Text color="#202224" fontSize="md" opacity="0.6" textAlign="right" mt={5}>
            Forgot Password?
          </Text>
          <Button bg="#4880FF" color="white" fontWeight="normal" type="submit" w="80%" mt={10}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Flex>
  )
}

export default AdminLogin
