import { Box, Flex, GlobalStyle, LightMode } from '@chakra-ui/react'
import React from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar'
import { AdminProtectedRoute } from '@components/RouteAccess'

interface Props {
  children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <AdminProtectedRoute>
      <LightMode>
        <GlobalStyle />
        <Box mx="auto">
          <NavBar />
          <Flex>
            <SideBar />
            <Box flex={1} bg="#F5F7FA" h="87vh" overflowY="scroll">
              <Box py={{ base: 5, '1xl': 8 }} px={8} maxW={{ base: 980, '1xl': 1200 }} mx="auto">
                {children}
              </Box>
            </Box>
          </Flex>
        </Box>
      </LightMode>
    </AdminProtectedRoute>
  )
}

export default MainLayout
