import { Box, Text, useColorModeValue, Image, Flex, Button } from '@chakra-ui/react'
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

const BlogDetails = ({ blogDetail }: { blogDetail: IBlog }) => {
  const client = useQueryClient()
  const [isSaved, setIsSaved] = useState(blogDetail?.saved)
  const titleColor = useColorModeValue('#1A1A1A', 'rgb(237, 242, 247)')
  const dateColor = useColorModeValue('rgb(0, 0, 0)', '#c0c5d0')
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
      <MainLayout>
        <Box position="relative">
          <Flex>
            <Text color={titleColor} fontSize={{ base: '28px', '1xl': '34px' }} fontWeight="bold" lineHeight={1.5}>
              {blogDetail?.title}
            </Text>
          </Flex>
          <Flex mt={5} mb={7} alignItems="center" color={dateColor} fontSize="sm" fontWeight="300">
            <Flex alignItems="center" gap={3} ml={2}>
              <Image
                src={blogDetail?.profileimage}
                fallbackSrc="/images/default-avatar.webp"
                alt="profile-image"
                borderRadius="full"
                w={10}
                h={10}
                objectFit="cover"
              />
              <Text>By {blogDetail?.name} &#x2022;</Text>
            </Flex>
            <Text>{convertDate(blogDetail?.createdat)}</Text>
          </Flex>

          <Box mb={10}>
            <Image
              src={blogDetail?.coverimage}
              alt="blog-image"
              borderRadius={10}
              my={4}
              width="100%"
              maxW="full"
              objectFit="cover"
              h={{ base: 220, xl: 330, '1xl': 360 }}
              maxH="full"
            />
            <Flex alignItems="center" justifyContent="space-between" px={2}>
              <SocialShares shareURL={shareURL} blogDetail={blogDetail} />
              <Button variant="unstyled" onClick={saveOrUnSaveHandler} minW="max-content">
                <svg width="25" height="25" viewBox="0 0 20 20" fill={bookMarkBg} xmlns="http://www.w3.org/2000/svg">
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
          </Box>
          <Box ref={parentRef} />
          <Box className="ql-snow">
            <Box
              className="content ql-editor custom-scrollbar"
              fontSize={{ base: 'sm', '1xl': 'md' }}
              lineHeight="30px"
              dangerouslySetInnerHTML={{
                __html: blogDetail?.content
              }}
            />
          </Box>
        </Box>
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
