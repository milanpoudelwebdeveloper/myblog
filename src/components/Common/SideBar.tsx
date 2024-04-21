import { Box, Divider, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import dynamic from 'next/dynamic'
import PopularBlogs from './PopularBlogs'

const CategoryComponent = dynamic(() => import('./Categories'), {
  ssr: false
})

const SideBar = () => {
  const bgColor = useColorModeValue('white', '#1a1a1a')
  const headingColor = useColorModeValue('#1A1A1A', '#FFFFFF')
  return (
    <Box w="full">
      <Box
        maxW={{ base: 570, lg: 'initial' }}
        boxShadow="rgba(32, 54, 86, 0.15) 0px 8px 20px"
        borderRadius={14}
        mb={10}
        bgColor={bgColor}
        mx="auto"
        px={{ base: 7, '1xl': 10 }}
        py={6}
      >
        <Text as="h2" textAlign="center" mb={1} color={headingColor} fontSize="xl" fontWeight="700">
          Most Read
        </Text>
        <Divider borderColor="#6941C6" w={12} borderWidth={2} mx="auto" mb={9} />
        <PopularBlogs />
      </Box>
      <CategoryComponent />
    </Box>
  )
}

export default SideBar
