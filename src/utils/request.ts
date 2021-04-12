import axios, { AxiosRequestConfig } from 'axios'
import { message } from 'antd'

axios.defaults.timeout = 10000

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  config => {
    return config.data
  },
  error => {
    let errorMessage = '系统异常'
    if (error?.response?.data?.error) {
      errorMessage = error?.response?.data.error
    }
    if (error?.message?.includes('Network Error')) {
      errorMessage = '网络错误，请检查您的网络'
    }
    error.message && message.error(errorMessage)
    return {
      code: false,
      message: errorMessage,
      result: null
    }
  }
)

export type Response<T = any> = {
  status: number
  error: string
  data: T
}

type Method = 'get' | 'post' | 'put' | 'delete'

export type MyResponse<T = any> = Promise<Response<T>>

export const request = <T = any>(method: Method, url: string, data?: any, config?: AxiosRequestConfig): any => {
  const prefix = 'http://127.0.0.1:8889'
  if (url.indexOf('https') !== 0) {
    url = prefix + url
  }
  if (method === 'post') {
    return axios.post(url, data, config)
  } else if (method === 'put') {
    return axios.put(url, data)
  } else if (method === 'delete') {
    return axios.delete(url)
  } else {
    return axios.get(url, {
      params: data,
      ...config
    })
  }
}
