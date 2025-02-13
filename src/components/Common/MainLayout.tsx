import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

interface Props {
  children: React.ReactNode
  hideSidebar?: boolean
  pxMobile?: number
}

const MainLayout = ({ children, pxMobile = 4 }: Props) => {
  return (
    <Box maxW={{ base: 530, md: 750, lg: 850, xl: 1030, '1xl': 1280 }} mx="auto" px={{ base: pxMobile, sm: 10, md: 12, lg: 0 }}>
      <NavBar />
      <Flex gap={12} mt={{ base: 75, md: 24, '1xl': 28 }} direction={{ base: 'column', xl: 'row' }} justifyContent="center">
        <Box w="full">{children}</Box>
      </Flex>
      <Footer />
    </Box>
  )
}

export default MainLayout
