import { axiosInstance, axiosInstanceFile } from '@/axiosConfig'

export const getCategories = async () => {
  try {
    const res = await axiosInstance.get('/category')
    if (res?.data) {
      return res?.data?.data
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}

export const addCategory = async (name: string, image: File) => {
  try {
    const res = await axiosInstanceFile.post('/category', {
      name,
      image
    })

    if (res?.data) {
      return res?.data?.message
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}

export const getCategoryDetails = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/category/${id}`)
    if (res?.data) {
      return res?.data?.data
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}

export const editCategory = async (categoryId: string, name: string, image: File | string) => {
  try {
    const res = await axiosInstanceFile.put(`/category/${categoryId}`, {
      name,
      image
    })
    if (res?.data) {
      return res?.data?.message
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}
