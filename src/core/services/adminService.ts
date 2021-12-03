import { notification } from 'antd'
import { AdminIF, ProjectIF, TeamIF } from '../../interface'
import { request } from '../../utils/request'

export interface IAdminService {
  adminLogin(params: AdminIF.LoginParam): Promise<AdminIF.LoginRes>
  registerAdmin(params: AdminIF.RegisterParam): Promise<any>
  getTeams(): Promise<any>
  createTeam(params: any): Promise<any>
  createProject(params: any): Promise<any>
}

export class AdminService implements IAdminService {
  public async adminLogin(params: AdminIF.LoginParam): Promise<AdminIF.LoginRes> {
    const { code, data, msg } = await request<AdminIF.LoginRes>('post', '/admin/adminLogin', params)
    if (code == 200) {
      return data
    }
    notification['error']({
      message: msg
    })
    return null
  }

  public async registerAdmin(params: AdminIF.RegisterParam): Promise<AdminIF.LoginRes> {
    const { code, data, msg } = await request<AdminIF.LoginRes>('post', '/admin/registerAdmin', params)
    if (code == 200) {
      return data
    }
    notification['error']({
      message: msg
    })
    return null
  }

  public async getTeams(): Promise<TeamIF.Teams> {
    const { code, data } = await request<TeamIF.Teams>('get', '/admin/teams')
    if (code == 200) {
      return data
    }
    return []
  }

  public async createTeam(params): Promise<any> {
    const { code, data } = await request<any>('post', '/admin/createTeam', params)
    if (code == 200) {
      return data
    }
    return null
  }

  public async createProject(params): Promise<number> {
    const { code } = await request<ProjectIF.Project>('post', '/admin/createProject', params)
    if (code == 200) {
      return code
    }
    return null
  }
}
