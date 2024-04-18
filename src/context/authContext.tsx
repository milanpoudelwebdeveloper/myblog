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

export interface IUpdateUser {
  name: string
  country: string
}

export interface AuthContext {
  user: IUser
  isLoggedIn: boolean | undefined
  setUserData: (user: IUser) => void
  loading: boolean
  setIsLoading: (loading: boolean) => void
  setLogOut: () => void
  updateUserInformation?: (data: IUpdateUser) => void
}

export const AuthContext = createContext<AuthContext>({
  user: defaultUserData,
  isLoggedIn: false,
  loading: true,
  setUserData: (_: IUser) => {},
  setIsLoading: (_: boolean) => {},
  setLogOut: () => {},
  updateUserInformation: (_: IUpdateUser) => {}
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
    localStorage.setItem('isLoggedInCodeWithMilan', 'true')
  }

  const setLogOut = () => {
    setUser(defaultUserData)
    localStorage.removeItem('isLoggedInCodeWithMilan')
  }

  const setIsLoading = (loading: boolean) => {
    setLoading(loading)
  }

  const updateUserInformation = (data: IUpdateUser) => {
    setUser((prev) => ({ ...prev, ...data }))
  }

  const value = {
    user,
    isLoggedIn,
    setUserData,
    loading: isLoading,
    setIsLoading,
    setLogOut,
    updateUserInformation
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
