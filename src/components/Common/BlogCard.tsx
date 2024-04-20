import { Box, Flex, Text, useColorModeValue, useMediaQuery } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useContext } from 'react'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-light.css'
import { convertDate } from '@/src/utils/convertDate'
import Markdown from 'markdown-to-jsx'
import { base64File } from '@constants/files'
import Image from 'next/image'
import { AuthContext } from '@/src/context/authContext'

interface Props {
  card: IBlog
  imageHeight?: number
  imageLoadFast?: boolean
}

const BlogCard = ({ card, imageHeight, imageLoadFast = false }: Props) => {
  const { title, content, coverimage, categories, createdat, id, name } = card
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const { user } = useContext(AuthContext)
  const bgColor = useColorModeValue('white', '#1a1a1a')
  const titleColor = useColorModeValue('#1A1A1A', 'rgb(255, 255, 255)')
  const contentColor = useColorModeValue('#232323', '#C0C5D0')
  const boxShadowColor = useColorModeValue('rgba(32, 54, 86, 0.15) 0px 8px 20px', 'rgba(255, 255, 255, 0.8)')
  const dynamicLink = user?.id ? `/blog/${id}?query=${user?.id}` : `/blog/${id}`
  const contentToDisplay = imageLoadFast ? content?.slice(0, isMobile ? 140 : 240) : content?.slice(0, 110)

  return (
    <Box pb={imageLoadFast ? 7 : 5} overflow="hidden" boxShadow={boxShadowColor} borderRadius={10} bg={bgColor}>
      <Link href={dynamicLink} shallow>
        <Box
          minW="full"
          maxW="full"
          minH={{ base: 180, md: imageHeight ? 250 : 210, xl: imageHeight ? 250 : 190, '1xl': imageHeight ? imageHeight : 200 }}
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
            unoptimized={!imageLoadFast}
            sizes="auto"
          />
        </Box>

        <Box px={6}>
          <Text color="#6941C6" fontSize="xs" fontWeight="600" mt={5} mb={3}>
            {name} &#x2022; {convertDate(createdat)}
          </Text>
          <Text as="h3" color={titleColor} fontSize={{ base: 'lg', '1xl': 'xl' }} fontWeight="700" lineHeight="1.4">
            {title}
          </Text>
          <Box color={contentColor} fontSize="sm" fontWeight="300" lineHeight="1.6" mt={2}>
            <Markdown>{`${contentToDisplay}....`}</Markdown>
          </Box>
          <Flex gap={2} fontSize="xs" mt={4} display={imageLoadFast ? 'none' : 'flex'}>
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
