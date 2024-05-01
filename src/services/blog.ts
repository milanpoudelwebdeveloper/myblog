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

export const getBlogs = async (currentPage = 1, category: number | string | null = 'all', publishedStatus: boolean | null = true) => {
  try {
    const res = await axiosInstance.get(`/blog?currentPage=${currentPage}&categoryId=${category}&published=${publishedStatus}`)
    if (res?.data) {
      return res?.data
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong while fetching blogs. Please try again'
    throw message
  }
}

export const getFeaturedBlog = async () => {
  try {
    const res = await axiosInstance.get('/blog/featured')
    if (res?.data) {
      return res?.data?.data
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong while fetching blogs. Please try again'
    throw message
  }
}

export const getBlogDetails = async (blogId: number | string, headers?: any) => {
  try {
    const res = await axiosInstance.get(`/blog/details/${blogId}`, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Credentials': true,
        Cookie: headers
      }
    })
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

export const getSavedBlogs = async (userId: number | string) => {
  try {
    const res = await axiosInstance.get(`/blog/saved/${userId}`)
    if (res?.data) {
      return res?.data?.data
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}

export const getBlogsByUser = async (category: number | string | null = 'all', userId: number | string) => {
  if (!userId) return
  try {
    const res = await axiosInstance.get(`/blog/user/${userId}?categoryId=${category}`)
    if (res?.data) {
      return res?.data?.data
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}

export const saveBlog = async (blogId: string | number, userId: number | string) => {
  try {
    const res = await axiosInstance.post(`/blog/save/${blogId}`, {
      userId
    })
    if (res?.data) {
      return res?.data?.message
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}

export const unSaveBlog = async (blogId: string | number, userId: number | string) => {
  try {
    const res = await axiosInstance.delete(`/blog/unsave/${blogId}`, {
      data: {
        userId
      }
    })
    if (res?.data) {
      return res?.data?.message
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}

export const uploadBlogImage = async (image: File) => {
  try {
    const res = await axiosInstanceFile.post('/blog/image/upload', {
      contentImage: image
    })
    if (res?.data) {
      return res?.data
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}

export const isBlogLiked = async (blogId: string | number) => {
  try {
    const res = await axiosInstance.get(`/blog/isliked/${blogId}`)
    if (res?.data) {
      return res?.data?.data
    }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong. Please try again'
    throw message
  }
}
