import { Box, Divider, Grid, Text, useColorModeValue } from '@chakra-ui/react'
import BlogCard from './Common/BlogCard'

const RecentBlogs = ({ blogs }: { blogs: IBlog[] }) => {
  const headingColor = useColorModeValue('#1A1A1A', '#FFFFFF')
  return (
    <Box mt={{ base: 9, '1xl': 12 }}>
      <Text color={headingColor} fontSize={{ base: 'xl', '1xl': '24px' }} fontWeight="700">
        Recent Blogs
      </Text>
      <Divider borderColor="#6941C6" w={9} borderWidth={2} mt={1} />
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={7} mt={6}>
        {blogs?.map((blog: IBlog) => <BlogCard card={blog} key={blog?.id} />)}
      </Grid>
    </Box>
  )
}

export default RecentBlogs
