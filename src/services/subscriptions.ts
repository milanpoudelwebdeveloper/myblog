import { axiosInstance } from '@/axiosConfig'

export const addSubscription = async (email: string) => {
  try {
    const res = await axiosInstance.post('/subscriptions/add', { email })

    return res.data
  } catch (e: any) {
    const message = e?.response?.data?.message || 'Something went wrong while updating user. Please try again'
    throw message
  }
}
