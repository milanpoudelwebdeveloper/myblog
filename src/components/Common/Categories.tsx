import { useCustomToast } from '@/src/hooks/useCustomToast'
import { getCategories } from '@/src/services/category'
import { Box, Divider, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'
import { FaChevronRight } from 'react-icons/fa'

const Categories = () => {
  const { showToast } = useCustomToast()
  const router = useRouter()
  const pathname = router.pathname
  const headingColor = useColorModeValue('#1A1A1A', '#FFFFFF')
  const dividerColor = useColorModeValue('rgba(0, 0, 0, 0.15)', 'rgba(255, 255, 255, 0.15)')
  const { error, data: categories } = useQuery({
    queryKey: ['getCategories'],
    queryFn: getCategories,
    staleTime: Infinity
  })

  if (error) {
    showToast('Error fetching categories', 'error')
  }

  const isBlogPage = pathname.includes('/blogs')
  return (
    <Box p={{ base: 5, lg: 8 }} boxShadow="rgba(32, 54, 86, 0.15) 0px 8px 20px" borderRadius={14} mb={10}>
      <Text as={isBlogPage ? 'h1' : 'h2'} textAlign="center" color={headingColor} fontSize={{ base: 'lg', lg: 'xl' }} fontWeight="700">
        Coding Topics
      </Text>
      <Divider borderColor="#6941C6" w={20} borderWidth={2} mx="auto" mb={6} mt={2} />
      <Box px={2}>
        {categories?.map((category: ICategory) => (
          <Box key={category?.id}>
            <Flex alignItems="center" justifyContent="space-between">
              <Flex alignItems="center" gap={4}>
                <Image src={category?.image} alt="category" borderRadius="full" width={10} h={10} objectFit="cover" />
                <Box width="max-content" fontSize={{ base: 'sm', lg: 'md' }} fontWeight="600">
                  {category?.name}
                </Box>
              </Flex>
              <FaChevronRight color="rgb(165, 94, 234)" />
            </Flex>

            <Divider my={{ base: 2, '1xl': 3 }} borderColor={dividerColor} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Categories
