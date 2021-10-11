import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'
axios.defaults.timeout = 10000

axios.interceptors.request.use(
  config => {
    config.headers['token'] = localStorage.getItem('token')
    return config
  },
  error => {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    const responseCode = response.status
    if (responseCode === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    let errorMessage = ''
    if (error.message.includes('timeout')) {
      errorMessage = '请求超时，请稍后再试'
    }
    if (error.message.includes('Network Error')) {
      errorMessage = '网络异常，请检查您的网络'
    }
    message.error(errorMessage)
    return {
      code: false,
      message: errorMessage,
      result: null
    }
  }
)

export type Response<T = any> = {
  code: number
  msg: string
  data: T
}

type Method = 'get' | 'post' | 'put' | 'delete'

const notMonitorId = ['/communal/projects', '/communal/addTeamProject', '/communal/projectHealthy']

export const request = <T>(
  method: Method,
  url: string,
  data = {},
  config?: AxiosRequestConfig
): Promise<Response<T>> => {
  const prefix = 'http://127.0.0.1:8889'
  if (!notMonitorId.includes(url)) {
    const monitor_id = localStorage.getItem('monitor_id')
    Object.assign(data, { monitor_id })
  }
  // if (url.indexOf('https') < 0 && url.indexOf('http') < 0) {
  //   url = prefix + url
  // }
  url = prefix + url

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
