import { ProjectIF, TeamIF } from '../../interface'
import { request } from '../../utils/request'

export interface IProjectService {
  getProject(): Promise<TeamIF.Project>
  getProjects(): Promise<ProjectIF.Project[]>
  createProject(project): Promise<ProjectIF.Project>
  getHealthStatus(): Promise<TeamIF.ProjectHealthyList>
  delProject(id: number): Promise<string>
}

export class ProjectService implements IProjectService {
  async getProject(): Promise<TeamIF.Project> {
    const { data, code } = await request<TeamIF.Project>('get', '/admin/project')
    if (code == 200) {
      return data
    }
    return null
  }

  async getProjects(): Promise<ProjectIF.Projects> {
    const { data, code } = await request<ProjectIF.Projects>('get', '/admin/projectList')
    if (code == 200) {
      return data
    }
    return []
  }

  async createProject(project): Promise<ProjectIF.Project> {
    const { data, code } = await request<ProjectIF.Project>('post', '/admin/createProject', project)
    if (code === 200) {
      return data
    }
    return null
  }

  async getHealthStatus(): Promise<TeamIF.ProjectHealthyList> {
    const { data, code } = await request<TeamIF.ProjectHealthyList>('get', '/communal/getHealthStatus')
    if (code === 200) {
      return data
    }
    return []
  }

  async delProject(id: number): Promise<string> {
    const { code, msg } = await request('get', `/admin/delProject?id=${id}`)
    if (code === 200) {
      return msg
    }
    return msg
  }
}
