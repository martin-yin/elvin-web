import { UserIF } from '../../interface'
import { request } from '../../utils/request'

export interface IUserService {
  getUsers(params: UserIF.UserParams): Promise<UserIF.Users>
  getUserActions(params: { session_id: string; page: number; limit: number }): Promise<UserIF.UserActions>
  getUser(id: string): Promise<UserIF.User>
  getUserActionStatistics(params: { session_id: string }): Promise<UserIF.UserActionStatistics>
}

export class UserService implements IUserService {
  async getUsers(params: UserIF.UserParams): Promise<UserIF.Users> {
    const { code, data } = await request<UserIF.Users>('get', '/communal/users', params)
    if (code == 200) {
      return data
    }
    return []
  }

  async getUserActions(params: { session_id: string; page: number; limit: number }): Promise<UserIF.UserActions> {
    const { code, data } = await request<{
      total: number
      user_actions_list: UserIF.Users
    }>('get', '/communal/userActions', params)
    if (code == 200) {
      return data
    }
    return null
  }

  async getUser(id: string): Promise<UserIF.User> {
    const { data, code } = await request<UserIF.User>('get', `/communal/user?id=${id}`)
    if (code === 200) {
      return data
    }
    return null
  }

  async getUserActionStatistics(params: { session_id: string }): Promise<UserIF.UserActionStatistics> {
    const { data, code } = await request<UserIF.UserActionStatistics>('get', '/communal/userActionStatistics', params)
    if (code === 200) {
      return data
    }
    return []
  }
}
