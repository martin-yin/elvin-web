import { request } from '../utils/request'

export const webPageReportData = (params: any) => request<any>('get', '/communal/performance', params)

export const GetQuotaData = (params: any) => request<any>('get', '/communal/performanceQuota', params)

export const GetPerformanceStack = (params: any) => request<any>('get', '/communal/performanceStack', params)

export const GetPerformancePageList = (params: any) => request<any>('get', '/communal/performancePageList', params)

export const GetPerformanceStageTime = (params: any) => request<any>('get', '/communal/performanceStageTime', params)

export const GetPerformanceRankingList = (params: any) => request<any>('get', '/communal/performanceStack', params)
