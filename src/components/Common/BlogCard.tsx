import { Box, Flex, Text, useColorModeValue, useMediaQuery } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useContext } from 'react'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-light.css'
import { convertDate } from '@/src/utils/convertDate'
import { base64File } from '@constants/files'
import Image from 'next/image'
import { AuthContext } from '@/src/context/authContext'
import dynamic from 'next/dynamic'
import { BLOGS } from '@constants/routes'

const DynamicMarkdown = dynamic(() => import('markdown-to-jsx'), {
  ssr: true
})

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
  const categoryColors = [
    {
      key: 1,
      bgColor: '#FDF2FA',
      titleColor: '#C11574'
    },
    {
      key: 2,
      bgColor: '#F9F5FF',
      titleColor: '#6941C6'
    },
    {
      key: 3,
      bgColor: '#ECFDF3',
      titleColor: '#027A48'
    }
  ]
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
            sizes="(min-width: 1440px) 740px, (min-width: 1280px) 660px, (min-width: 1000px) 750px, (min-width: 800px) 670px, (min-width: 480px) calc(90vw - 32px), calc(100vw - 40px)"

          />
        </Box>

        <Box px={6}>
          <Text color="#6941C6" fontSize="sm" fontWeight="400" mt={5} mb={3}>
            {name} &#x2022; {convertDate(createdat)}
          </Text>
          <Text
            as={imageLoadFast ? 'h1' : 'h2'}
            color={titleColor}
            fontSize={{ base: 'lg', '1xl': 'xl' }}
            fontWeight="600"
            lineHeight="1.4"
          >
            {title}
          </Text>
          <Box color={contentColor} fontSize="sm" fontWeight="300" lineHeight="1.6" mt={2}>
            <DynamicMarkdown>{`${contentToDisplay}....`}</DynamicMarkdown>
          </Box>
        </Box>
      </Link>
      <Flex gap={2} fontSize="xs" mt={4} display={imageLoadFast ? 'none' : 'flex'} px={6}>
        {categories?.map((category, index) => (
          <Link href={BLOGS + '?category=' + category?.value} key={index} shallow>
            <Box
              bg={categoryColors[index]?.bgColor}
              color={categoryColors[index]?.titleColor}
              borderRadius={7}
              px={2}
              py={1.5}
              fontWeight="500"
              key={category?.value}
            >
              {category?.label}
            </Box>
          </Link>
        ))}
      </Flex>
    </Box>
  )
}

export default BlogCard
