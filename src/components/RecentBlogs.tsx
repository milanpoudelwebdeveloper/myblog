import { Box, Grid, Text, useColorModeValue } from '@chakra-ui/react'
import BlogCard from './Common/BlogCard'

const RecentBlogs = ({ blogs }: { blogs: IBlog[] }) => {
  const headingColor = useColorModeValue('#1A1A1A', '#FFFFFF')
  return (
    <Box mt={{ base: 9, '1xl': 12 }}>
      <Text color={headingColor} fontSize={{ base: 'xl', '1xl': '26px' }} fontWeight="700">
        Recent Blogs
      </Text>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} columnGap={{ base: 8, '1xl': 12 }} rowGap={8} mt={8}>
        {blogs?.map((blog: IBlog) => <BlogCard card={blog} key={blog?.id} />)}
      </Grid>
    </Box>
  )
}

export default RecentBlogs
