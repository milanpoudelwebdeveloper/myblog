import { getBlogsByUser } from '@/src/services/blog'
import { Box, Divider, Flex, Grid, Text, useColorModeValue } from '@chakra-ui/react'
import BlogCard from '@components/Common/BlogCard'
import MainLayout from '@components/Common/MainLayout'
import React, { useContext, useState } from 'react'
import HeadingSeo from '@components/Common/HeadingSeo'
import { useQuery } from '@tanstack/react-query'
import { useCustomToast } from '../hooks/useCustomToast'
import { AuthContext } from '../context/authContext'
import { BLOGS_BY_USER } from '@constants/routes'
import { getCategories } from '../services/category'

const BlogsByYou = ({ categories }: { categories: ICategory[] }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { user } = useContext(AuthContext)
  const headingColor = useColorModeValue('#1A1A1A', '#FFFFFF')

  const { data, error } = useQuery({
    queryKey: ['getBlogsByUser', user?.id, selectedCategory],
    queryFn: () => getBlogsByUser(selectedCategory, user?.id),
    staleTime: Infinity,
    enabled: !!user?.id
  })

  const { showToast } = useCustomToast()

  const finalCategories = [
    {
      id: 'all',
      name: 'All'
    },
    ...categories
  ]
  if (error) {
    showToast(error, 'error')
  }

  return (
    <>
      <HeadingSeo
        title="Blogs By You | Code With Milan"
        description="Find different categories and read the latest blogs of your interest"
        link={`https://www.codewithmilan.com/${BLOGS_BY_USER}`}
      />
      <MainLayout>
        <Text as="h1" color={headingColor} fontSize={{ base: 'lg', '1xl': 'xl' }} fontWeight="600" mb={2}>
          By You
        </Text>
        <Divider borderColor="#6941C6" w={9} borderWidth={2} />

        <Flex gap={4} mt={7}>
          {finalCategories?.map((category) => (
            <Box
              key={category?.id}
              bg={category?.id === selectedCategory ? 'rgb(165, 94, 234)' : 'white'}
              color={category?.id === selectedCategory ? 'rgb(255, 255, 255)' : 'rgb(35, 35, 35)'}
              boxShadow="rgba(32, 54, 86, 0.15) 0px 8px 20px"
              borderRadius={7}
              fontWeight="500"
              fontSize={{ base: 'sm', '1xl': 'md' }}
              py={{ base: 2, '1xl': 3 }}
              px={{ base: 4, '1xl': 5 }}
              cursor="pointer"
              onClick={() => setSelectedCategory(category?.id as string)}
            >
              {category?.name}
            </Box>
          ))}
        </Flex>

        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
          gap={{ base: 6, lg: 12, xl: 8 }}
          mt={{ base: 8, '1xl': 10 }}
        >
          {data?.map((post: IBlog) => <BlogCard card={post} key={post?.id} />)}
        </Grid>
      </MainLayout>
    </>
  )
}

export default BlogsByYou

export async function getStaticProps() {
  try {
    const categories = await getCategories()

    if (categories) {
      return {
        props: {
          categories: categories
        }
      }
    } else {
      return {
        props: {
          categories: []
        }
      }
    }
  } catch (error) {
    return {
      props: {
        categories: []
      }
    }
  }
}
