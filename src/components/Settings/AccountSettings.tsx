import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const AccountSettings = () => {
  return (
    <Box>
      <Flex alignItems="center" my={4} gap={2}>
        <Text>Do you want to write on this plaform? You can request to be a writer</Text>
        <Button variant="unstyled" color="#6941C6">
          Request Here
        </Button>
      </Flex>
    </Box>
  )
}

export default AccountSettings
