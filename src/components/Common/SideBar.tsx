import { Box, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import dynamic from 'next/dynamic'
import PopularBlogs from './PopularBlogs'

const CategoryComponent = dynamic(() => import('./Categories'))
const PopularBlogsComponent = dynamic(() => import('./PopularBlogs'))

const SideBar = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  return (
    <Box w="full">
      {isMobile ? <PopularBlogsComponent /> : <PopularBlogs />}
      <CategoryComponent />
    </Box>
  )
}

export default SideBar
