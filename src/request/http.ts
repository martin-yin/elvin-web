import { HttpIF } from '../interface'
import { request } from '../utils/request'

export const GetHttpQuota = (params: any) => request<HttpIF.Quota>('get', '/communal/httpQuota', params)

export const GetHttpList = (params: any) => request<HttpIF.HttpUrlList>('get', '/communal/httpList', params)

export const GetHttpStage = (params: any) => request<HttpIF.StageTimeList>('get', '/communal/httpStage', params)
