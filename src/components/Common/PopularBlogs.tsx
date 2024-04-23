import { Box, Divider, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { convertDate } from '@/src/utils/convertDate'
import Image from 'next/image'
import { base64File } from '@constants/files'
import { AuthContext } from '@/src/context/authContext'
import Link from 'next/link'
import { useRouter } from 'next/router'

const PopularBlogs = ({ blogs }: { blogs: IBlog[] }) => {
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const dividerColor = useColorModeValue('#D9D9D9', 'rgba(255, 255, 255, 0.15)')
  const dateColor = useColorModeValue('rgb(35, 35, 35)', '#C0C5D0')
  const isHomePage = router.pathname === '/'
  const isBlogPage = router.pathname.includes('/blogs')

  const getDynamicLink = (id: string) => {
    return user?.id ? `/blog/${id}?query=${user?.id}` : `/blog/${id}`
  }

  return (
    <Box>
      <Text fontSize={{ base: 'xl', '1xl': '24px' }} fontWeight="600" mb={4}>
        Popular Read
      </Text>
      <Divider mb={{ base: 4, lg: 3, xl: 4 }} borderColor={dividerColor} />
      {blogs?.slice(0, 4).map((blog: IBlog) => (
        <Link href={getDynamicLink(blog?.id as string)} key={blog?.id}>
          <Box mb={{ base: 3, '1xl': 7 }}>
            <Flex alignItems="center" gap={{ base: 4, '1xl': 5 }}>
              <Box
                position="relative"
                w={{ base: 12, '1xl': 55 }}
                h={{ base: 12, '1xl': 55 }}
                maxW="full"
                maxH="full"
                borderRadius="10px"
                overflow="hidden"
                flexShrink={0}
              >
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
                  sizes="270px"
                />
              </Box>
              <Box>
                <Text
                  fontSize={{ base: 'sm', '1xl': 'md' }}
                  fontWeight="600"
                  mb={{ base: 1, lg: 0, xl: 1 }}
                  lineHeight="1.5"
                  as={isHomePage ? 'h3' : isBlogPage ? 'h1' : 'h2'}
                >
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
    </Box>
  )
}

export default PopularBlogs
