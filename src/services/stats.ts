import { axiosInstance } from '@/axiosConfig'

export const getStats = async () => {
  try {
    const res = await axiosInstance.get('/stats')
    if (res?.data) {
      return res.data
    }
  } catch (e: any) {
    const message = e?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}
