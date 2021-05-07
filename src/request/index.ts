import { ResourcesErrorList, ResourcesErrorQuota } from '../interface/error.interface'
import { request } from '../utils/request'

export const GetJsError = () => request<any>('get', '/communal/jsError')

// 资源错误的页面接口
export const webPageErrorData = () =>
  request<{
    quota: ResourcesErrorQuota
    resources_list: ResourcesErrorList
  }>('get', '/communal/error')
