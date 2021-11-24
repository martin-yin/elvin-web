import { Injectable } from '../decorator'
import { IProjectService, ProjectService } from '../services/projectService'

@Injectable([ProjectService])
export class ProjectInteractor {
  constructor(private projectSerivce: IProjectService) {}

  public async getProject() {
    return await this.projectSerivce.getProject()
  }

  public async getProjects() {
    const projects = await this.projectSerivce.getProjects()
    const monitor_id = localStorage.getItem('monitor_id') ? localStorage.getItem('monitor_id') : projects[0]?.monitor_id
    return { monitor_id, projects }
  }

  public async getHealthStatus() {
    return await this.projectSerivce.getHealthStatus()
  }
}
