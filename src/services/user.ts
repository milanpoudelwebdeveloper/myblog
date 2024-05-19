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

export const createUser = async (data: { email: string; role: string }) => {
  try {
    const res = await axiosInstance.post('/users', data)
    if (res?.data) {
      return res.data
    }
  } catch (e: any) {
    const message = e?.response?.data?.message || 'Something went wrong while creating user. Please try again'
    throw message
  }
}

export interface IUpdateUser {
  id: string
  name: string
  country: string
  gender: string
  email: string
  bio: string
}

export const updateInformation = async (data: IUpdateUser) => {
  try {
    const res = await axiosInstance.put(`/users/${data?.id}`, data)
    if (res?.data) {
      return res.data
    }
  } catch (e: any) {
    const message = e?.response?.data?.message || 'Something went wrong while updating user. Please try again'
    throw message
  }
}
