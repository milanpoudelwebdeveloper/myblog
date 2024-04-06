import { useCustomToast } from '@/src/hooks/useCustomToast'
import { getCategories } from '@/src/services/category'
import { Box, Divider, Flex, Image, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FaChevronRight } from 'react-icons/fa'

const Categories = () => {
  const { showToast } = useCustomToast()
  const { error, data: categories } = useQuery({
    queryKey: ['getCategories'],
    queryFn: getCategories,
    staleTime: Infinity
  })

  if (error) {
    showToast('Error fetching categories', 'error')
  }
  return (
    <Box p={{ base: 5, lg: 8 }} boxShadow="rgba(32, 54, 86, 0.15) 0px 8px 20px" borderRadius={14} mb={10}>
      <Text textAlign="center" color="#1A1A1A" fontSize={{ base: 'lg', lg: 'xl', '1xl': '24px' }} fontWeight="600">
        Categories
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

            <Divider my={{ base: 2, '1xl': 3 }} borderColor="rgba(0, 0, 0, 0.15)" />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Categories
