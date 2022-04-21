import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.apiBasePath,
  // baseURL: 'bore.pub:44573',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
