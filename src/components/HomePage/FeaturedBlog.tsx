import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const FeaturedBlog = ({ blog }: { blog: IBlog }) => {
  return (
    <Box
      bg={`url(${blog.coverimage}), linear-gradient(rgba(0, 0, 0, 0), rgba(16, 53, 101, 0.38))`}
      h={{ base: 250, md: 270, '1xl': 400 }}
      borderRadius={10}
      position="relative"
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      boxShadow="rgba(32, 54, 86, 0.15) 0px 8px 20px"
    >
      <Flex alignItems="flex-end" h="full" p={{ base: 5, '1xl': 8 }}>
        <Box>
          <Text
            mb={{ base: 3, '1xl': 4 }}
            fontSize={{ base: 'md', '1xl': '24px' }}
            color="white"
            fontWeight="700"
            textShadow="black 0px 0px 35px"
          >
            {blog.title}
          </Text>
          <Flex gap={3}>
            <Box
              bg="rgb(252, 92, 101)"
              boxShadow="rgba(0, 0, 0, 0.05) 0px 2px 4px 0px"
              color="white"
              px={2}
              py={1.5}
              w="max-content"
              fontSize="xs"
              borderRadius={7}
              fontWeight="600"
            >
              Featured
            </Box>
            <Flex gap={3} fontSize={{ base: 'xs', md: 'sm' }}>
              {blog?.categories?.map((categoryname) => (
                <Box px={2} py={1.5} bg="white" color="#C11574" fontSize="xs" borderRadius={7} key={categoryname}>
                  <Text>{categoryname}</Text>
                </Box>
              ))}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default FeaturedBlog
