import { Box, Text, useColorModeValue, Image } from '@chakra-ui/react'
import MainLayout from '@components/Common/MainLayout'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { getBlogDetails, updateReadCount } from '@/src/services/blog'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-dark.css'
import { convertDate } from '@/src/utils/convertDate'
import HeadingSeo from '@components/Common/HeadingSeo'

const BlogDetails = () => {
  const [blogDetail, setBlogDetail] = useState<IBlog>({} as IBlog)
  const titleColor = useColorModeValue('#1A1A1A', 'rgb(237, 242, 247)')
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

  useEffect(() => {
    if (id) {
      getBlogDetails(id as string)
        .then((data) => {
          setBlogDetail({ ...blogDetail, ...data })
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [id])
  return (
    <>
      <HeadingSeo
        title={blogDetail?.title}
        description={blogDetail?.content?.slice(0, 140)}
        link={`https://codewithmilan.com/blog/${id}`}
      />
      <MainLayout>
        <Box mt={2}>
          <Text color={titleColor} fontSize={{ base: '30px', '1xl': '35px' }} fontWeight="bold" lineHeight={1.4}>
            {blogDetail?.title}
          </Text>
          <Text color="#6941C6" fontSize={{ base: 'xs', '1xl': 'sm' }} fontWeight="600" my={2}>
            Milan Poudel &#x2022;
            {convertDate(blogDetail?.createdat)}
          </Text>

          <Box>
            <Image
              src={blogDetail?.coverimage}
              alt="featured"
              borderRadius={10}
              my={4}
              width="100%"
              maxW="full"
              objectFit="cover"
              h={380}
            />
          </Box>
          <Box ref={parentRef} />
          <Box className="ql-snow">
            <Box
              className="ql-editor"
              fontSize={{ base: 'md', '1xl': 'lg' }}
              lineHeight={1.7}
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
