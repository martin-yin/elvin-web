import { HttpQuota, HttpStageTimeList, HttpUrlList } from '../interface/http.interface'
import { request } from '../utils/request'

export const GetHttpQuota = (params: any) => request<HttpQuota>('get', '/communal/httpQuota', params)

export const GetHttpList = (params: any) => request<HttpUrlList>('get', '/communal/httpList', params)

export const GetHttpStage = (params: any) => request<HttpStageTimeList>('get', '/communal/httpStage', params)
