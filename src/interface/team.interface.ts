export namespace TeamIF {
  export interface Team {
    admin_id: string
    name: string
    id: string
    nick_name: string
    team_admins: TeamAdmins
    team_projects: TeamProjects
  }

  export type TeamAdmins = Array<Admin>

  export type TeamProjects = Array<Project>

  export interface Admin {
    email: string
    id: number
    nick_name: string
    user_name: string
  }

  export interface Project {
    admin_id?: string
    id: number
    logo?: string
    monitor_id: string
    project_name: string
    project_type?: string
    team_id: string
    created_at: string
    updated_at?: string
  }

  export type Teams = ReadonlyArray<Team>

  export type Projects = Array<Project>

  export type ProjectHealthys = Array<ProjectHealthy>

  export interface ProjectHealthy {
    http_error: number
    js_error: number
    pv: number
    resources_error: number
    uv: number
    project_name: string
    monitor_id: string
  }
}
