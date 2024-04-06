import { Box, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-light.css'
import { convertDate } from '@/src/utils/convertDate'
import Markdown from 'markdown-to-jsx'

interface Props {
  card: IBlog
  imagHeight?: number
}

const BlogCard = ({ card, imagHeight }: Props) => {
  const { title, content, coverimage, categories, createdat, id } = card
  const bgColor = useColorModeValue('white', '#1a1a1a')
  const titleColor = useColorModeValue('#1A1A1A', 'rgb(255, 255, 255)')
  const contentColor = useColorModeValue('rgba(35, 35, 35)', '#C0C5D0')
  const boxShadowColor = useColorModeValue('rgba(32, 54, 86, 0.15) 0px 8px 20px', 'rgba(255, 255, 255, 0.8)')

  return (
    <Box my={4} pb={7} overflow="hidden" boxShadow={boxShadowColor} borderRadius={10} bg={bgColor}>
      <Link href={`/blog/${id}`}>
        <Image src={coverimage} alt="post" h={imagHeight ? imagHeight : 200} objectFit="cover" w="full" />
        <Box px={6}>
          <Text color="#6941C6" fontSize={{ base: 'xs', lg: 'sm' }} fontWeight="600" my={4}>
            Milan Poudel &#x2022; {convertDate(createdat)}
          </Text>
          <Text color={titleColor} mb={4} fontSize={{ base: 'md', md: 'lg', '1xl': 'xl' }} fontWeight="bold" my={2}>
            {title}
          </Text>

          {/* <Box
            dangerouslySetInnerHTML={{
              __html: content?.slice(0, 200)
            }}
            className="blog-card-content"
            color={contentColor}
            fontSize={{ base: 'xs', md: 'sm', '1xl': 'md' }}
            w="full"
          /> */}
          <Box color={contentColor}>
            <Markdown>{content?.slice(0, 200)}</Markdown>
          </Box>

          <Flex gap={2} fontSize={{ base: 'xs', md: 'sm', '1xl': 'md' }} mt={4}>
            {categories?.map((categoryname) => (
              <Box bg="#FDF2FA" color="#C11574" borderRadius={10} p={2} key={categoryname}>
                <Text>{categoryname}</Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </Link>
    </Box>
  )
}

export default BlogCard
