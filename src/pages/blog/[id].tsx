import { Box, Text, useColorModeValue, Image, Flex } from '@chakra-ui/react'
import MainLayout from '@components/Common/MainLayout'
import React, { useContext, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { getBlogDetails, getSavedBlogs, saveBlog, updateReadCount } from '@/src/services/blog'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-dark.css'
import { convertDate } from '@/src/utils/convertDate'
import HeadingSeo from '@components/Common/HeadingSeo'

import { FaRegHeart } from 'react-icons/fa'
import { AuthContext } from '@/src/context/authContext'

const BlogDetails = ({ blogDetail }: { blogDetail: IBlog }) => {
  const titleColor = useColorModeValue('#1A1A1A', 'rgb(237, 242, 247)')
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const { id } = router.query

  const parentRef = useRef<HTMLDivElement>(null)

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

  const saveBlogHandler = () => {
    saveBlog(blogDetail?.id, user?.id)
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    if (user?.id) {
      getSavedBlogs(user?.id)
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [user?.id])

  return (
    <>
      <HeadingSeo
        title={blogDetail?.title}
        description={blogDetail?.content?.slice(0, 140)}
        link={`https://codewithmilan.com/blog/${id}`}
      />
      <MainLayout>
        <Box mt={7}>
          <Text color={titleColor} fontSize={{ base: '30px', '1xl': '38px' }} fontWeight="bold" lineHeight={1.4}>
            {blogDetail?.title}
          </Text>
          <Flex alignItems="center" justifyContent="space-between">
            <Text color="#6941C6" fontSize={{ base: 'xs', '1xl': 'sm' }} fontWeight="600" mt={4} mb={7}>
              Milan Poudel &#x2022;
              {convertDate(blogDetail?.createdat)}
            </Text>
            <Flex>
              <FaRegHeart fill="black" size={24} onClick={saveBlogHandler} />
            </Flex>
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
              h={{ base: 220, xl: 330, '1xl': 370 }}
              maxH="full"
            />
          </Box>
          <Box ref={parentRef} />
          <Box className="ql-snow">
            <Box
              className="content ql-editor"
              fontSize={{ base: 'md', '1xl': 'lg' }}
              lineHeight={1.5}
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

export async function getServerSideProps(context: { params: { id: string } }) {
  const { id } = context.params
  try {
    const blogDetails = await getBlogDetails(id)

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
