import axios from 'axios'
import { ResourcesIF } from '../interface'

import { request } from '../utils/request'

export const getJsErrors = () => request<any>('get', '/communal/jsErrors')

export const getJsError = (param: { issue_id: number; error_id: number }) =>
  request<any>('get', `/communal/jsError`, param)

// 资源异常的页面接口
export const getStaticErr = () =>
  request<{
    quota: ResourcesIF.Quota
    resourcesList: ResourcesIF.ResourcesList
  }>('get', '/communal/staticErr')

export const LoadSourceMap = (url: string) => axios.get<any>(url)
