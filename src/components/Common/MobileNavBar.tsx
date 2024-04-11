import { AuthContext } from '@/src/context/authContext'
import { Box, Button, Flex } from '@chakra-ui/react'
import { navLinks } from '@constants/navbar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

interface Props {
  logOutHandler: () => void
}

const MobileNavBar = ({ logOutHandler }: Props) => {
  const router = useRouter()
  const pathname = router.pathname
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <Flex
      direction="column"
      position="absolute"
      zIndex={10}
      top={14}
      right={-4}
      fontSize={{ md: 'sm', xl: 'md', '1xl': 'lg' }}
      gap={{ base: 5, '1xl': 9 }}
      alignItems="center"
      bg="white"
      py={10}
      px={20}
      h="60vh"
    >
      {navLinks?.map(({ title, link }) => (
        <Link key={link} href={link}>
          <Box
            mb={{ base: 4, md: 0 }}
            borderBottomColor={pathname === link ? '#6941C6' : 'transparent'}
            borderBottomWidth={3}
            px={2}
            pb={{ base: 1, md: 2 }}
          >
            <Box cursor="pointer" _hover={{ color: '#1814F3' }}>
              {title}
            </Box>
          </Box>
        </Link>
      ))}
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
      </Flex>
    </Flex>
  )
}

export default MobileNavBar
