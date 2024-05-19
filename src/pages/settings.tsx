import { Box, Divider, Text, useColorModeValue } from '@chakra-ui/react'
import MainLayout from '@components/Common/MainLayout'
import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import InformationSettings from '@components/Settings/InformationSettings'
import ChangePassword from '@components/Settings/ChangePassword'
import { ProtectedRoute } from '@components/RouteAccess'
import AccountSettings from '@components/Settings/AccountSettings'

const Settings = () => {
  const headingColor = useColorModeValue('#1A1A1A', '#FFFFFF')

  return (
    <ProtectedRoute>
      <MainLayout>
        <Box w={{ base: 'full', md: 700, xl: 800, '1xl': 940 }} mx="auto">
          <Text as="h1" color={headingColor} fontSize={{ base: 'lg', md: 'xl', '1xl': '24px' }} fontWeight="600" mb={1} mt={3}>
            Settings
          </Text>
          <Divider borderColor="#6941C6" w={9} borderWidth={2} />

          <Tabs mt={{ base: 5, '1xl': 8 }}>
            <TabList fontSize="xs" gap={{ base: 4, '1xl': 7 }} border="none">
              <Tab fontSize={{ base: 'sm', '1xl': 'lg' }}>Your Information</Tab>
              <Tab fontSize={{ base: 'sm', '1xl': 'lg' }}>Password</Tab>
              <Tab fontSize={{ base: 'sm', '1xl': 'lg' }}>Account Settings</Tab>
            </TabList>

            <TabPanels pt={{ base: 4, '1xl': 7 }}>
              <TabPanel>
                <InformationSettings />
              </TabPanel>
              <TabPanel>
                <ChangePassword />
              </TabPanel>
              <TabPanel>
                <AccountSettings />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </MainLayout>
    </ProtectedRoute>
  )
}

export default Settings
