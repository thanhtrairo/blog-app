import axios from 'axios'

const httpRequest = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export { httpRequest }
