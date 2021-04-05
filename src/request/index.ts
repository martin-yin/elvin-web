import { request } from '../utils/request'

export const webPageReportData = () => request<any>('get', '/communal/performance')

export const webPageHttpData = () => request<any>('get', '/communal/http')

export const webPageErrorData = () => request<any>('get', '/communal/error')

export const GetUserBehaviors = () => request<any>('get', '/communal/userBehaviors')

export const GetUserBehavior = (behavior_id: string, behavior_type: string) =>
  request<any>('get', `/communal/userBehavior?behavior_id=${behavior_id}&behavior_type=${behavior_type}`)
