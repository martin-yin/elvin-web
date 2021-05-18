import axios from 'axios'
import { ResourcesErrorList, ResourcesErrorQuota } from '../interface/error.interface'
import { request } from '../utils/request'

export const GetJsError = () => request<any>('get', '/communal/issues')

export const GetJsErrorDetail = (param: { issue_id: number; error_id: number }) =>
  request<any>('get', `/communal/jsErrorDetail`, param)

// 资源异常的页面接口
export const webPageErrorData = () =>
  request<{
    quota: ResourcesErrorQuota
    resources_list: ResourcesErrorList
  }>('get', '/communal/resourceError')

export const LoadSourceMap = (url: string) => axios.get(url)
