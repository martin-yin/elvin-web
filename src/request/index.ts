import { request } from '../utils/request'

export const webPageReportData = () => request<any>('get', '/communal/performance')

export const webPageHttpData = () => request<any>('get', '/communal/http')

export const webPageErrorData = () => request<any>('get', '/communal/error')

export const GetUsers = () => request<any>('get', '/communal/users')

export const GetUserActions = () => request<any>('get', '/communal/userActions')

export const GetUserAction = (action_id: string, action_type: string) =>
  request<any>('get', `/communal/userAction?action_id=${action_id}&action_type=${action_type}`)

export const GetJsError = () => request<any>('get', '/communal/jsError')
