import { Box, Divider, Flex, Input, Select, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

interface BlogFilterProps {
  setPublishedStatus: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

const BlogFilter = ({ setPublishedStatus }: BlogFilterProps) => {
  const publishedStatus = [
    {
      value: 'true',
      label: 'Yes'
    },
    {
      value: 'false',
      label: 'No'
    }
  ]
  return (
    <Flex bg="white" mb={7} fontSize="sm" fontWeight="bold" borderRadius={10} w="max-content" borderWidth="0.6px" borderColor="#D5D5D5">
      <Box p={5}>
        <Box w={6} h="auto" position="relative">
          <Image src="/images/filtericon.webp" alt="filter" objectFit="cover" layout="fill" />
        </Box>
      </Box>
      <Divider orientation="vertical" borderColor="#D5D5D5" h="16" opacity={0.7} />
      <Text p={5}>Filter By</Text>
      <Divider orientation="vertical" borderColor="#D5D5D5" h="16" opacity={0.7} />
      <Input type="date" placeholder="Date" maxW="max-content" border="none" p={8} />
      <Divider orientation="vertical" borderColor="#D5D5D5" h="16" opacity={0.7} />
      <Select
        p={3}
        width="max-content"
        border="none"
        placeholder="Published Status"
        onChange={(e) => setPublishedStatus(e?.target?.value === 'true' ? true : false)}
      >
        {publishedStatus.map((status) => (
          <option key={status?.label} value={status?.value}>
            {status?.label}
          </option>
        ))}
      </Select>
      <Divider orientation="vertical" borderColor="#D5D5D5" h="16" opacity={0.7} />
      <Select p={3} width="max-content" border="none" placeholder="Category">
        <option value="All">Yes</option>
        <option value="Active">No</option>
      </Select>
      <Divider orientation="vertical" borderColor="#D5D5D5" h="16" opacity={0.7} />
      <Flex color="#EA0234" p={5} gap={2} alignItems="center">
        <Box w={4} h="auto" position="relative">
          <Image src="/images/replay.webp" alt="reset" objectFit="cover" layout="fill" />
        </Box>
        <Text>Reset Filter</Text>
      </Flex>
    </Flex>
  )
}

export default BlogFilter
