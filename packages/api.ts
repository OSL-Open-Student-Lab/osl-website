import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.apiBasePath,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
