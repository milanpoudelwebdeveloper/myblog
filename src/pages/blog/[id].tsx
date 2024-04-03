import { Box, Image, Text } from '@chakra-ui/react'
import MainLayout from '@components/Common/MainLayout'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { getBlogDetails, updateReadCount } from '@/src/services/blog'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-light.css'

const BlogDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const [blogDetail, setBlogDetail] = useState<IBlog>({} as IBlog)

  console.log('id is', id)

  const parentRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!parentRef.current) return
    const options = {
      threshold: 1
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log('intersecting')
      } else if (entry.boundingClientRect.top < 0) {
        console.log('up')
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
    <MainLayout>
      <Box mt={4}>
        <Text color="#1A1A1A" fontSize={{ base: '30px', '1xl': '38px' }} fontWeight="bold" lineHeight={1.4}>
          {blogDetail?.title}
        </Text>
        <Text color="#6941C6" fontSize={{ base: 'sm', '1xl': 'md' }} fontWeight="600" my={2}>
          Milan Poudel &#x2022; 2021-10-11
        </Text>
        <Box>
          <Image src={blogDetail?.coverimage} alt="featured" borderRadius={10} my={4} width="100%" objectFit="cover" h={380} />
        </Box>
        <Box ref={parentRef} />
        <Box className="ql-snow">
          <Box
            className="ql-editor"
            fontSize={{ base: 'md', '1xl': 'lg' }}
            dangerouslySetInnerHTML={{
              __html: blogDetail?.content
            }}
          />
        </Box>
      </Box>
    </MainLayout>
  )
}

export default BlogDetails
