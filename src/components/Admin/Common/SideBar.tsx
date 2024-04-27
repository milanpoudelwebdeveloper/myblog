import { Box, Flex, Image } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const items = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: '/images/dashboardicon.webp'
  },
  {
    name: 'Categories',
    path: '/admin/categories',
    icon: '/images/categoryicon.webp'
  },
  {
    name: 'Blogs',
    path: '/admin/blogs',
    icon: '/images/blogicon.webp'
  },
  {
    name: 'Users',
    path: '/admin/users',
    icon: '/images/usericon.webp'
  },
  {
    name: 'Messages',
    path: '/admin/messages',
    icon: '/images/usericon.webp'
  }
]

const SideBar = () => {
  const pathname = usePathname()
  const isActive = (path: string) => path === pathname
  return (
    <Box bg="#FFF" color="#B1B1B1" fontSize="md" p={4} w={240}>
      {items.map((item) => (
        <Link href={item?.path} key={item?.name} shallow>
          <Flex
            alignItems="center"
            mb={4}
            color="#202224"
            gap={4}
            bg={isActive(item?.path) ? '#4880FF' : 'white'}
            py={4}
            pl={4}
            pr={7}
            borderRadius={10}
          >
            <Image src={item.icon} alt={item.name} w={{ base: 5, '1xl': 6 }} h="auto" objectFit="contain" />
            <Box fontSize="sm" fontWeight="600" color={isActive(item?.path) ? 'white' : '#202224'}>
              {item.name}
            </Box>
          </Flex>
        </Link>
      ))}
    </Box>
  )
}

export default SideBar
