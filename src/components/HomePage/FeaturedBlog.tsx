import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const FeaturedBlog = ({ blog }: { blog: IBlog }) => {
  const bgColor = useColorModeValue('white', '#1a1a1a')
  const titleColor = useColorModeValue('#1A1A1A', 'rgb(255, 255, 255)')
  const boxShadowColor = useColorModeValue('rgba(32, 54, 86, 0.15) 0px 8px 20px', 'rgba(255, 255, 255, 0.8)')

  return (
    <Box boxShadow={boxShadowColor} borderRadius={10} bg={bgColor} pb={7}>
      <Box
        bg={`url(${blog.coverimage}), linear-gradient(rgba(0, 0, 0, 0), rgba(16, 53, 101, 0.38))`}
        h={{ base: 240, md: 270, '1xl': 350 }}
        borderTopStartRadius={10}
        position="relative"
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        boxShadow="rgba(32, 54, 86, 0.15) 0px 8px 20px"
      />
      <Box pl={{ base: 5, '1xl': 7 }}>
        <Text fontSize="xl" color={titleColor} fontWeight="700" my={5}>
          {blog?.title}
        </Text>

        <Flex gap={{ base: 3, '1xl': 4 }} fontSize="sm" fontWeight="600">
          <Box
            bg="rgb(252, 92, 101)"
            boxShadow="rgba(0, 0, 0, 0.05) 0px 2px 4px 0px"
            color="white"
            px={2}
            py={1.5}
            w="max-content"
            borderRadius={7}
          >
            Featured
          </Box>
          <Flex gap={{ base: 3, '1xl': 4 }}>
            {blog?.categories?.map((categoryname) => (
              <Box bg="#FDF2FA" color="#C11574" borderRadius={7} px={2} py={1.5} key={categoryname}>
                <Text>{categoryname}</Text>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default FeaturedBlog
