import axios from 'axios'
import { FilterHeaderParams } from '../components/filterHeader/hook/useFilterHeaderInit'
import { ResourcesIF } from '../interface'
import { JsErrIF } from '../interface/jsErr.interface'

import { request } from '../utils/request'

export const getJsErrors = (param: FilterHeaderParams) => request<JsErrIF.JsErrs>('get', '/communal/jsErrors', param)

export const getJsError = (param: { issue_id: number; error_id: number }) =>
  request<any>('get', `/communal/jsError`, param)

export const delProject = id => request<any>('get', `/admin/delProject?id=${id}`)

export const delTeam = id => request<any>('get', `/admin/delTeam?id=${id}`)

// 资源异常的页面接口
export const getStaticErr = () =>
  request<{
    quota: ResourcesIF.Quota
    resources_list: ResourcesIF.ResourcesList
  }>('get', '/communal/staticErr')

export const LoadSourceMap = (url: string) => axios.get<any>(url)
