import { axiosInstance, axiosInstanceFile } from '@/axiosConfig'

export const addBlog = async (data: IAddBlog) => {
  try {
    const res = await axiosInstanceFile.post('/blog', data)
    if (res?.data) {
      return res.data
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}

export const updateBlog = async (blogId: number | string, data: IAddBlog) => {
  try {
    const res = await axiosInstanceFile.put(`/blog/${blogId}`, data)
    if (res?.data) {
      return res.data
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}

export const getBlogs = async (category: number | string | null = 'all', publishedStatus: boolean | null = true) => {
  try {
    const res = await axiosInstance.get(`/blog?categoryId=${category}&published=${publishedStatus}`)
    if (res?.data) {
      return res?.data?.data
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong while fetching blogs. Please try again'
    throw message
  }
}

export const getFeaturedBlog = async () => {
  try {
    const res = await axiosInstance.get('/blog/featured')
    console.log('res', res)
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
    const res = await axiosInstance.get(`/blog/details/${blogId}`)
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

export const deleteBlog = async (blogId: string) => {
  try {
    const res = await axiosInstance.delete(`/blog/${blogId}`)
    if (res?.data) {
      return res?.data?.message
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}

export const updateReadCount = async (blogId: string) => {
  try {
    const res = await axiosInstance.put(`/blog/read/${blogId}`)
    if (res?.data) {
      return res?.data?.message
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}

export const getPopularBlogs = async () => {
  try {
    const res = await axiosInstance.get('/blog/popular')
    if (res?.data) {
      return res?.data?.data
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}
