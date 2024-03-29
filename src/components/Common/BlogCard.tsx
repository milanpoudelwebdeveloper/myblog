import { Box, Flex, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-dark.css'

interface Props {
  card: IBlog
  imagHeight?: number
}

const BlogCard = ({ card, imagHeight }: Props) => {
  const { title, content, coverimage, categoryname, createdat, id } = card
  return (
    <Box my={4} overflow="hidden" boxShadow="rgba(32, 54, 86, 0.15) 0px 8px 20px" borderRadius={10}>
      <Link href={`/blog/${id}`}>
        <Image src={coverimage} alt="post" h={imagHeight ? imagHeight : 200} objectFit="cover" w="full" />
        <Box px={6}>
          <Text color="#6941C6" fontSize={{ base: 'xs', lg: 'sm' }} fontWeight="600" my={4}>
            Milan Poudel &#x2022; {createdat}
          </Text>
          <Text color="#1A1A1A" mb={4} fontSize={{ base: 'md', md: 'lg', '1xl': 'xl' }} fontWeight="bold" my={2}>
            {title}
          </Text>
          <Box className="ql-snow" w="full">
            <Box
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: content?.slice(0, 200)
              }}
              color="rgba(35, 35, 35)"
              fontSize={{ base: 'xs', md: 'sm', '1xl': 'md' }}
              w="full"
            />
          </Box>
        </Box>
      </Link>
      <Flex gap={2} fontSize={{ base: 'xs', md: 'sm', '1xl': 'md' }}>
        {/* {categories.map((category, index) => ( */}
        <Box
          // key={category}
          // bg={index > 0 ? "#F9F5FF" : "#FDF2FA"}
          // color={index > 0 ? "#6941C6" : "#C11574"}
          borderRadius={14}
          p={2}
        >
          <Text>{categoryname}</Text>
        </Box>
        {/* ))} */}
      </Flex>
    </Box>
  )
}

export default BlogCard
