import { TeamIF } from '../interface'
import { ProjectIF } from '../interface/projectInterface'
import { request } from '../utils/request'

export const AdminLogin = (data: any) => request<any>('post', '/admin/adminLogin', data)

export const RegisterAdmin = (data: any) => request<any>('post', '/admin/registerAdmin', data)

// 获取团队列表
export const GetTeamList = () => request<TeamIF.TeamLit>('get', '/admin/teamList')

// 创建团队
export const CreateTeam = (data: any) => request<any>('post', '/admin/createTeam', data)

// 根据团队创建项目
export const CreateProject = (data: any) => request<ProjectIF.Project>('post', '/admin/createProject', data)

export const GetProjectList = () => request<ProjectIF.ProjectList>('get', '/admin/projectList')

export const GetProjectHealthy = (param: { monitor_id: string }) =>
  request<TeamIF.ProjectHealthyList>('get', '/communal/projectHealthy', param)

export const GetProject = () => request<TeamIF.Project>('get', '/admin/project')

export const DelProject = (id: number) => request('get', `/admin/delProject?id=${id}`)
