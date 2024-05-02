import { Box, Divider, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { convertDate } from '@/src/utils/convertDate'
import Image from 'next/image'
import { base64File } from '@constants/files'
import Link from 'next/link'

const PopularBlogs = ({ blogs }: { blogs: IBlog[] }) => {
  const dividerColor = useColorModeValue('#D9D9D9', 'rgba(255, 255, 255, 0.15)')
  const dateColor = useColorModeValue('rgb(35, 35, 35)', '#C0C5D0')

  return (
    <Box>
      <Text fontSize={{ base: 'xl', '1xl': '24px' }} fontWeight="600" mb={4}>
        Popular Read
      </Text>
      <Divider mb={{ base: 4, lg: 3, xl: 4 }} borderColor={dividerColor} />
      {blogs?.map((blog: IBlog) => (
        <Link href={`/blog/${blog?.id}/${blog?.metatitle}`} key={blog?.id}>
          <Box mb={{ base: 3, '1xl': 7 }}>
            <Flex alignItems="center" gap={{ base: 4, '1xl': 5 }}>
              <Box
                position="relative"
                w={{ base: 12, '1xl': 55 }}
                h={{ base: 12, '1xl': 55 }}
                maxW="full"
                maxH="full"
                borderRadius="10px"
                overflow="hidden"
                flexShrink={0}
              >
                <Image
                  src={blog?.coverimage}
                  alt={blog?.title}
                  fill
                  style={{
                    objectFit: 'cover'
                  }}
                  placeholder="blur"
                  blurDataURL={base64File}
                  loading="lazy"
                  sizes="(min-width: 1440px) 280px, 240px"
                />
              </Box>
              <Box>
                <Text fontSize={{ base: 'sm', '1xl': 'md' }} fontWeight="600" mb={{ base: 1, lg: 0, xl: 1 }} lineHeight="1.5" as="h2">
                  {blog?.title}
                </Text>
                
              </Box>
            </Flex>
            <Divider my={3} borderColor={dividerColor} />
          </Box>
        </Link>
      ))}
    </Box>
  )
}

export default PopularBlogs
