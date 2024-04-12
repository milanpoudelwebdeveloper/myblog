import { Box, Flex, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar'
import Footer from './Footer'
import dynamic from 'next/dynamic'

interface Props {
  children: React.ReactNode
  hideSidebar?: boolean
}

const LazyLoadedSideBar = dynamic(() => import('./SideBar'))

const MainLayout = ({ children, hideSidebar = false }: Props) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  return (
    <Box maxW={{ base: 750, xl: 1080, '1xl': 1220 }} mx="auto" px={{ base: 4, sm: 10, lg: 0 }}>
      <NavBar />
      <Flex
        gap={{ base: 12, '1xl': 14 }}
        mt={{ base: 16, sm: 20, md: 24, xl: 28 }}
        direction={{ base: 'column', xl: 'row' }}
        justifyContent="center"
      >
        <Box minW={{ base: 'full', xl: 660, '1xl': 740 }} maxW={{ base: 'full', xl: 660, '1xl': 740 }}>
          {children}
        </Box>
        <Box display={hideSidebar ? 'none' : 'block'} flex={1}>
          {isMobile ? <LazyLoadedSideBar /> : <SideBar />}
        </Box>
      </Flex>
      <Footer />
    </Box>
  )
}

export default MainLayout
