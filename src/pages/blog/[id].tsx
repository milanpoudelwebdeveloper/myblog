import { Box, Text, useColorModeValue, Image, Flex, Button, Divider } from '@chakra-ui/react'
import MainLayout from '@components/Common/MainLayout'
import { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { getBlogDetails, saveBlog, unSaveBlog, updateReadCount } from '@/src/services/blog'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-dark.css'
import { convertDate } from '@/src/utils/convertDate'
import HeadingSeo from '@components/Common/HeadingSeo'
import { AuthContext } from '@/src/context/authContext'
import { useCustomToast } from '@/src/hooks/useCustomToast'
import { useQueryClient } from '@tanstack/react-query'
import SocialShares from '@components/Admin/Common/SocialShares'
import { ParsedUrlQuery } from 'querystring'
import { GetServerSidePropsContext } from 'next'
import { inter } from '@pages/_app'

const BlogDetails = ({ blogDetail }: { blogDetail: IBlog }) => {
  const client = useQueryClient()
  const [isSaved, setIsSaved] = useState(blogDetail?.saved)
  const bookMarkBg = useColorModeValue(isSaved ? 'black' : 'white', isSaved ? 'white' : 'black')
  const bookMarkStroke = useColorModeValue(isSaved ? 'white' : 'black', isSaved ? 'black' : 'white')
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const { showToast } = useCustomToast()
  const { id } = router.query

  const parentRef = useRef<HTMLDivElement>(null)
  const shareURL = `https://codewithmilan.com/blog/${id}`

  useEffect(() => {
    if (!parentRef.current) return
    const options = {
      threshold: 1
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.boundingClientRect.top < 0) {
        updateReadCount(id as string)
        observer.disconnect()
      }
    }, options)
    if (parentRef.current) observer.observe(parentRef.current)
    return () => {
      observer.disconnect()
    }
  }, [parentRef, id])

  const saveOrUnSaveHandler = async () => {
    if (!user?.id) {
      return showToast('Please login to save the blog', 'error')
    }
    let res
    try {
      if (isSaved) {
        res = await unSaveBlog(blogDetail?.id, user?.id)
      } else {
        res = await saveBlog(blogDetail?.id, user?.id)
      }
      client.invalidateQueries({ queryKey: ['getSavedBlogs'] })
      setIsSaved((prev) => !prev)
      showToast(res, 'success')
    } catch (error) {
      showToast(error, 'error')
    }
  }

  return (
    <>
      <HeadingSeo
        title={blogDetail?.title}
        description={blogDetail?.content?.slice(0, 140)}
        link={`https://codewithmilan.com/blog/${id}`}
        image={blogDetail?.coverimage}
      />
      <MainLayout pxMobile={0}>
        <Flex className={inter.className} gap={10} direction={{ base: 'column', md: 'row' }}>
          <Flex
            minW={{ base: 360, '1xl': 420 }}
            h={{ base: 370, '1xl': 470 }}
            position="sticky"
            display={{ base: 'none', md: 'flex' }}
            left={0}
            top={32}
            overflow="auto"
            px={4}
            direction="column"
            fontSize={{ base: 'sm', '1xl': 'md' }}
            gap={4}
            borderWidth={1}
            borderColor="rgb(27, 27, 27)"
            borderRadius={8}
            py={4}
            zIndex={10}
          >
            <Text fontSize="lg" fontWeight="600">
              Table Of Contents
            </Text>
            <Divider borderColor="rgb(27, 27, 27)" />
            <Text>&#8226; What to expect from here on out</Text>
            <Text>&#8226; Typography should be easy</Text>
            <Text>&#8226; What if we stack headings?</Text>
            <Text>&#8226; When a heading comes after a paragraph …</Text>
            <Text>&#8226; Sometimes I even use code in headings</Text>
            <Text>&#8226; Typography should be easy</Text>
            <Text>&#8226; What if we stack headings?</Text>
            <Text>&#8226; When a heading comes after a paragraph …</Text>
            <Text>&#8226; When a heading comes after a paragraph …</Text>
            <Text>&#8226; When a heading comes after a paragraph …</Text>
          </Flex>
          <Box position="relative">
            <Box h={{ base: 270, xl: 300, '1xl': 360 }} position="relative" overflow="hidden">
              <Box
                position="absolute"
                w="full"
                h="full"
                backgroundImage="linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(27, 27, 27, 0.8))"
                zIndex={10}
              />
              <Image src={blogDetail?.coverimage} alt="blog-image" my={4} width="100%" maxW="full" objectFit="cover" maxH="full" />

              <Flex position="absolute" bottom={{ base: 6, '1xl': 9 }} left={{ base: 6, '1xl': 10 }} zIndex={12}>
                <Box>
                  <Text
                    color="white"
                    maxW={{ base: 300, '1xl': '700' }}
                    fontSize={{ base: 'lg', '1xl': '24px' }}
                    fontWeight="bold"
                    lineHeight={1.7}
                    textAlign="center"
                  >
                    {blogDetail?.title}
                  </Text>
                  <Flex justifyContent="center" my={3} alignItems="center" color="white" fontSize="sm" fontWeight="300">
                    <Flex alignItems="center" gap={3} ml={2}>
                      <Image
                        src={blogDetail?.profileimage}
                        fallbackSrc="/images/default-avatar.webp"
                        alt="profile-image"
                        borderRadius="full"
                        w={{ base: 8, '1xl': 10 }}
                        h={{ base: 8, '1xl': 10 }}
                        objectFit="cover"
                      />
                      <Text>{blogDetail?.name} &#x2022;</Text>
                    </Flex>
                    <Text>{convertDate(blogDetail?.createdat)}</Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>

            <Flex alignItems="center" justifyContent="space-between" px={2} mt={4}>
              <SocialShares shareURL={shareURL} blogDetail={blogDetail} />
              <Button variant="unstyled" onClick={saveOrUnSaveHandler} minW="max-content">
                <svg width="23" height="23" viewBox="0 0 20 20" fill={bookMarkBg} xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 19L8 14L1 19V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V19Z"
                    stroke={bookMarkStroke}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </Flex>

            <Box ref={parentRef} />
            <Flex
              minW={{ base: 'full', md: 400 }}
              h={430}
              position={{ base: 'static', md: 'sticky' }}
              left={0}
              top={32}
              overflow="auto"
              px={4}
              direction="column"
              fontSize="md"
              gap={4}
              borderWidth={1}
              borderColor="rgb(27, 27, 27)"
              borderRadius={8}
              py={4}
              zIndex={10}
              display={{ base: 'flex', md: 'none' }}
            >
              <Text>Table Of Contents</Text>
              <Divider borderColor="rgb(27, 27, 27)" />
              <Text>&#8226; What to expect from here on out</Text>
              <Text>&#8226; Typography should be easy</Text>
              <Text>&#8226; What if we stack headings?</Text>
              <Text>&#8226; When a heading comes after a paragraph …</Text>
              <Text>&#8226; Sometimes I even use code in headings</Text>
              <Text>&#8226; Typography should be easy</Text>
              <Text>&#8226; What if we stack headings?</Text>
              <Text>&#8226; When a heading comes after a paragraph …</Text>
              <Text>&#8226; When a heading comes after a paragraph …</Text>
              <Text>&#8226; When a heading comes after a paragraph …</Text>
            </Flex>
            <Box className="ql-snow" mt={10} maxW={{ base: 670, '1xl': 900 }}>
              <Box
                className="content ql-editor custom-scrollbar"
                fontSize={{ base: 'sm', '1xl': 'lg' }}
                lineHeight="30px"
                dangerouslySetInnerHTML={{
                  __html: blogDetail?.content
                }}
              />
            </Box>
          </Box>
        </Flex>
      </MainLayout>
    </>
  )
}

export default BlogDetails

interface Params extends ParsedUrlQuery {
  id: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as Params
  const { res } = context
  const userId = context.query.query
  res.setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate')

  try {
    const blogDetails = await getBlogDetails(id as string, userId as string)

    if (blogDetails) {
      return {
        props: {
          blogDetail: blogDetails
        }
      }
    } else {
      return {
        props: {
          blogDetail: {}
        }
      }
    }
  } catch (error) {
    return {
      props: {
        blogDetail: {}
      }
    }
  }
}
