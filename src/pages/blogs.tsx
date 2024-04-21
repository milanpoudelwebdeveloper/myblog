import { getBlogs } from '@/src/services/blog'
import { getCategories } from '@/src/services/category'
import { Box, Grid, Flex, Skeleton } from '@chakra-ui/react'
import BlogCard from '@components/Common/BlogCard'
import MainLayout from '@components/Common/MainLayout'
import React from 'react'
import { useCustomToast } from '../hooks/useCustomToast'
import HeadingSeo from '@components/Common/HeadingSeo'
import { BLOGS } from '@constants/routes'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

const Blogs = ({ categories }: { categories: ICategory[] }) => {
  const searchParams = useSearchParams()
  const search = searchParams.get('category')
  const { showToast } = useCustomToast()
  const {
    data: blogs,
    error,
    isLoading
  } = useQuery({
    queryKey: ['getAllBlogs', search],
    queryFn: () => getBlogs(search),
    staleTime: 60000
  })

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
        title="Blogs | Code With Milan"
        description="Find different categories and read the latest blogs of your interest"
        link={`https://codewithmilan.com/${BLOGS}`}
      />
      <MainLayout>
        <Flex gap={4}>
          {finalCategories?.map((category) => (
            <Link href={`/blogs?category=${category?.id}`} key={category?.id} shallow>
              <Box
                key={category?.id}
                bg={category?.id == search ? 'rgb(165, 94, 234)' : 'white'}
                color={category?.id == search ? 'rgb(255, 255, 255)' : 'rgb(35, 35, 35)'}
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

        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6} mt={8}>
          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton h={{ base: 424, '1xl': 400 }} className="skeleton-loader" key={index} transform="auto" />
            ))}
          {blogs?.map((post: IBlog, index: number) => <BlogCard card={post} key={post?.id} imageLoadFast={index === 0} />)}
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
