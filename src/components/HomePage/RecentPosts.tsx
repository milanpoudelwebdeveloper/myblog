import { Box, Divider, Grid, Skeleton, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import BlogCard from '../Common/BlogCard'

import { useQuery } from '@tanstack/react-query'
import { getBlogs } from '@/src/services/blog'

const RecentPosts = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ['getRecentPosts'],
    queryFn: () => getBlogs('all', true),
    staleTime: 60000
  })
  const skeletonArray = Array.from({ length: 4 }, (_, index) => index)

  const headingColor = useColorModeValue('#1A1A1A', '#FFFFFF')
  return (
    <Box mt={{ base: 7, lg: 10 }}>
      <Text as="h1" color={headingColor} fontSize={{ base: 'lg', md: 'xl', '1xl': '24px' }} fontWeight="600" my={3}>
        Recent Blogs
      </Text>
      <Divider borderColor="#6941C6" w={9} borderWidth={2} />
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={7} mt={7}>
        {isLoading && skeletonArray?.map((index) => <Skeleton key={index} h={{ base: 300, xl: 340 }} />)}
        {blogs?.map((blog: IBlog) => <BlogCard card={blog} key={blog?.id} />)}
      </Grid>
    </Box>
  )
}

export default RecentPosts
