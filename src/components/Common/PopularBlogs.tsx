import { Box, Divider, Flex, Skeleton, Text, useColorModeValue } from '@chakra-ui/react'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPopularBlogs } from '@/src/services/blog'
import { convertDate } from '@/src/utils/convertDate'
import { useCustomToast } from '@/src/hooks/useCustomToast'
import Image from 'next/image'
import { base64File } from '@constants/files'
import { AuthContext } from '@/src/context/authContext'
import Link from 'next/link'
import { useRouter } from 'next/router'

const PopularBlogs = () => {
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const { showToast } = useCustomToast()
  const dividerColor = useColorModeValue('#D9D9D9', 'rgba(255, 255, 255, 0.15)')
  const dateColor = useColorModeValue('rgb(35, 35, 35)', '#C0C5D0')
  const isHomePage = router.pathname === '/'
  const isBlogPage = router.pathname.includes('/blogs')

  const { error, data, isLoading } = useQuery({
    queryKey: ['getPopularPosts'],
    queryFn: getPopularBlogs,
    staleTime: 60000
  })

  if (error) {
    showToast('Error fetching popular posts', 'error')
  }

  const getDynamicLink = (id: string) => {
    return user?.id ? `/blog/${id}?query=${user?.id}` : `/blog/${id}`
  }

  return (
    <>
      {isLoading && <Skeleton className="skeleton-loader" transform="auto" h={390} borderRadius={20} mb={6} />}
      {data?.map((blog: IBlog) => (
        <Link href={getDynamicLink(blog?.id as string)} key={blog?.id}>
          <Box mb={4}>
            <Flex alignItems="center" gap={{ base: 4, '1xl': 5 }}>
              <Box position="relative" w={59} h={59} maxW="full" maxH="full" borderRadius="full" overflow="hidden" flexShrink={0}>
                <Image
                  src={blog?.coverimage}
                  alt="popular"
                  style={{
                    objectFit: 'cover'
                  }}
                  fill
                  placeholder="blur"
                  blurDataURL={base64File}
                  loading="lazy"
                  sizes="auto"
                />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="600" mb={1} lineHeight="1.5" as={isHomePage ? 'h3' : isBlogPage ? 'h1' : 'h2'}>
                  {blog?.title}
                </Text>
                <Text color={dateColor} fontSize="xs" fontWeight="300">
                  {convertDate(blog?.createdat)}
                </Text>
              </Box>
            </Flex>
            <Divider my={3} borderColor={dividerColor} />
          </Box>
        </Link>
      ))}
    </>
  )
}

export default PopularBlogs
