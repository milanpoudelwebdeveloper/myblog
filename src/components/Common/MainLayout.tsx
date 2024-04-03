import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar'
import Footer from './Footer'

interface Props {
  children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <Box maxW={{ base: 1080, '1xl': 1280 }} mx="auto" px={{ base: 4, xl: 0 }}>
      <NavBar />
      <Flex gap={10} mt={{ base: 16, xl: 32 }} direction={{ base: 'column', md: 'row' }}>
        <Box minW={{ base: 'full', xl: 660, '1xl': 790 }} maxW={{ base: 660, '1xl': 760 }}>
          {children}
        </Box>
        <SideBar />
      </Flex>
      <Footer />
    </Box>
  )
}

export default MainLayout
