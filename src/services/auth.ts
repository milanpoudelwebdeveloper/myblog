import { axiosInstance } from '@/axiosConfig'

export interface ISignUp {
  email: string
  name: string
  password: string
  country: string
}
export const signUpUser = async (data: ISignUp) => {
  try {
    const res = await axiosInstance.post('/auth/signup', data)
    if (res?.data) {
      return res.data
    }
  } catch (e: any) {
    const message = e?.response?.data?.message || 'Something went wrong while fetching blogs. Please try again'
    throw message
  }
}

export const verifyAccount = async (token: string) => {
  try {
    const res = await axiosInstance.post('/auth/verifyaccount', { token })
    if (res?.data) {
      return res.data
    }
  } catch (e: any) {
    const message = e?.response?.data?.message || 'Something went wrong while verifying account. Please try again'
    throw message
  }
}

export interface ILogin {
  email: string
  password: string
}

export const loginUser = async (data: ILogin) => {
  try {
    const res = await axiosInstance.post('/auth/login', data)
    if (res?.data) {
      return res.data
    }
  } catch (e: any) {
    const message = e?.response?.data?.message || 'Something went wrong while verifying account. Please try again'
    throw message
  }
}

export const checkLogin = async () => {
  try {
    const res = await axiosInstance.get('/auth/checklogin')
    if (res?.data) {
      return res.data
    }
  } catch (e: any) {
    const message = e?.response?.data?.message || 'Something went wrong while verifying account. Please try again'
    throw message
  }
}

export const logoutUser = async () => {
  try {
    const res = await axiosInstance.get('/auth/logout')
    if (res?.data) {
      return res.data
    }
  } catch (e: any) {
    const message = e?.response?.data?.message || 'Something went wrong while verifying account. Please try again'
    throw message
  }
}
