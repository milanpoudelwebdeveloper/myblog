import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

interface Props {
  children: React.ReactNode
  hideSidebar?: boolean
}

const MainLayout = ({ children }: Props) => {
  return (
    <Box maxW={{ base: 750, xl: 1000, '1xl': 1240 }} mx="auto" px={{ base: 5, sm: 10, lg: 0 }}>
      <NavBar />
      <Flex
        gap={12}
        mt={{ base: 90, xl: 28, '1xl': 32 }}
        direction={{ base: 'column', xl: 'row' }}
        justifyContent="center"
        position="relative"
      >
        <Box>{children}</Box>
      </Flex>
      <Footer />
    </Box>
  )
}

export default MainLayout
