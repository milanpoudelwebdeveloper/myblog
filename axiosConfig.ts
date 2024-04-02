import axios from 'axios'
const baseURL = process.env.NEXT_PUBLIC_API_URL

const headers = {
  'Content-Type': 'application/json',
  accept: 'application/json, text/plain, */*'
}

export const axiosInstance = axios.create({
  baseURL,
  headers
})

export const axiosInstanceFile = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
    accept: 'application/json, text/plain, */*'
  }
})
