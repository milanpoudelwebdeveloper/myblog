import { Box, Divider, Grid, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import BlogCard from '../Common/BlogCard'

const RecentPosts = ({ blogs }: { blogs: IBlog[] }) => {
  const headingColor = useColorModeValue('#1A1A1A', '#FFFFFF')
  return (
    <Box mt={{ base: 7, lg: 10 }}>
      <Text color={headingColor} fontSize={{ base: 'lg', md: 'xl', '1xl': '24px' }} fontWeight="600" my={3}>
        Recent Posts
      </Text>
      <Divider borderColor="#6941C6" w={9} borderWidth={2} />
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={7}>
        {blogs?.map((blog) => <BlogCard card={blog} key={blog?.id} />)}
      </Grid>
    </Box>
  )
}

export default RecentPosts
