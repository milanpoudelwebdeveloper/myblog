import { getSavedBlogs } from '@/src/services/blog'
import { Box, Divider, Grid, Image, Text, useColorModeValue } from '@chakra-ui/react'
import BlogCard from '@components/Common/BlogCard'
import MainLayout from '@components/Common/MainLayout'
import React, { useContext } from 'react'
import HeadingSeo from '@components/Common/HeadingSeo'
import { useQuery } from '@tanstack/react-query'
import { useCustomToast } from '../hooks/useCustomToast'
import { AuthContext } from '../context/authContext'
import { SAVED_BLOGS } from '@constants/routes'

const SavedBlogs = () => {
  const { user } = useContext(AuthContext)
  const headingColor = useColorModeValue('#1A1A1A', '#FFFFFF')

  const { data, error, isLoading } = useQuery({
    queryKey: ['getSavedBlogs'],
    queryFn: () => getSavedBlogs(user?.id),
    staleTime: Infinity,
    enabled: !!user?.id
  })

  const { showToast } = useCustomToast()
  if (error) {
    showToast(error, 'error')
  }

  return (
    <>
      <HeadingSeo
        title="Saved Blogs | Code With Milan"
        description="Find different categories and read the latest blogs of your interest"
        link={`https://www.codewithmilan.com/${SAVED_BLOGS}`}
      />
      <MainLayout>
        <Text as="h1" color={headingColor} fontSize={{ base: 'lg', md: 'xl', '1xl': '24px' }} fontWeight="600" mb={2} mt={4}>
          Saved Blogs
        </Text>
        <Divider borderColor="#6941C6" w={9} borderWidth={2} />
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
          gap={{ base: 6, lg: 12, xl: 8 }}
          mt={{ base: 8, '1xl': 10 }}
        >
          {data?.map((post: IBlog) => <BlogCard card={post} key={post?.id} />)}
        </Grid>
        {!data && !isLoading && (
          <Box textAlign="center">
            <Image src="/images/notfound.webp" alt="No blogs" w={400} objectFit="cover" mx="auto" mt={-16} mb={-10} />
            <Text fontSize="xl" fontWeight="300">
              Oops! Looks like you haven&apos;t saved anything yet.
            </Text>
          </Box>
        )}
      </MainLayout>
    </>
  )
}

export default SavedBlogs
