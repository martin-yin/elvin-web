import { Injectable } from '../decorator'
import { AdminService, IAdminService } from '../services/adminService'

@Injectable([AdminService])
export class AdminInteractor {
  constructor(private adminService: IAdminService) {}

  public async adminLogin(formData) {
    const data = await this.adminService.adminLogin(formData)
    return data
  }

  public async registerAdmin(formData) {
    const data = await this.adminService.registerAdmin(formData)
    return data
  }

  public async getTeams() {
    const data = await this.adminService.getTeams()
    return data
  }

  public async createTeam(formData) {
    const data = await this.adminService.createTeam(formData)
    return data
  }

  public async createProject(formData) {
    const data = await this.adminService.createProject(formData)
    return data
  }
}
