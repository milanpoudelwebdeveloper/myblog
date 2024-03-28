import { AuthContext } from '@/src/context/authContext'
import { checkLogin } from '@/src/services/auth'
import React, { useContext, useEffect } from 'react'

const AuthChecker = () => {
  const { setUserData, setIsLoading } = useContext(AuthContext)

  useEffect(() => {
    checkLogin()
      .then((res) => {
        if (res?.user) {
          setUserData(res?.user)
        }
      })
      .catch((e) => console.log('the error while checking login', e))
      .finally(() => setIsLoading(false))
  }, [])
  return <></>
}

export default AuthChecker
