import { convertDate } from '@/src/utils/convertDate'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const FeaturedBlog = ({ blog }: { blog: IBlog }) => {
  return (
    <Box bg={`url(${blog.coverimage})`} h={400} borderRadius={10} position="relative" objectFit="cover" bgPosition="center">
      <Flex alignItems="flex-end" h="full" p={7}>
        <Box>
          <Box bg="rgb(252, 92, 101)" color="white" p={1} w="max-content" fontSize="xs" borderRadius={10}>
            Featured
          </Box>
          <Text fontSize="24px" color="white" fontWeight="bold" textShadow="black 0px 0px 35px">
            {blog.title}
          </Text>
          <Text color="white" fontSize="xs" fontWeight="500">
            {blog?.name} &#x2022; {convertDate(blog?.createdat)}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default FeaturedBlog
