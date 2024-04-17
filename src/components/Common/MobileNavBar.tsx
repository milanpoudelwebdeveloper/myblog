import { Box, Flex } from '@chakra-ui/react'
import { navLinks } from '@constants/navbar'
import { BLOGS } from '@constants/routes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const MobileNavBar = () => {
  const router = useRouter()
  const pathname = router.pathname

  return (
    <Flex
      direction="column"
      position="absolute"
      zIndex={10}
      top={14}
      left={0}
      fontSize={{ md: 'sm', xl: 'md', '1xl': 'lg' }}
      gap={{ base: 5, '1xl': 9 }}
      alignItems="center"
      bg="white"
      py={10}
      px={20}
      h="60vh"
    >
      {navLinks?.map(({ title, link }) => (
        <Link key={link} href={link === BLOGS ? BLOGS + '?category=all' : link} shallow>
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
    </Flex>
  )
}

export default MobileNavBar
