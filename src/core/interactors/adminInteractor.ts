import { AdminIF, TeamIF } from '../../interface'
import { Injectable } from '../decorator'
import { AdminService, IAdminService } from '../services/adminService'

@Injectable([AdminService])
export class AdminInteractor {
  constructor(private adminService: IAdminService) {}

  public async adminLogin(params: AdminIF.LoginParam) {
    const data = await this.adminService.adminLogin(params)
    return data
  }

  public async registerAdmin(params: AdminIF.RegisterParam) {
    const data = await this.adminService.registerAdmin(params)
    return data
  }

  public async getTeams() {
    const data = await this.adminService.getTeams()
    return data
  }

  public async createTeam(params) {
    const data = await this.adminService.createTeam(params)
    return data
  }

  public async createProject(params: AdminIF.CreateProject) {
    const data = await this.adminService.createProject(params)
    return data
  }
}
