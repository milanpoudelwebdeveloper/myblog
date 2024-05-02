import { getBlogs } from '@/src/services/blog'
import { getCategories } from '@/src/services/category'
import { Box, Grid, Flex, Skeleton, Button, Center, useColorModeValue, GridItem } from '@chakra-ui/react'
import BlogCard from '@components/Common/BlogCard'
import MainLayout from '@components/Common/MainLayout'
import { useCustomToast } from '../hooks/useCustomToast'
import HeadingSeo from '@components/Common/HeadingSeo'
import { BLOGS } from '@constants/routes'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

const Blogs = ({ categories }: { categories: ICategory[] }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const buttonColor = useColorModeValue('white', '#1B1B1B')
  const textColor = useColorModeValue('rgb(35, 35, 35)', '#FFFFFF')
  const searchParams = useSearchParams()
  const search = searchParams.get('category')
  const page = searchParams.get('page')

  const { showToast } = useCustomToast()
  const { data: blogs, error } = useQuery({
    queryKey: ['getAllBlogs', search, page],
    queryFn: () => getBlogs(parseInt(page as string), search),
    enabled: !!search && !!page,
    staleTime: 60000
  })

  useEffect(() => {
    if (search) {
      setCurrentPage(1)
    }
  }, [search])

  const memoizedPageCount = useMemo(() => blogs?.totalPages ?? 0, [blogs?.totalPages, search])

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
        description="Find different categories of programming and read the latest blogs of your interest"
        link={`https://www.codewithmilan.com/${BLOGS}`}
      />
      <MainLayout>
        <Flex gap={4} flexWrap="wrap" borderTopWidth={1} borderBottomWidth={1} py={6}>
          {finalCategories?.map((category) => (
            <Link href={`/blogs?category=${category?.id}&page=${currentPage}`} key={category?.id} shallow>
              <Box
                key={category?.id}
                bg={category?.id == search ? 'rgb(27, 27, 27)' : 'rgb(255, 255, 255)'}
                color={category?.id == search ? 'rgb(255, 255, 255)' : 'rgb(35, 35, 35)'}
                boxShadow="rgba(32, 54, 86, 0.15) 0px 8px 20px"
                borderRadius={{ base: 14, '1xl': 20 }}
                fontWeight="500"
                fontSize={{ base: 'sm', '1xl': 'md' }}
                py={{ base: 1.5, '1xl': 2 }}
                px={{ base: 5, '1xl': 7 }}
                cursor="pointer"
                borderWidth={1}
                borderColor="rgb(27, 27, 27)"
              >
                #{category?.name}
              </Box>
            </Link>
          ))}
        </Flex>

        <Grid
          minW="full"
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
          gap={{ base: 6, lg: 12, xl: 8 }}
          mt={{ base: 8, '1xl': 10 }}
        >
          {!blogs?.data &&
            Array.from({ length: 6 }).map((_, index) => (
              <GridItem key={index} minW="100%">
                <Skeleton minW="full" minH={{ base: 424, '1xl': 400 }} className="skeleton-loader" key={index} transform="auto" />
              </GridItem>
            ))}
          {blogs?.data?.map((post: IBlog) => <BlogCard card={post} key={post?.id} />)}
        </Grid>
        <Center mt={7}>
          {Array.from({ length: memoizedPageCount }).map((_, index) => (
            <Link href={`/blogs?category=${search}&page=${index + 1}`} key={index} shallow>
              <Button
                variant="unstyled"
                key={index}
                bg={buttonColor}
                borderRadius={4}
                borderWidth={1}
                borderColor="#DFE3E8"
                fontWeight={parseInt(page as string) == index + 1 ? '700' : currentPage == index + 1 ? 700 : '500'}
                fontSize={{ base: 'sm', '1xl': 'md' }}
                mr={2}
                color={parseInt(page as string) == index + 1 ? 'rgb(165, 94, 234)' : textColor}
                display={memoizedPageCount > 1 ? 'block' : 'none'}
              >
                {index + 1 || 1}
              </Button>
            </Link>
          ))}
        </Center>
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
