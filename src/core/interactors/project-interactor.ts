import { setProjectList } from '../../stores/app.store'
import { IProjectService, ProjectService } from '../services/project/request'

class ProjectInteractor {
  constructor(private projectSerivce: IProjectService) {}

  public async getProject() {
    const data = await this.projectSerivce.getProject()
    return data
  }

  public async getProjectList(setMonitorId, dispatch) {
    const projectList = await this.projectSerivce.getProjectList()
    const monitor_id = localStorage.getItem('monitor_id')
      ? localStorage.getItem('monitor_id')
      : projectList[0]?.monitor_id
    setMonitorId(monitor_id)
    dispatch(setProjectList(projectList))
    return
  }
}

const projectInteractor = new ProjectInteractor(new ProjectService())
export default projectInteractor
