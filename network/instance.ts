import axios from 'axios'
import { server } from './config'

const instance = axios.create({
  baseURL: server,
  withCredentials: true,
  timeout: 20000,
  headers: {
    'content-type': 'application/json',
  },
})

instance.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default instance
