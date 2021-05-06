import { ResourcesErrorList, ResourcesErrorQuota } from '../interface/error.interface'
import { HttpQuotaAndList } from '../interface/http.interface'
import { User, UserList, UserParams } from '../interface/user.interface'
import { request } from '../utils/request'

export const webPageReportData = (params: any) => request<any>('get', '/communal/performance', params)

export const GetUse = (id: string) => request<User>('get', `/communal/user?id=${id}`)

export const GetUserAction = (action_id: string, action_type: string) =>
  request<any>('get', `/communal/userAction?action_id=${action_id}&action_type=${action_type}`)

export const GetJsError = () => request<any>('get', '/communal/jsError')

export const GetProject = () => request<any>('get', '/communal/projects')

export const GetHttpError = (params: any) => request<any>('get', '/communal/http-error', params)

// httpPage页面接口
export const httpData = (params: any) => request<HttpQuotaAndList>('get', '/communal/http', params)
export const httpStageData = (params: any) => request<any>('get', '/communal/httpStage', params)

// 用户页面接口
export const GetUserList = (params: UserParams) => request<UserList>('get', '/communal/users', params)
export const GetUserActions = (params: any) => request<any>('get', `/communal/userActions`, params)

// 资源错误的页面接口
export const webPageErrorData = () =>
  request<{
    quota: ResourcesErrorQuota
    resources_list: ResourcesErrorList
  }>('get', '/communal/error')

export const GetUserActionList = (params: any) => request<any>('get', '/communal/usersActionList', params)

export const GetUsersActionsStatistics = (params: any) =>
  request<any>('get', '/communal/usersActionsStatistics', params)

// 获取概况页面的数据
export const GetSurveyStatistics = () => request<any>('get', '/communal/surveyStatistics')

export const GetSurveyPUvData = () => request<any>('get', '/communal/surveyPUv')

export const GetSurveyJsErrorData = () => request<any>('get', '/communal/surveyJsError')

export const AdminLogin = (data: any) => request<any>('post', '/admin/adminLogin', data)

export const RegisterAdmin = (data: any) => request<any>('post', '/admin/registerAdmin', data)

// 获取团队列表
export const GetTeamList = () => request<any>('get', '/communal/teamList')

// 创建团队
export const CreateTeam = (data: any) => request<any>('post', '/communal/createTeam', data)

// 根据团队创建项目
export const AddTeamProject = (data: any) => request<any>('post', '/communal/addTeamProject', data)
