import { TeamIF } from '../../interface'
import { request } from '../../utils/request'

export interface IProjectService {
  getProject(): Promise<TeamIF.Project>
  getProjects(): Promise<TeamIF.Projects>
  createProject(project): Promise<TeamIF.Project>
  getHealthStatus(): Promise<TeamIF.ProjectHealthys>
  delProject(id: number): Promise<string>
}

export class ProjectService implements IProjectService {
  async getProject(): Promise<TeamIF.Project> {
    const { data, code } = await request<TeamIF.Project>('get', '/admin/project')

    if (code === 200) {
      return data
    }
    return null
  }

  async getProjects(): Promise<TeamIF.Projects> {
    const { data, code } = await request<TeamIF.Projects>('get', '/admin/projects')
    if (code === 200) {
      return data
    }
    return []
  }

  async createProject(project): Promise<TeamIF.Project> {
    const { data, code } = await request<TeamIF.Project>('post', '/admin/createProject', project)
    if (code === 200) {
      return data
    }
    return null
  }

  async getHealthStatus(): Promise<TeamIF.ProjectHealthys> {
    const { data, code } = await request<TeamIF.ProjectHealthys>('get', '/communal/getHealthStatus')
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
