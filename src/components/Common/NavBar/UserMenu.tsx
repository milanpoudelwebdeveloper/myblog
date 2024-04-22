import { AuthContext } from '@/src/context/authContext'
import { useCustomToast } from '@/src/hooks/useCustomToast'
import { logoutUser } from '@/src/services/auth'
import { Button, Menu, MenuButton, MenuItem, MenuList, Image as ChakraImage } from '@chakra-ui/react'
import { ADMIN, BLOGS_BY_USER, SAVED_BLOGS, SETTINGS } from '@constants/routes'
import Link from 'next/link'
import { useContext } from 'react'

const UserMenu = () => {
  const { setLogOut, user } = useContext(AuthContext)
  const { showToast } = useCustomToast()
  const hasDashboardAccess = user?.role === 'superadmin' || user?.role === 'admin' || user?.role === 'writer'

  const logOutHandler = () => {
    logoutUser()
      .then((res) => {
        setLogOut()
        showToast(res?.message, 'success')
      })
      .catch((e) => showToast(e, 'error'))
  }

  return (
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
      <MenuList fontSize={{ base: 'sm', '1xl': 'md' }} fontWeight="500" py={4}>
        {hasDashboardAccess && (
          <Link href={ADMIN} shallow prefetch={false}>
            <MenuItem mb={1}>Dashboard</MenuItem>
          </Link>
        )}
        <Link href={SAVED_BLOGS} shallow>
          <MenuItem mb={1}>Saved</MenuItem>
        </Link>
        <Link href={BLOGS_BY_USER} shallow>
          <MenuItem mb={1}>Blogs By You</MenuItem>
        </Link>
        <Link href={SETTINGS} shallow prefetch={false}>
          <MenuItem mb={1}> Settings</MenuItem>
        </Link>
        <MenuItem mb={1} onClick={logOutHandler}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserMenu
