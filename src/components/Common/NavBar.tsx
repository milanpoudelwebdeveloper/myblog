import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext } from 'react'
import ThemeToggle from './ThemeToggle'
import { ABOUT, BLOGS, CONTACT, HOME } from '@/src/constants/routes'
import Link from 'next/link'
import { AuthContext } from '@/src/context/authContext'
import { logoutUser } from '@/src/services/auth'
import { useCustomToast } from '@/src/hooks/useCustomToast'
import { useRouter } from 'next/router'

export const navLinks = [
  { title: 'Home', link: HOME },
  { title: 'Blogs', link: BLOGS },
  { title: 'About', link: ABOUT },
  { title: 'Contact', link: CONTACT }
]

const NavBar = () => {
  const { setLogOut, isLoggedIn } = useContext(AuthContext)
  const { showToast } = useCustomToast()
  const bg = useColorModeValue('white', '#141414')
  const router = useRouter()
  const pathname = router.pathname

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
    <Box bg={bg} boxShadow="rgba(0, 0, 0, 0.05) 0px 2px 4px 0px" w="full" position="fixed" zIndex={10} top={0}>
      <Flex justifyContent="space-between" py={{ base: 4, xl: 7 }} width="full" maxW={{ base: 1090, '1xl': 1230 }}>
        <Flex gap={48}>
          <Text fontSize={{ base: 'sm', md: 'md', '1xl': 'xl' }} fontWeight="medium">
            Milan
          </Text>
          <Flex fontSize={{ md: 'sm', xl: 'md', '1xl': 'lg' }} gap={{ base: 5, '1xl': 9 }} alignItems="center">
            {navLinks.map(({ title, link }) => (
              <Link key={link} href={link}>
                <Box borderBottomColor={pathname === link ? '#6941C6' : 'transparent'} borderBottomWidth={3} px={2} pb={2}>
                  <Box cursor="pointer" _hover={{ color: '#1814F3' }}>
                    <Text>{title}</Text>
                  </Box>
                </Box>
              </Link>
            ))}
          </Flex>
        </Flex>
        <Flex gap={{ base: 3, md: 5, '1xl': 8 }}>
          {isLoggedIn ? (
            <Button bg="#6941C6" color="#fff" fontSize="md" onClick={logOutHandler}>
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button bg="#6941C6" color="white" fontSize={{ md: 'sm', xl: 'lg' }} fontWeight="normal">
                Login
              </Button>
            </Link>
          )}
          <ThemeToggle />
        </Flex>
      </Flex>
    </Box>
  )
}

export default NavBar
