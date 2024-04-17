import { Box, Divider, Flex, Image, Input, Select, Text } from '@chakra-ui/react'
import React from 'react'

const MessagesFilter = () => {
  return (
    <Flex bg="white" mb={7} fontSize="sm" fontWeight="bold" borderRadius={10} w="max-content" borderWidth="0.6px" borderColor="#D5D5D5">
      <Box p={5}>
        <Image src="/images/filtericon.webp" alt="filter" w={6} h="auto" objectFit="cover" />
      </Box>
      <Divider orientation="vertical" borderColor="#D5D5D5" h="16" opacity={0.7} />
      <Text p={5}>Filter By</Text>
      <Divider orientation="vertical" borderColor="#D5D5D5" h="16" opacity={0.7} />
      <Input type="date" placeholder="Date" maxW="max-content" border="none" p={8} />
      <Divider orientation="vertical" borderColor="#D5D5D5" h="16" opacity={0.7} />
      <Select p={3} width="max-content" border="none" placeholder="Status">
        <option value="All">All</option>
        <option value="Active">Solved</option>
        <option value="Inactive">Unsolved</option>
      </Select>
      <Divider orientation="vertical" borderColor="#D5D5D5" h="16" opacity={0.7} />
    </Flex>
  )
}

export default MessagesFilter
