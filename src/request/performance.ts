import { request } from '../utils/request'

export const webPageReportData = (params: any) => request<any>('get', '/communal/performance', params)
