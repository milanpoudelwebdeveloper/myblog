import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar'
import Footer from './Footer'

interface Props {
  children: React.ReactNode
  hideSidebar?: boolean
}

const MainLayout = ({ children, hideSidebar = false }: Props) => {
  return (
    <Box maxW={{ base: 750, xl: 1080, '1xl': 1150 }} mx="auto" px={{ base: 5, sm: 10, lg: 0 }}>
      <NavBar />
      <Flex
        gap={{ base: 12, '1xl': 14 }}
        mt={{ base: 90, xl: 28, '1xl': 32 }}
        direction={{ base: 'column', xl: 'row' }}
        justifyContent="center"
        position="relative"
      >
        <Box minW={{ base: 'full', xl: 660, '1xl': 700 }} maxW={{ base: 'full', xl: 660, '1xl': 700 }}>
          {children}
        </Box>
        <Box display={hideSidebar ? 'none' : 'block'} flex={1} mt={4}>
          <SideBar />
        </Box>
      </Flex>
      <Footer />
    </Box>
  )
}

export default MainLayout
