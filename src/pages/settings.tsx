import { Box, Button, Divider, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import MainLayout from '@components/Common/MainLayout'
import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import InformationSettings from '@components/Settings/InformationSettings'
import ChangePassword from '@components/Settings/ChangePassword'

const Settings = () => {
  const headingColor = useColorModeValue('#1A1A1A', '#FFFFFF')

  return (
    <MainLayout>
      <Box>
        <Text as="h1" color={headingColor} fontSize={{ base: 'lg', md: 'xl', '1xl': '24px' }} fontWeight="600" mb={2} mt={4}>
          Settings
        </Text>
        <Divider borderColor="#6941C6" w={9} borderWidth={2} />

        <Flex alignItems="center" my={4} gap={2}>
          <Text>Do you want to write on this plaform? You can request to be a writer</Text>
          <Button variant="unstyled" color="#6941C6">
            Request Here
          </Button>
        </Flex>

        <Tabs>
          <TabList>
            <Tab>Your Information</Tab>
            <Tab>Password</Tab>
            <Tab>Account Settings</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <InformationSettings />
            </TabPanel>
            <TabPanel>
              <ChangePassword />
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </MainLayout>
  )
}

export default Settings
