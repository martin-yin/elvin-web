import { message } from 'antd'
import { AdminIF, TeamIF } from '../../interface'
import { request } from '../../utils/request'

export interface IAdminService {
  adminLogin(params: AdminIF.LoginParam): Promise<AdminIF.LoginRes>
  registerAdmin(params: AdminIF.RegisterParam): Promise<AdminIF.LoginRes>
  getTeams(): Promise<TeamIF.Teams>
  createTeam(params: { name: string }): Promise<number>
  createProject(params: AdminIF.CreateProject): Promise<number>
}

export class AdminService implements IAdminService {
  public async adminLogin(params: AdminIF.LoginParam): Promise<AdminIF.LoginRes> {
    const { code, data, msg } = await request<AdminIF.LoginRes>('post', '/admin/adminLogin', params)
    if (code == 200) {
      return data
    }
    message.error(msg)
    return null
  }

  public async registerAdmin(params: AdminIF.RegisterParam): Promise<AdminIF.LoginRes> {
    const { code, data, msg } = await request<AdminIF.LoginRes>('post', '/admin/registerAdmin', params)
    if (code == 200) {
      return data
    }
    message.error(msg)
    return null
  }

  public async getTeams(): Promise<TeamIF.Teams> {
    const { code, data } = await request<TeamIF.Teams>('get', '/admin/teams')
    if (code === 200) {
      return data
    }
    return []
  }

  public async createTeam(params: { name: string }): Promise<number> {
    const { code, msg } = await request('post', '/admin/createTeam', params)
    if (code === 200) {
      return code
    }
    message.error(msg)
    return null
  }

  public async createProject(params: AdminIF.CreateProject): Promise<number> {
    const { code, msg } = await request('post', '/admin/createProject', params)
    if (code == 200) {
      return code
    }
    message.error(msg)
    return null
  }
}
