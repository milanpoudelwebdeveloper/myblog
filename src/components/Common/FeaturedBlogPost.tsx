import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useContext } from 'react'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-light.css'
import { AuthContext } from '@/src/context/authContext'

interface Props {
  card: IBlog
  imageHeight?: number
  imageLoadFast?: boolean
}

const FeaturedBlogPost = ({ card, imageLoadFast = false }: Props) => {
  const { title, coverimage, id } = card
  const { user } = useContext(AuthContext)
  const boxShadowColor = useColorModeValue('rgba(32, 54, 86, 0.15) 0px 8px 20px', 'rgba(255, 255, 255, 0.8)')
  const dynamicLink = user?.id ? `/blog/${id}?query=${user?.id}` : `/blog/${id}`

  return (
    <Link href={dynamicLink} shallow>
      <Box
        minH={{ base: 300, md: 370, '1xl': 450 }}
        pb={imageLoadFast ? 7 : 5}
        overflow="hidden"
        boxShadow={boxShadowColor}
        borderRadius={10}
        background={`url(${coverimage}), linear-gradient(rgba(0, 0, 0, 0), rgba(16, 53, 101, 0.38))`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        position="relative"
        minW={{ base: 'full', md: 600, '1xl': 700 }}
      >
        <Box
          position="absolute"
          bottom={10}
          left={{ base: 7, '1xl': 10 }}
          color="white"
          fontSize={{ base: '22px', '1xl': '27px' }}
          fontWeight="bold"
        >
          <Text>{title}</Text>
        </Box>
      </Box>
    </Link>
  )
}

export default FeaturedBlogPost
