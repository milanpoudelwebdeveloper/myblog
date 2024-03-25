import { axiosInstance, axiosInstanceFile } from '@/axiosConfig'

export const addBlog = async (title: string, coverImage: File, content: string, category: number | string, published: boolean) => {
  try {
    const res = await axiosInstanceFile.post('/blog', {
      title,
      coverImage,
      content,
      category,
      published
    })
    if (res?.data) {
      return res.data
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}

export const updateBlog = async (
  blogId: number | string,
  title: string,
  coverImage: File,
  content: string,
  category: number | string,
  published: boolean
) => {
  try {
    const res = await axiosInstanceFile.put(`/blog/${blogId}`, {
      title,
      coverImage,
      content,
      category,
      published
    })
    if (res?.data) {
      return res.data
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}
export const getBlogs = async (category: number | string | null = 'all') => {
  try {
    const res = await axiosInstance.get(`/blog?categoryId=${category}`)
    if (res?.data) {
      return res?.data?.data
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong while fetching blogs. Please try again'
    throw message
  }
}

export const getBlogDetails = async (blogId: number | string) => {
  try {
    const res = await axiosInstance.get(`/blog/${blogId}`)
    if (res?.data) {
      return res?.data?.data
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong while fetching blogs. Please try again'
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
