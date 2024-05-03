import { Box, Button, Center, Grid, Text, useColorModeValue } from '@chakra-ui/react'
import BlogCard from './Common/BlogCard'
import Link from 'next/link'
import { BLOGS } from '@constants/routes'

const RecentBlogs = ({ blogs }: { blogs: IBlog[] }) => {
  const headingColor = useColorModeValue('#1A1A1A', '#FFFFFF')
  return (
    <Box mt={{ base: 7, '1xl': 12 }}>
      <Text color={headingColor} fontSize={{ base: 'xl', '1xl': '26px' }} fontWeight="700">
        Recent Blogs
      </Text>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
        columnGap={{ base: 8, '1xl': 10 }}
        rowGap={{ base: 8, '1xl': 10 }}
        mt={8}
      >
        {blogs?.map((blog: IBlog) => <BlogCard card={blog} key={blog?.id} />)}
      </Grid>
      <Center mt={10}>
        <Link href={BLOGS + '?category=all' + '&page=1'}>
          <Button variant="unstyled" color="white" fontSize={{ base: 'sm', '1xl': 'md' }} bg="#6941C8" px={4}>
            View All
          </Button>
        </Link>
      </Center>
    </Box>
  )
}

export default RecentBlogs
