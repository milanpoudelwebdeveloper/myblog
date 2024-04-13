import {
  Box,
  Button,
  Flex,
  useColorModeValue,
  useMediaQuery,
  useOutsideClick,
  Image as ChakraImage,
  Menu,
  MenuItem,
  MenuList,
  MenuButton
} from '@chakra-ui/react'
import { useContext, useRef, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'
import { AuthContext } from '@/src/context/authContext'
import { logoutUser } from '@/src/services/auth'
import { useCustomToast } from '@/src/hooks/useCustomToast'
import { useRouter } from 'next/router'
import { navLinks } from '@constants/navbar'
import MobileNavBar from './MobileNavBar'
import { RxHamburgerMenu } from 'react-icons/rx'
import Image from 'next/image'
import { BLOGS_BY_USER, SAVED_BLOGS, SETTINGS } from '@constants/routes'

const NavBar = () => {
  const { setLogOut, isLoggedIn, user } = useContext(AuthContext)
  const divRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const { showToast } = useCustomToast()
  const bg = useColorModeValue('white', '#141414')
  const router = useRouter()
  const pathname = router.pathname

  useOutsideClick({
    ref: divRef,
    handler: () => setIsModalOpen(false)
  })

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
    <Box
      bg={bg}
      boxShadow="rgba(0, 0, 0, 0.05) 0px 2px 4px 0px"
      w="full"
      position="fixed"
      zIndex={10}
      top={0}
      left={0}
      pl={{ base: 4, md: 0 }}
      pr={{ base: 5, md: 0 }}
    >
      <Box position="relative">
        {isMobile && isModalOpen && (
          <Box ref={divRef}>
            <MobileNavBar logOutHandler={logOutHandler} />
          </Box>
        )}
      </Box>
      <Flex
        justifyContent="space-between"
        mx="auto"
        py={{ base: 4, xl: 5, '1xl': 6 }}
        width="full"
        maxW={{ base: 700, lg: 780, xl: 1070, '1xl': 1230 }}
      >
        <Flex gap={48}>
          <Flex alignItems="center" gap={2}>
            <Box display={{ base: 'block', md: 'none' }}>
              <RxHamburgerMenu size={20} onClick={() => setIsModalOpen((prev) => !prev)} />
            </Box>
            <Link href="/" shallow passHref>
              <Box
                position="relative"
                w={{ base: 9, md: 12 }}
                h={{ base: 9, md: 12 }}
                maxW="full"
                maxH="full"
                borderRadius="full"
                overflow="hidden"
              >
                <Image
                  src="/images/logo.webp"
                  alt="logo"
                  fill
                  style={{
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </Link>
          </Flex>

          <Flex
            display={{ base: 'none', md: 'flex' }}
            fontSize={{ md: 'sm', xl: 'md', '1xl': 'lg' }}
            gap={{ base: 5, '1xl': 9 }}
            alignItems="center"
          >
            {navLinks?.map(({ title, link }) => (
              <Link key={link} href={link} shallow>
                <Box borderBottomColor={pathname === link ? '#6941C6' : 'transparent'} borderBottomWidth={3} px={2} pb={2}>
                  <Box cursor="pointer" _hover={{ color: '#1814F3' }}>
                    {title}
                  </Box>
                </Box>
              </Link>
            ))}
          </Flex>
        </Flex>
        <Flex gap={{ base: 3, md: 5, '1xl': 8 }} alignItems="center">
          <ThemeToggle />
          <Box display="block">
            {isLoggedIn ? (
              <Menu>
                <MenuButton as={Button} variant="unstyled" fontWeight="normal">
                  <ChakraImage
                    src={user?.profileimage}
                    fallbackSrc="/images/default-avatar.webp"
                    fallbackStrategy="beforeLoadOrError"
                    alt="profile"
                    w={10}
                    h={10}
                    maxW="full"
                    maxH="full"
                    borderRadius="full"
                    objectFit="cover"
                  />
                </MenuButton>
                <MenuList fontSize="md" fontWeight="500" py={4}>
                  <Link href={SAVED_BLOGS}>
                    <MenuItem mb={1}>Saved</MenuItem>
                  </Link>
                  <Link href={BLOGS_BY_USER}>
                    <MenuItem mb={1}>Blogs By You</MenuItem>
                  </Link>
                  <Link href={SETTINGS}>
                    <MenuItem mb={1}> Settings</MenuItem>
                  </Link>
                  <MenuItem mb={1} onClick={logOutHandler}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Link href="/login">
                <Button bg="#6941C6" color="white" fontSize={{ md: 'sm', xl: 'lg' }} fontWeight="normal">
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default NavBar
