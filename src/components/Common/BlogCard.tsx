import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-light.css'
import { convertDate } from '@/src/utils/convertDate'
import Markdown from 'markdown-to-jsx'
import { base64File } from '@constants/files'
import Image from 'next/image'

interface Props {
  card: IBlog
  imageHeight?: number
  imageLoadFast?: boolean
}

const BlogCard = ({ card, imageHeight, imageLoadFast = false }: Props) => {
  const { title, content, coverimage, categories, createdat, id, featured } = card
  const bgColor = useColorModeValue('white', '#1a1a1a')
  const titleColor = useColorModeValue('#1A1A1A', 'rgb(255, 255, 255)')
  const contentColor = useColorModeValue('#232323', '#C0C5D0')
  const boxShadowColor = useColorModeValue('rgba(32, 54, 86, 0.15) 0px 8px 20px', 'rgba(255, 255, 255, 0.8)')
  return (
    <Box my={4} pb={6} overflow="hidden" boxShadow={boxShadowColor} borderRadius={10} bg={bgColor}>
      <Link href={`/blog/${id}`}>
        <Box
          maxW="full"
          h={{ base: 190, md: imageHeight ? 270 : 210, xl: imageHeight ? 270 : 190, '1xl': imageHeight ? imageHeight : 200 }}
          maxH="full"
          position="relative"
        >
          <Image
            src={coverimage}
            placeholder="blur"
            blurDataURL={base64File}
            alt="post"
            style={{
              objectFit: 'cover'
            }}
            fill
            priority={imageLoadFast}
          />
        </Box>

        <Box px={6}>
          <Text color="#6941C6" fontSize={{ base: 'xs', '1xl': 'sm' }} fontWeight="600" my={4}>
            Milan Poudel &#x2022; {convertDate(createdat)}
          </Text>
          <Text as="h3" color={titleColor} mb={4} fontSize={{ base: 'lg', '1xl': 'xl' }} fontWeight="700" my={2} lineHeight="1.4">
            {title}
          </Text>
          <Box color={contentColor} fontSize={{ base: 'sm', '1xl': 'sm' }} fontWeight="300" lineHeight="1.6">
            <Markdown>{featured ? content?.slice(0, 200) : content?.slice(0, 140)}</Markdown>
          </Box>
          <Flex gap={2} fontSize={{ base: 'xs', md: 'sm' }} mt={4}>
            {categories?.map((categoryname) => (
              <Box bg="#FDF2FA" color="#C11574" borderRadius={7} px={2} py={1.5} key={categoryname}>
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
