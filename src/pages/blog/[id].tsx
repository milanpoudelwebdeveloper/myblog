import { Box, Image, Text } from '@chakra-ui/react'
import MainLayout from '@components/Common/MainLayout'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getBlogDetails } from '@/src/services/blog'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/a11y-dark.css'

const BlogDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const [blogDetail, setBlogDetail] = useState<IBlog>({} as IBlog)

  useEffect(() => {
    if (id) {
      getBlogDetails(id)
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
        <Image src={blogDetail?.coverimage} alt="featured" borderRadius="10px" my={4} width="100%" objectFit="cover" h={380} />
        <div className="ql-snow">
          <Box
            className="ql-editor"
            fontSize={{ base: 'md', '1xl': 'lg' }}
            dangerouslySetInnerHTML={{
              __html: blogDetail?.content
            }}
          />
        </div>
      </Box>
    </MainLayout>
  )
}

export default BlogDetails
