import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

interface Props {
  children: React.ReactNode
  hideSidebar?: boolean
  pxMobile?: number
}

const MainLayout = ({ children, pxMobile = 5 }: Props) => {
  return (
    <Box maxW={{ base: 750, xl: 1000, '1xl': 1240 }} mx="auto" px={{ base: pxMobile, sm: 10, lg: 0 }}>
      <NavBar />
      <Flex gap={12} mt={{ base: 90, xl: 28, '1xl': 32 }} direction={{ base: 'column', xl: 'row' }} justifyContent="center">
        <Box>{children}</Box>
      </Flex>
      <Footer />
    </Box>
  )
}

export default MainLayout
