import { Box, Button, Flex, useColorModeValue, useMediaQuery, useOutsideClick } from '@chakra-ui/react'
import { useContext, useRef, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'
import { AuthContext } from '@/src/context/authContext'
import { useRouter } from 'next/router'
import { navLinks } from '@constants/navbar'
import { RxHamburgerMenu } from 'react-icons/rx'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { BLOGS } from '@constants/routes'

const LazyLoadedUserMenu = dynamic(() => import('./NavBar/UserMenu'))
const LazyLoadedMobileNavBar = dynamic(() => import('./MobileNavBar'))

const NavBar = () => {
  const { isLoggedIn } = useContext(AuthContext)
  const divRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const bg = useColorModeValue('white', '#141414')
  const router = useRouter()
  const pathname = router.pathname

  useOutsideClick({
    ref: divRef,
    handler: () => setIsModalOpen(false)
  })

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
            <LazyLoadedMobileNavBar />
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
            gap={{ base: 8, '1xl': 10 }}
            alignItems="center"
          >
            {navLinks?.map(({ title, link }) => (
              <Link key={link} href={link === BLOGS ? BLOGS + '?category=all' : link} shallow>
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
              <LazyLoadedUserMenu />
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
