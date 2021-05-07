export interface Project {
    admin_id: string
    created_at: string
    id: number
    logo: string
    monitor_id: string
    project_name:string
    project_type: string
    team_id: number
    updated_at: string
}

export type ProjectList = Array<Project>