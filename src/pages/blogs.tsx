import { getBlogs } from '@/src/services/blog'
import { getCategories } from '@/src/services/category'
import { Box, Grid, Flex } from '@chakra-ui/react'
import BlogCard from '@components/Common/BlogCard'
import MainLayout from '@components/Common/MainLayout'
import React, { useEffect, useState } from 'react'
import { useCustomToast } from '../hooks/useCustomToast'

const Blogs = ({ categories }: { categories: ICategory[] }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [blogs, setBlogs] = useState<IBlog[]>([])
  const { showToast } = useCustomToast()

  const finalCategories = [
    {
      id: 'all',
      name: 'All'
    },
    ...categories
  ]

  useEffect(() => {
    if (selectedCategory) {
      getBlogs(selectedCategory)
        .then((data) => setBlogs(data))
        .catch((e) => {
          showToast(e, 'error')
        })
    }
  }, [selectedCategory])

  return (
    <MainLayout>
      <Box mt={{ base: 5, md: 1 }}>
        <Flex my={1} gap={4}>
          {finalCategories?.map((category) => (
            <Box
              key={category?.id}
              bg={category?.id === selectedCategory ? 'rgb(165, 94, 234)' : 'white'}
              color={category?.id === selectedCategory ? 'rgb(255, 255, 255)' : 'rgb(35, 35, 35)'}
              boxShadow="rgba(32, 54, 86, 0.15) 0px 8px 20px"
              borderRadius={12}
              fontWeight="500"
              fontSize={{ base: 'sm', md: 'md' }}
              py={{ base: 2, '1xl': 3 }}
              px={{ base: 4, '1xl': 5 }}
              cursor="pointer"
              onClick={() => setSelectedCategory(category?.id as string)}
            >
              {category?.name}
            </Box>
          ))}
        </Flex>
      </Box>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6} mt={5}>
        {blogs?.map((post) => <BlogCard card={post} key={post?.id} />)}
      </Grid>
    </MainLayout>
  )
}

export default Blogs

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
