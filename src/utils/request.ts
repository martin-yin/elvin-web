import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'
import { toLineData } from '.'
const service = axios.create({
  timeout: 60000
})

service.interceptors.request.use(
  config => {
    config.headers['token'] = localStorage.getItem('token')
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (
    response: AxiosResponse<{
      code: number
    }>
  ) => {
    const responseCode = response.status
    if (response.data?.code === 401) {
      message.error('登录状态过期！')
      location.href = '/login'
      return Promise.reject(response)
    }
    if (responseCode === 404) {
      message.error('404')
      return Promise.reject(response)
    }
    if (responseCode === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    let errorMessage = ''
    if (error.message.includes('404')) {
      errorMessage = '接口地址错误，请检查接口地址！'
    }
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
  // const prefix = 'http://api.dancin.cn'
  const prefix = 'http://192.168.0.100:8889'

  if (!notMonitorId.includes(url)) {
    const monitor_id = localStorage.getItem('monitor_id')
    Object.assign(data, { monitor_id })
  }
  const postData = toLineData(data)
  // if (url.indexOf('https') < 0 && url.indexOf('http') < 0) {
  //   url = prefix + url
  // }

  url = prefix + url
  if (method === 'post') {
    return service.post(url, postData, config)
  } else if (method === 'put') {
    return service.put(url, postData)
  } else if (method === 'delete') {
    return service.delete(url)
  } else {
    return service.get(url, {
      params: postData,
      ...config
    })
  }
}
