import { Box, Divider, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import Categories from './Categories'
import { useQuery } from '@tanstack/react-query'
import { getPopularBlogs } from '@/src/services/blog'
import { convertDate } from '@/src/utils/convertDate'
import { useCustomToast } from '@/src/hooks/useCustomToast'

const SideBar = () => {
  const { showToast } = useCustomToast()
  const { error, data } = useQuery({
    queryKey: ['getPopularPosts'],
    queryFn: getPopularBlogs,
    staleTime: 60000
  })

  if (error) {
    showToast('Error fetching popular posts', 'error')
  }

  return (
    <Box flex={1}>
      <Box p={{ base: 5, lg: 8 }} boxShadow="rgba(32, 54, 86, 0.15) 0px 8px 20px" borderRadius={14} mb={10}>
        <Text textAlign="center" mb={4} color="#1A1A1A" fontSize={{ base: 'lg', lg: 'xl', '1xl': '24px' }} fontWeight="600">
          Popular Posts
        </Text>
        <Divider borderColor="#6941C6" w={20} borderWidth={2} mx="auto" mb={6} mt={2} />
        {data?.map((blog: IBlog) => (
          <Box key={blog?.id} mb={4}>
            <Flex alignItems="start" gap={{ base: 4, lg: 6 }}>
              <Image
                src={blog.coverimage}
                alt="featured"
                borderRadius="full"
                width={{ base: 14, md: 16, '1xl': 20 }}
                height={{ base: 14, md: 16, '1xl': 20 }}
                objectFit="cover"
              />
              <Box>
                <Text fontSize={{ base: 'sm', lg: 'md', '1xl': 'lg' }} mb={3} fontWeight="bold">
                  {blog.title}
                </Text>

                <Text color="#6941C6" fontSize={{ base: 'xs', lg: 'sm', '1xl': 'md' }}>
                  {convertDate(blog?.createdat)}
                </Text>
                <Divider my={3} />
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
      <Categories />
    </Box>
  )
}

export default SideBar
