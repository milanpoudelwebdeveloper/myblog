import { AuthContext } from '@/src/context/authContext'
import { useCustomToast } from '@/src/hooks/useCustomToast'
import { logoutUser } from '@/src/services/auth'
import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'

const NavBar = () => {
  const { user, setLogOut } = useContext(AuthContext)
  const roleFormatted = user.role === 'superadmin' ? 'Super Admin' : user.role === 'admin' ? 'Admin' : 'Writer'
  const { showToast } = useCustomToast()

  const logOutHandler = () => {
    logoutUser()
      .then((res) => {
        setLogOut()
        showToast(res?.message, 'success')
      })
      .catch((e) => {
        showToast(e, 'error')
      })
  }
  return (
    <Flex justifyContent="space-between" py={4} bg="#FFF" maxW={1200} mx="auto">
      <Flex fontSize="xl" fontWeight="bold" gap={1}>
        <Text color="#4880FF">Blog</Text>
        <Text color="#202224">Admin</Text>
      </Flex>
      <Flex gap={10} alignItems="center">
        <Box w="max-content">
          <Image src="/images/notification.png" alt="notification" w={7} objectFit="cover" />
        </Box>

        <Flex gap={4}>
          <Avatar
            size="md"
            src="https://plus.unsplash.com/premium_photo-1665952050053-31ac47c6ff4b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D"
          />
          <Box fontSize="sm">
            <Text fontWeight="bold">{user?.name}</Text>
            <Text>{roleFormatted}</Text>
          </Box>
        </Flex>
        <Button bg="#1814F3" color="#fff" fontSize="md" onClick={logOutHandler}>
          Logout
        </Button>
      </Flex>
    </Flex>
  )
}

export default NavBar
