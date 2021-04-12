import { request } from '../utils/request'

export const webPageReportData = (params: any) => request<any>('get', '/communal/performance', params)

export const httpData = (params: any) => request<any>('get', '/communal/http', params)

export const httpStageData = (params: any) => request<any>('get', '/communal/httpStage', params)

export const webPageErrorData = () => request<any>('get', '/communal/error')

export const GetUsers = (params: any) => request<any>('get', '/communal/users', params)

export const GetUserActions = (event_id: string) => request<any>('get', `/communal/userActions?event_id=${event_id}`)

export const GetUse = (id: string) => request<any>('get', `/communal/user?id=${id}`)

export const GetUserAction = (action_id: string, action_type: string) =>
  request<any>('get', `/communal/userAction?action_id=${action_id}&action_type=${action_type}`)

export const GetJsError = () => request<any>('get', '/communal/jsError')
