import { ResourcesErrorList, ResourcesErrorQuota } from '../interface/error.interface'
import { HttpQuotaAndList } from '../interface/http.interface'
import { ProjectList } from '../interface/projectInterface'
import { request } from '../utils/request'

export const GetJsError = () => request<any>('get', '/communal/jsError')

export const GetProject = () => request<ProjectList>('get', '/communal/projects')

// 资源错误的页面接口
export const webPageErrorData = () =>
  request<{
    quota: ResourcesErrorQuota
    resources_list: ResourcesErrorList
  }>('get', '/communal/error')

// 获取概况页面的数据
export const GetSurveyStatistics = () => request<any>('get', '/communal/surveyStatistics')

export const GetSurveyPUvData = () => request<any>('get', '/communal/surveyPUv')

export const GetSurveyJsErrorData = () => request<any>('get', '/communal/surveyJsError')
