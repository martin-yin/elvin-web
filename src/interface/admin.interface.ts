export namespace AdminIF {
  export interface LoginParam {
    user_name: string
    password: string
  }

  export interface RegisterParam extends LoginParam {
    nick_name: string
  }
  export interface LoginRes {
    token: string
    user: {
      created_at: string
      email: string
      id: number
      nick_name: string
      password: string
      updated_at: string
      user_name: string
    }
  }

  export type CreateProject = Record<'project_name', string> & Record<'team_id', string>
}
