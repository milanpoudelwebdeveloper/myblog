import { axiosInstance } from '@/axiosConfig'

export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get('/users')
    if (res?.data) {
      return res?.data?.users
    }
  } catch (e: any) {
    const message = e?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}
