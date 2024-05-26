import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-light.css'
import Image from 'next/image'
import { categoryColors } from '@constants/categories'
import { BLOGS } from '@constants/routes'

interface Props {
  card: IBlog
  imageHeight?: number
  imageLoadFast?: boolean
}

const FeaturedBlogPost = ({ card }: Props) => {
  const { title, coverimage, id, categories, metatitle } = card
  const boxShadowColor = useColorModeValue('rgba(32, 54, 86, 0.15) 0px 8px 20px', 'rgba(255, 255, 255, 0.8)')

  return (
    <Box
      overflow="hidden"
      boxShadow={boxShadowColor}
      borderRadius={10}
      bgSize="cover"
      position="relative"
      minW={{ base: 'full', md: 500, xl: 560, '1xl': 700 }}
      h={{ base: 280, md: 345, xl: 365, '1xl': 430 }}
    >
      <Flex position="absolute" top={8} zIndex={12} left={{ base: 7, xl: 9 }} gap={2} fontSize={{ base: '10px', '1xl': 'xs' }}>
        {categories?.map((category, index) => (
          <Link href={BLOGS + '?category=' + category?.value} key={index} shallow>
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
          </Link>
        ))}
      </Flex>
      <Link href={`/blog/${id}/${metatitle}`} shallow>
        <Box
          position="absolute"
          w="full"
          h="full"
          backgroundImage="linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(27, 27, 27, 0.7))"
          zIndex={10}
        />
        <Box w="full" h="full" overflow="hidden" position="relative">
          <Image
            src={coverimage}
            alt={title}
            fill
            style={{
              objectFit: 'cover'
            }}
            priority
            sizes="(min-width: 1440px) 700px, (min-width: 1280px) 560px, (min-width: 1000px) 500px, (min-width: 780px) 654px, (min-width: 600px) 450px, (min-width: 480px) calc(50vw + 160px), calc(100vw - 40px)"
          />
        </Box>

        <Box
          position="absolute"
          bottom={{ base: 7, xl: 9, '1xl': 12 }}
          left={{ base: 6, xl: 8, '1xl': 10 }}
          color="white"
          fontSize={{ base: 'lg', md: 'lg', '1xl': '24px' }}
          fontWeight="bold"
          zIndex={110}
          maxW={{ base: '84%', '1xl': '85%' }}
          letterSpacing={1}
          lineHeight={{ base: '28px', '1xl': '42px' }}
        >
          <Text as="h1">{title}</Text>
        </Box>
      </Link>
    </Box>
  )
}

export default FeaturedBlogPost
