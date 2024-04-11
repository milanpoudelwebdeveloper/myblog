import { Box, Divider, Flex, Skeleton, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPopularBlogs } from '@/src/services/blog'
import { convertDate } from '@/src/utils/convertDate'
import { useCustomToast } from '@/src/hooks/useCustomToast'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { base64File } from '@constants/files'

const CategoryComponent = dynamic(() => import('./Categories'))

const SideBar = () => {
  const { showToast } = useCustomToast()
  const bgColor = useColorModeValue('white', '#1a1a1a')
  const headingColor = useColorModeValue('#1A1A1A', '#FFFFFF')
  const dividerColor = useColorModeValue('rgba(0, 0, 0, 0.15)', 'rgba(255, 255, 255, 0.15)')

  const { error, data, isLoading } = useQuery({
    queryKey: ['getPopularPosts'],
    queryFn: getPopularBlogs,
    staleTime: 60000
  })

  if (error) {
    showToast('Error fetching popular posts', 'error')
  }

  return (
    <Box w="full">
      <Box py={7} px={{ base: 5, '1xl': 6 }} boxShadow="rgba(32, 54, 86, 0.15) 0px 8px 20px" borderRadius={14} mb={10} bgColor={bgColor}>
        <Text as="h2" textAlign="center" mb={2} color={headingColor} fontSize="xl" fontWeight="700">
          Popular Posts
        </Text>
        <Divider borderColor="#6941C6" w={10} borderWidth={2} mx="auto" mb={8} />
        {isLoading && <Skeleton h={470} borderRadius={20} mb={6} />}
        {data?.map((blog: IBlog) => (
          <Box key={blog?.id} mb={4}>
            <Flex alignItems="start" gap={{ base: 4, '1xl': 6 }}>
              <Box
                position="relative"
                w={{ base: 12, md: 14 }}
                h={{ base: 12, md: 14 }}
                maxW="full"
                maxH="full"
                borderRadius="full"
                overflow="hidden"
                flexShrink={0}
              >
                <Image
                  src={blog?.coverimage}
                  alt="popular"
                  style={{
                    objectFit: 'cover'
                  }}
                  fill
                  placeholder="blur"
                  blurDataURL={base64File}
                />
              </Box>
              <Box>
                <Text fontSize={{ base: 'sm', '1xl': 'md' }} mb={1} fontWeight="700">
                  {blog?.title}
                </Text>

                <Text color="#6941C6" fontSize="xs">
                  {convertDate(blog?.createdat)}
                </Text>
              </Box>
            </Flex>
            <Divider my={3} borderColor={dividerColor} />
          </Box>
        ))}
      </Box>
      <CategoryComponent />
    </Box>
  )
}

export default SideBar
