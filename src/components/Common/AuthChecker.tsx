import { AuthContext } from '@/src/context/authContext'
import { checkLogin } from '@/src/services/auth'
import { useDisclosure } from '@chakra-ui/react'
import UpdateInfo from '@components/Admin/Common/UpdateInfo'
import React, { useContext, useEffect } from 'react'

const AuthChecker = () => {
  const { setUserData, setIsLoading } = useContext(AuthContext)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedInCodeWithMilan')

  useEffect(() => {
    if (!isLoggedIn) return
    checkLogin()
      .then((res) => {
        if (res?.user) {
          const user = { ...res?.user }
          setUserData(user)
          if (!user.name || !user.country) {
            onOpen()
          }
        }
      })
      .catch((e) => {
        console.log('the error while checking login', e)
        localStorage.removeItem('isLoggedInCodeWithMilan')
      })
      .finally(() => setIsLoading(false))
  }, [isLoggedIn])

  return (
    <>
      <UpdateInfo isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default AuthChecker
