import { Box, Flex, Text, useColorModeValue, Image as ChakraImage } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-light.css'
import { convertDate } from '@/src/utils/convertDate'
import { base64File } from '@constants/files'
import Image from 'next/image'
import { BLOGS } from '@constants/routes'
import { categoryColors } from '@constants/categories'
import { useRouter } from 'next/router'

interface Props {
  card: IBlog
  imageHeight?: number
}

const BlogCard = ({ card }: Props) => {
  const { title, coverimage, categories, createdat, id, name, metatitle } = card
  const router = useRouter()
  const titleColor = useColorModeValue('#1A1A1A', 'rgb(255, 255, 255)')
  const borderColor = useColorModeValue('#E5E5E5', 'rgba(255, 255, 255, 0.15)')

  const isHomePage = router.pathname === '/'

  return (
    <Box pb={5} overflow="hidden" w="full" borderBottomWidth={{ base: 1, md: 0 }} borderColor={borderColor}>
      <Box
        minW="full"
        maxW="full"
        minH={{ base: 228, lg: 250, xl: 224, '1xl': 280 }}
        maxH="full"
        position="relative"
        borderRadius={10}
        overflow="hidden"
      >
        <Link href={`/blog/${id}/${metatitle}`} shallow>
          <Image
            src={coverimage}
            placeholder="blur"
            blurDataURL={base64File}
            alt={title}
            style={{
              objectFit: 'cover'
            }}
            fill
            sizes="(min-width: 1440px) 490px, (min-width: 1280px) 410px, (min-width: 1000px) 499px, (min-width: 780px) 407px, (min-width: 600px) 550px, (min-width: 480px) calc(50vw + 270px), calc(100vw - 10px)"
          />
        </Link>
        <Flex position="absolute" bottom={6} left={6} gap={2} fontSize={{ base: '10px', '1xl': 'xs' }} mt={4}>
          {categories?.map((category, index) => (
            <Link href={BLOGS + '?category=' + category?.value + '&page=1'} key={index} shallow>
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
      </Box>
      <Link href={`/blog/${id}`} shallow>
        <Box mt={3}>
          <Text
            mb={{ base: 2, '1xl': 3 }}
            color={titleColor}
            fontSize={{ base: 'md', '1xl': 'lg' }}
            fontWeight="700"
            lineHeight="28px"
            as={isHomePage ? 'h3' : 'h2'}
          >
            {title}
          </Text>
          <Flex alignItems="center" gap={3}>
            <ChakraImage src="/images/default-avatar.webp" alt="avatar" borderRadius="full" boxSize="20px" objectFit="cover" />
            <Text color="rgb(116, 116, 116)" fontSize={{ base: 'xs', '1xl': 'md' }} fontWeight="500">
              {name} &#x2022; {convertDate(createdat)}
            </Text>
          </Flex>
        </Box>
      </Link>
    </Box>
  )
}

export default BlogCard
