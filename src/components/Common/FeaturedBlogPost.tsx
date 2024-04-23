import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useContext } from 'react'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-light.css'
import { AuthContext } from '@/src/context/authContext'
import Image from 'next/image'
import { categoryColors } from '@constants/categories'
// import { BLOGS } from '@constants/routes'

interface Props {
  card: IBlog
  imageHeight?: number
  imageLoadFast?: boolean
}

const FeaturedBlogPost = ({ card }: Props) => {
  const { title, coverimage, id, categories } = card
  const { user } = useContext(AuthContext)
  const boxShadowColor = useColorModeValue('rgba(32, 54, 86, 0.15) 0px 8px 20px', 'rgba(255, 255, 255, 0.8)')
  const dynamicLink = user?.id ? `/blog/${id}?query=${user?.id}` : `/blog/${id}`

  return (
    <Link href={dynamicLink} shallow>
      <Box
        minH="min-content"
        overflow="hidden"
        boxShadow={boxShadowColor}
        borderRadius={10}
        bgSize="cover"
        position="relative"
        minW={{ base: 'full', md: 500, xl: 560, '1xl': 700 }}
      >
        <Flex position="absolute" top={8} zIndex={12} left={{ base: 7, xl: 9 }} gap={2} fontSize={{ base: '10px', '1xl': 'xs' }}>
          {categories?.map((category, index) => (
            // <Link href={BLOGS + '?category=' + category?.value} key={index} shallow>
            <Box
              bg={categoryColors[index]?.bgColor}
              color={categoryColors[index]?.titleColor}
              borderRadius={7}
              px={3}
              py={1.5}
              fontWeight="500"
              key={category?.value}
            >
              {category?.label}
            </Box>
            // </Link>
          ))}
        </Flex>
        <Box
          position="absolute"
          w="full"
          h="full"
          backgroundImage="linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(27, 27, 27, 0.7))"
          zIndex={10}
        />
        <Box w="full" minH={{ base: 280, md: 345, xl: 365, '1xl': 440 }} overflow="hidden" position="relative">
          <Image src={coverimage} alt={title} layout="fill" objectFit="cover" priority />
        </Box>

        <Box
          position="absolute"
          bottom={{ base: 8, xl: 9, '1xl': 12 }}
          left={{ base: 6, xl: 8, '1xl': 10 }}
          color="white"
          fontSize={{ base: 'lg', '1xl': '24px' }}
          fontWeight="bold"
          zIndex={110}
          maxW={{ base: '80%', '1xl': '90%' }}
          letterSpacing={1}
        >
          <Text>{title}</Text>
        </Box>
      </Box>
    </Link>
  )
}

export default FeaturedBlogPost
