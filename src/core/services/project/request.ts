import { ProjectIF, TeamIF } from '../../../interface'
import { request } from '../../request'

export interface IProjectService {
  getProject(): Promise<TeamIF.Project>
  getProjectList(): Promise<ProjectIF.Project[]>
}

export class ProjectService implements IProjectService {
  async getProject(): Promise<TeamIF.Project> {
    const { data, code } = await request<TeamIF.Project>('get', '/admin/project')
    if (code == 200) {
      return data
    }
    return null
  }

  async getProjectList(): Promise<ProjectIF.Project[]> {
    const { data, code } = await request<ProjectIF.Project[]>('get', '/admin/projectList')
    if (code == 200) {
      return data
    }
    return []
  }
}
