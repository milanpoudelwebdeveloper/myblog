import { axiosInstance } from '@/axiosConfig'

export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get('/users')
    if (res?.data) {
      return res?.data?.users
    }
  } catch (e) {
    console.log('Something went wrong: Service: getAllUsers', e)
    return { message: 'Something went wrong while getting users list' }
  }
}
