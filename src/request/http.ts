import { HttpQuotaAndList } from '../interface/http.interface'
import { request } from '../utils/request'

export const GetHttpError = (params: any) => request<any>('get', '/communal/http-error', params)

export const httpData = (params: any) => request<HttpQuotaAndList>('get', '/communal/http', params)

export const httpStageData = (params: any) => request<any>('get', '/communal/httpStage', params)
