import { getBlogs } from '@/src/services/blog'
import { getCategories } from '@/src/services/category'
import { Box, Grid, Flex } from '@chakra-ui/react'
import BlogCard from '@components/Common/BlogCard'
import MainLayout from '@components/Common/MainLayout'
import React, { useEffect, useState } from 'react'
import { useCustomToast } from '../hooks/useCustomToast'
import HeadingSeo from '@components/Common/HeadingSeo'
import { BLOGS } from '@constants/routes'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const Blogs = ({ categories }: { categories: ICategory[] }) => {
  const searchParams = useSearchParams()
  const search = searchParams.get('category')
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
    if (search) {
      getBlogs(search)
        .then((data) => setBlogs(data))
        .catch((e) => {
          showToast(e, 'error')
        })
    }
  }, [search])

  return (
    <>
      <HeadingSeo
        title="Blogs | Code With Milan"
        description="Find different categories and read the latest blogs of your interest"
        link={`https://codewithmilan.com/${BLOGS}`}
      />
      <MainLayout>
        <Box>
          <Flex gap={4}>
            {finalCategories?.map((category) => (
              <Link href={`/blogs?category=${category?.id}`} key={category?.id}>
                <Box
                  key={category?.id}
                  bg={category?.id === parseInt(search as string) ? 'rgb(165, 94, 234)' : 'white'}
                  color={category?.id === parseInt(search as string) ? 'rgb(255, 255, 255)' : 'rgb(35, 35, 35)'}
                  boxShadow="rgba(32, 54, 86, 0.15) 0px 8px 20px"
                  borderRadius={7}
                  fontWeight="500"
                  fontSize={{ base: 'sm', '1xl': 'md' }}
                  py={{ base: 2, '1xl': 3 }}
                  px={{ base: 4, '1xl': 5 }}
                  cursor="pointer"
                >
                  {category?.name}
                </Box>
              </Link>
            ))}
          </Flex>
        </Box>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6} mt={5}>
          {blogs?.map((post) => <BlogCard card={post} key={post?.id} />)}
        </Grid>
      </MainLayout>
    </>
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
