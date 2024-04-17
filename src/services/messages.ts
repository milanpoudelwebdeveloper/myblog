import { axiosInstance } from '@/axiosConfig'

export const sendMessage = async (data: IContact) => {
  try {
    const res = await axiosInstance.post('/messages', data)
    return res?.data?.message
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong while sending message. Please try again'
    throw message
  }
}

export const getMessages = async () => {
  try {
    const res = await axiosInstance.get('/messages')
    return res?.data?.data
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong while getting messages. Please try again'
    throw message
  }
}

export const getMessageDetails = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/messages/details/${id}`)
    return res?.data?.data
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong while getting message details. Please try again'
    throw message
  }
}

export const updateStatus = async (id: string, status = true) => {
  try {
    const res = await axiosInstance.put(`/messages/${id}`, { solved: status })
    return res?.data?.message
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Something went wrong while updating status. Please try again'
    throw message
  }
}
