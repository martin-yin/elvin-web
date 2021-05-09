import { Project, ProjectHealthyList, ProjectList, TeamLit } from '../interface/team.interface'
import { request } from '../utils/request'

export const AdminLogin = (data: any) => request<any>('post', '/admin/adminLogin', data)

export const RegisterAdmin = (data: any) => request<any>('post', '/admin/registerAdmin', data)

// 获取团队列表
export const GetTeamList = () => request<TeamLit>('get', '/admin/teamList')

// 创建团队
export const CreateTeam = (data: any) => request<any>('post', '/admin/createTeam', data)

// 根据团队创建项目
export const AddTeamProject = (data: any) => request<Project>('post', '/admin/addTeamProject', data)

export const GetProjectList = () => request<ProjectList>('get', '/admin/projectList')

export const GetProjectHealthy = (param: { monitor_id: string }) =>
  request<ProjectHealthyList>('get', '/communal/projectHealthy', param)
