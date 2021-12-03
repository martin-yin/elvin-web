import { notification } from 'antd'
import { ProjectIF, TeamIF } from '../../interface'
import { request } from '../../utils/request'

export interface IAdminService {
  adminLogin(params: any): Promise<any>
  registerAdmin(params: any): Promise<any>
  getTeams(): Promise<any>
  createTeam(params: any): Promise<any>
}

export class AdminService implements IAdminService {
  public async adminLogin(formData): Promise<any> {
    const { code, data, msg } = await request<any>('post', '/admin/adminLogin', formData)
    if (code == 200) {
      return data
    }
    notification['error']({
      message: msg
    })
    return null
  }

  public async registerAdmin(formData): Promise<any> {
    const { code, data, msg } = await request<{ user: any; token: string }>('post', '/admin/registerAdmin', formData)
    if (code == 200) {
      return data
    }
    notification['error']({
      message: msg
    })
    return null
  }

  public async getTeams(): Promise<any> {
    const { code, data } = await request<TeamIF.TeamLit>('get', '/admin/teams')
    if (code == 200) {
      return data
    }
    return []
  }

  public async createTeam(formData): Promise<any> {
    const { code, data } = await request<any>('post', '/admin/createTeam', formData)
    if (code == 200) {
      return data
    }
    return null
  }

  // public async createProject(formData): Promise<any> {
  //   const { code } = await request<ProjectIF.Project>('post', '/admin/createProject', formData)
  //   if (code == 200) {
  //     return code
  //   }
  //   return null
  // }
}
