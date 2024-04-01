import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext'
import { useCustomToast } from '../hooks/useCustomToast'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [isLoggedIn, router])

  return <>{children}</>
}

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useContext(AuthContext)
  const router = useRouter()

  console.log('is logged in', isLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn, router])

  return <>{children}</>
}

export const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useContext(AuthContext)
  console.log('user role in context is', user)
  const router = useRouter()
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin'
  const { showToast } = useCustomToast()

  useEffect(() => {
    if (loading) return
    if (!isAdmin) {
      showToast('You are not authorized to view this page', 'error')
      router.push('/')
    }
  }, [isAdmin, loading])

  return <>{children}</>
}
