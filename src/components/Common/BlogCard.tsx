import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useContext } from 'react'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-light.css'
import { convertDate } from '@/src/utils/convertDate'
import { base64File } from '@constants/files'
import Image from 'next/image'
import { AuthContext } from '@/src/context/authContext'
import { BLOGS } from '@constants/routes'
import { categoryColors } from '@constants/categories'
import { useRouter } from 'next/router'

interface Props {
  card: IBlog
  imageHeight?: number
}

const BlogCard = ({ card }: Props) => {
  const { title, coverimage, categories, createdat, id, name } = card
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const titleColor = useColorModeValue('#1A1A1A', 'rgb(255, 255, 255)')
  const dynamicLink = user?.id ? `/blog/${id}?query=${user?.id}` : `/blog/${id}`

  const isHomePage = router.pathname === '/'

  return (
    <Box pb={5} overflow="hidden" borderRadius={10} w="full">
      <Box
        minW="full"
        maxW="full"
        minH={{ base: 220, lg: 250, xl: 220, '1xl': 280 }}
        maxH="full"
        position="relative"
        borderRadius="0.75rem"
        overflow="hidden"
      >
        <Link href={dynamicLink} shallow>
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
        <Flex position="absolute" bottom={4} left={4} gap={2} fontSize={{ base: '10px', '1xl': 'xs' }} mt={4}>
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
      <Link href={dynamicLink} shallow>
        <Box>
          <Text
            mt={4}
            mb={2}
            color={titleColor}
            fontSize={{ base: 'sm', '1xl': 'lg' }}
            fontWeight="600"
            lineHeight={{ base: '23px', '1xl': '28px' }}
            as={isHomePage ? 'h3' : 'h2'}
          >
            {title}
          </Text>
          <Text color="rgb(116, 116, 116)" fontSize={{ base: 'xs', '1xl': 'md' }} fontWeight="600">
            {name} &#x2022; {convertDate(createdat)}
          </Text>
        </Box>
      </Link>
    </Box>
  )
}

export default BlogCard
