import { request } from '../utils/request'

// 获取概况页面的数据
export const GetSurveyStatistics = () => request<any>('get', '/communal/surveyStatistics')

export const GetSurveyPUvData = () => request<any>('get', '/communal/surveyPUv')

export const GetSurveyJsErrorData = () => request<any>('get', '/communal/surveyJsError')
