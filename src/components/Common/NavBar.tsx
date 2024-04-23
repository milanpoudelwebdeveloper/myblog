import { Box, Button, Flex, useColorModeValue, useMediaQuery, useOutsideClick } from '@chakra-ui/react'
import { useContext, useRef, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'
import { AuthContext } from '@/src/context/authContext'
import { useRouter } from 'next/router'
import { navLinks } from '@constants/navbar'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { BLOGS } from '@constants/routes'

const LazyLoadedUserMenu = dynamic(() => import('./NavBar/UserMenu'), {
  ssr: false
})
const LazyLoadedMobileNavBar = dynamic(() => import('./MobileNavBar'), {
  ssr: false
})

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
      zIndex={20}
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
        maxW={{ base: 700, lg: 780, xl: 1080, '1xl': 1200 }}
      >
        <Flex gap={{ base: 24, xl: 80 }}>
          <Flex alignItems="center" gap={2}>
            <Box display={{ base: 'block', md: 'none' }} onClick={() => setIsModalOpen((prev) => !prev)}>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 15 15"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                  fill="currentColor"
                />
              </svg>
            </Box>
            <Link href="/" shallow passHref>
              <Box
                position="relative"
                minW={{ base: 9, '1xl': 12 }}
                minH={{ base: 9, '1xl': 12 }}
                maxW="full"
                maxH="full"
                borderRadius="full"
                overflow="hidden"
              >
                <Image src="/images/logo.webp" alt="logo" fill sizes="(min-width: 780px) 48px, 36px" objectFit="cover" />
              </Box>
            </Link>
          </Flex>

          <Flex
            display={{ base: 'none', md: 'flex' }}
            fontSize={{ md: 'sm', '1xl': 'md' }}
            gap={{ base: 8, '1xl': 10 }}
            alignItems="center"
          >
            {navLinks?.map(({ title, link, prefetch }) => (
              <Link key={link} href={link === BLOGS ? BLOGS + '?category=all' : link} shallow prefetch={prefetch}>
                <Box borderBottomColor={pathname === link ? '#6941C6' : 'transparent'} borderBottomWidth={3} px={2} pb={{ base: 1, xl: 2 }}>
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
              <Link href="/login" shallow>
                <Button bg="#6941C6" color="white" fontSize={{ md: 'sm', '1xl': 'lg' }} fontWeight="normal" h={{ base: 9, '1xl': 10 }}>
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
