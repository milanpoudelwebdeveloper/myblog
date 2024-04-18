import { useCustomToast } from '@/src/hooks/useCustomToast'
import { getCategories } from '@/src/services/category'
import { Box, Divider, Flex, Skeleton, Text, useColorModeValue } from '@chakra-ui/react'
import { base64File } from '@constants/files'
import { BLOGS } from '@constants/routes'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

import { useRouter } from 'next/router'
import React from 'react'
import { FaChevronRight } from 'react-icons/fa'

const Categories = () => {
  const { showToast } = useCustomToast()
  const router = useRouter()
  const pathname = router.pathname

  const headingColor = useColorModeValue('#1A1A1A', '#FFFFFF')
  const dividerColor = useColorModeValue('rgba(0, 0, 0, 0.15)', 'rgba(255, 255, 255, 0.15)')
  const {
    error,
    data: categories,
    isLoading
  } = useQuery({
    queryKey: ['getCategories'],
    queryFn: getCategories,
    staleTime: Infinity
  })

  if (error) {
    showToast('Error fetching categories', 'error')
  }

  const isBlogPage = pathname.includes('/blogs')

  return (
    <Box maxW={{ base: 570, lg: 'auto' }} mx="auto">
      <Box p={{ base: 5, lg: 8 }} boxShadow="rgba(32, 54, 86, 0.15) 0px 8px 20px" borderRadius={14} mb={10}>
        <Text as={isBlogPage ? 'h1' : 'h2'} textAlign="center" color={headingColor} fontSize="xl" fontWeight="700">
          Coding Topics
        </Text>
        <Divider borderColor="#6941C6" w={14} borderWidth={2} mx="auto" mb={9} mt={2} />
        <Box px={{ base: 2, md: 14, xl: 2 }}>
          {isLoading && <Skeleton h={500} borderRadius={20} mb={6} />}
          {categories?.map((category: ICategory) => (
            <Link href={BLOGS + '?category=' + category?.id} key={category?.id} shallow>
              <Flex alignItems="center" justifyContent="space-between">
                <Flex alignItems="center" gap={4}>
                  <Box position="relative" w={10} h={10} maxW="full" maxH="full" borderRadius="full" overflow="hidden">
                    <Image
                      src={category?.image}
                      alt={category?.name}
                      style={{
                        objectFit: 'cover'
                      }}
                      fill
                      placeholder="blur"
                      blurDataURL={base64File}
                      loading="lazy"
                    />
                  </Box>

                  <Box width="max-content" fontSize="sm" fontWeight="600">
                    {category?.name}
                  </Box>
                </Flex>
                <FaChevronRight color="rgb(165, 94, 234)" />
              </Flex>

              <Divider my={{ base: 2, '1xl': 3 }} borderColor={dividerColor} />
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Categories
