import { Box, Flex, Image, Text } from '@chakra-ui/react'
import MainLayout from '@components/Admin/Common/MainLayout'

import React, { useEffect } from 'react'
import RecentBlogs from '../components/Admin/Blogs/RecentBlogs'
import { getStats } from '../services/stats'
import { useCustomToast } from '../hooks/useCustomToast'
import Link from 'next/link'

interface IStats {
  totalBlogs: number
  totalCategories: number
  totalUsers: number
}

const AdminHome = () => {
  const [statsData, setStatsData] = React.useState<IStats>({} as IStats)
  const { showToast } = useCustomToast()
  useEffect(() => {
    getStats()
      .then((data) => {
        setStatsData((prev) => ({ ...prev, ...data?.data }))
      })
      .catch((e) => {
        showToast(e, 'error')
      })
  }, [])
  return (
    <MainLayout>
      <Box color="#202224">
        <Text fontSize={{ base: '24px', '1xl': '32px' }} fontWeight="bold" mb={7}>
          Dashboard
        </Text>
        <Flex gap={9}>
          <Link href="/admin/users" shallow>
            <Flex bg="white" boxShadow="6px 6px 54px 0px rgba(0, 0, 0, 0.05)" p={6} borderRadius={14} gap={20}>
              <Box>
                <Text fontSize={{ base: 'sm', '1xl': 'md' }} fontWeight="600" opacity={0.7}>
                  Total Users
                </Text>
                <Text fontSize={{ base: '24px', '1xl': '28px' }} fontWeight="bold" mt={4}>
                  {statsData?.totalUsers}
                </Text>
              </Box>

              <Image src="/images/usericon1.png" alt="user" w={14} h="auto" objectFit="contain" />
            </Flex>
          </Link>
          <Link href="/admin/blogs" shallow>
            <Flex bg="white" boxShadow="6px 6px 54px 0px rgba(0, 0, 0, 0.05)" p={6} borderRadius={14} gap={20}>
              <Box h="full">
                <Text fontSize={{ base: 'sm', '1xl': 'md' }} fontWeight="600" opacity={0.7}>
                  Total Blogs
                </Text>
                <Text fontSize={{ base: '24px', '1xl': '28px' }} fontWeight="bold" mt={4}>
                  {statsData?.totalBlogs}
                </Text>
              </Box>
              <Image src="/images/usericon1.png" alt="user" w={14} h="auto" objectFit="contain" />
            </Flex>
          </Link>
          <Link href="/admin/categories" shallow>
            <Flex bg="white" boxShadow="6px 6px 54px 0px rgba(0, 0, 0, 0.05)" p={6} borderRadius={14} gap={20}>
              <Box>
                <Text fontSize={{ base: 'sm', '1xl': 'md' }} fontWeight="600" opacity={0.7}>
                  Total Categories
                </Text>
                <Text fontSize={{ base: '24px', '1xl': '28px' }} fontWeight="bold" mt={4}>
                  {statsData?.totalCategories}
                </Text>
              </Box>
              <Image src="/images/usericon1.png" alt="user" w={14} h="auto" objectFit="contain" />
            </Flex>
          </Link>
        </Flex>
        <RecentBlogs />
      </Box>
    </MainLayout>
  )
}

export default AdminHome
