import { request } from '../utils/request'

export const webPageReportData = () => request<any>('get', '/webPageReport/report')

export const webPageHttpData = () => request<any>('get', '/webPageReport/http')

export const webPageErrorData = () => request<any>('get', '/webPageReport/error')
