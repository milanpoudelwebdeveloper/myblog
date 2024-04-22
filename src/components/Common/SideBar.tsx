import { Box, Text } from '@chakra-ui/react'
import PopularBlogs from './PopularBlogs'

const SideBar = () => {
  return (
    <Box w="full">
      <Text>Popular read</Text>
      <PopularBlogs />
    </Box>
  )
}

export default SideBar
