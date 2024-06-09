import { Box, Text, useColorModeValue, Flex, Button, Image as NextChakraImage } from '@chakra-ui/react'
import MainLayout from '@components/Common/MainLayout'
import { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { getBlogDetails, isBlogLiked, saveBlog, unSaveBlog, updateReadCount } from '@/src/services/blog'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-dark.css'
import { convertDate } from '@/src/utils/convertDate'
import HeadingSeo from '@components/Common/HeadingSeo'
import { AuthContext } from '@/src/context/authContext'
import { useCustomToast } from '@/src/hooks/useCustomToast'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import SocialShares from '@components/Admin/Common/SocialShares'
import { ParsedUrlQuery } from 'querystring'
import { GetServerSidePropsContext } from 'next'
import { inter } from '@pages/_app'
import TableOfContent from '@components/BlogDetails/TableOfContent'
import Image from 'next/image'

const BlogDetails = ({ blogDetail }: { blogDetail: IBlog }) => {
  const client = useQueryClient()
  const [isSaved, setIsSaved] = useState(false)
  const { user } = useContext(AuthContext)
  const bookMarkBg = useColorModeValue(isSaved ? 'black' : 'white', isSaved ? 'white' : 'black')
  const bookMarkStroke = useColorModeValue(isSaved ? 'white' : 'black', isSaved ? 'black' : 'white')

  const { data } = useQuery({
    queryKey: ['isBlogLiked', blogDetail?.id, user?.id],
    queryFn: () => isBlogLiked(blogDetail?.id),
    staleTime: 1000 * 60 * 60,
    enabled: !!blogDetail?.id && !!user?.id
  })

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

  useEffect(() => {
    if (typeof data === 'boolean') {
      setIsSaved(data)
    }
  }, [data])

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
      client.invalidateQueries({ queryKey: ['isBlogLiked'] })
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
        link={`https://codewithmilan.com/blog/${id}/${blogDetail?.metatitle}`}
        image={blogDetail?.coverimage}
      />
      <MainLayout pxMobile={0}>
        <Flex
          justifyContent="center"
          mt={{ base: 0, md: 4 }}
          className={inter.className}
          gap={{ base: 10, '1xl': 14 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <TableOfContent toc={blogDetail?.toc} displayOnMobile={false} minW={{ base: 360, '1xl': 420 }} />
          <Box position="relative">
            <Box h={{ base: 300, xl: 330, '1xl': 440 }} position="relative" overflow="hidden">
              <Box
                position="absolute"
                w="full"
                h="full"
                backgroundImage="linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(27, 27, 27, 0.9))"
                zIndex={10}
                borderRadius={{ base: 0, md: 10 }}
                overflow="hidden"
              />
              <Box position="relative" borderRadius={{ base: 0, md: 10 }} w="full" maxW="full" h="full">
                <Image
                  src={blogDetail?.coverimage}
                  alt={blogDetail?.title}
                  style={{
                    objectFit: 'cover'
                  }}
                  fill
                  priority
                />
              </Box>

              <Flex
                position="absolute"
                bottom={{ base: 3, '1xl': 0 }}
                zIndex={12}
                w="full"
                h="full"
                justifyContent="center"
                alignItems="center"
              >
                <Box>
                  <Text
                    color="white"
                    maxW={{ base: 340, xl: 490, '1xl': '700' }}
                    fontSize={{ base: '22px', md: '26px', '1xl': '28px' }}
                    fontWeight="bold"
                    lineHeight={1.8}
                    textAlign="center"
                    letterSpacing={1.4}
                  >
                    {blogDetail?.title}
                  </Text>
                  <Flex
                    position="absolute"
                    bottom={{ base: 1, xl: 2, '1xl': 4 }}
                    right={9}
                    justifyContent="center"
                    my={3}
                    alignItems="center"
                    color="white"
                    fontSize="sm"
                  >
                    <Flex alignItems="center" gap={3} ml={2}>
                      <NextChakraImage
                        src={blogDetail?.profileimage}
                        fallbackSrc="/images/default-avatar.webp"
                        alt="profile-image"
                        borderRadius="full"
                        w={{ base: 7, '1xl': 10 }}
                        h={{ base: 7, '1xl': 10 }}
                        objectFit="cover"
                      />
                      <Text>{blogDetail?.name} &#x2022;</Text>
                    </Flex>
                    <Text>{convertDate(blogDetail?.createdat)}</Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <Box px={4}>
              <Flex alignItems="center" justifyContent="space-between" mt={5}>
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

              <Box ref={parentRef} mb={7} />
              <TableOfContent toc={blogDetail?.toc} displayOnMobile minW={{ base: 'full', md: 400 }} />

              <Box className="ql-snow" mt={{ base: 10, md: 14, xl: 4 }} maxW={{ base: 670, '1xl': 900 }}>
                <Box
                  className="content ql-editor custom-scrollbar"
                  fontSize={{ base: 'sm', '1xl': 'lg' }}
                  lineHeight="28px"
                  dangerouslySetInnerHTML={{
                    __html: blogDetail?.content
                  }}
                />
              </Box>
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

  res.setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate')

  const blogDetails = await getBlogDetails(id as string)
  return {
    props: {
      blogDetail: blogDetails
    }
  }
}
