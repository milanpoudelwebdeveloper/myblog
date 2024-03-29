import React, { createContext, useState } from 'react'

const defaultUserData = {
  name: '',
  email: '',
  id: '',
  country: '',
  profileimage: '',
  role: '',
  verified: false
}

export interface AuthContext {
  user: IUser
  isLoggedIn: boolean | undefined
  setUserData: (user: IUser) => void
  loading: boolean
  setIsLoading: (loading: boolean) => void
  setLogOut: () => void
}

export const AuthContext = createContext<AuthContext>({
  user: defaultUserData,
  isLoggedIn: false,
  loading: true,
  setUserData: (_: IUser) => {},
  setIsLoading: (_: boolean) => {},
  setLogOut: () => {}
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser>(defaultUserData)
  const [isLoading, setLoading] = useState<boolean>(true)
  const isLoggedIn = !!user?.id

  const setUserData = (data: IUser) => {
    setUser((prev) => ({ ...prev, ...data }))
  }

  const setLogOut = () => {
    setUser(defaultUserData)
  }

  const setIsLoading = (loading: boolean) => {
    setLoading(loading)
  }

  const value = {
    user,
    isLoggedIn,
    setUserData,
    loading: isLoading,
    setIsLoading,
    setLogOut
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
