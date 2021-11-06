import axios from 'axios'
import { ResourcesIF } from '../interface'

import { request } from '../utils/request'

export const GetJsError = () => request<any>('get', '/communal/issues')

export const GetIssuesDetail = (param: { issue_id: number; error_id: number }) =>
  request<any>('get', `/communal/issuesDetail`, param)

// 资源异常的页面接口
export const webPageErrorData = () =>
  request<{
    quota: ResourcesIF.Quota
    resourcesList: ResourcesIF.ResourcesList
  }>('get', '/communal/resourceError')

export const LoadSourceMap = (url: string) => axios.get<any>(url)
