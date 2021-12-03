import { HttpIF } from '../interface'
import { request } from '../utils/request'

export const GetHttpQuota = (params: any) => request<HttpIF.Quota>('get', '/communal/httpQuota', params)

export const GetHttpErrorList = (params: any) => request<HttpIF.HttpUrlList>('get', '/communal/httpErrorList', params)

export const GetHttpStage = (params: any) => request<HttpIF.StageTimeList>('get', '/communal/httpStage', params)
