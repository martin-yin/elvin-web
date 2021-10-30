import { useAppState } from '../../stores'
import { Injectable } from '../decorator'
import { IProjectService, ProjectService } from '../services/projectService'

@Injectable([ProjectService])
export class ProjectInteractor {
  constructor(private projectSerivce: IProjectService) {}

  public async getProject() {
    const data = await this.projectSerivce.getProject()
    return data
  }

  public async getProjects() {
    const projects = await this.projectSerivce.getProjects()
    const monitor_id = localStorage.getItem('monitor_id') ? localStorage.getItem('monitor_id') : projects[0]?.monitor_id
    return { monitor_id, projects }
  }

  public async getProjectHealthy(param: { monitor_id: string }) {
    const data = await this.projectSerivce.getProjectHealthy(param)
    return data
  }

  public async getProjectHealthys() {
    const projects = await this.projectSerivce.getProjects()
    const monitorIds: Array<string> = []
    projects.forEach(item => {
      monitorIds.push(item.monitor_id)
    })
    return await this.projectSerivce.getProjectHealthy({ monitor_id: monitorIds.join(',') })
  }
}
