import { UserIF } from '../../interface'
import { request } from '../../utils/request'

export interface IUserService {
  getUsers(params: UserIF.UserParams): Promise<UserIF.UserList>
  getUserActions(params: { session_id: string; page: number; limit: number }): Promise<UserIF.UserActionList>
  getUser(id: string): Promise<UserIF.User>
  getUserActionStatistics<T>(params: { session_id: string }): Promise<T>
}

export class UserService implements IUserService {
  async getUsers(params: UserIF.UserParams): Promise<UserIF.UserList> {
    const { code, data } = await request<UserIF.UserList>('get', '/communal/userList', params)
    if (code == 200) {
      return data
    }
    return []
  }

  async getUserActions(params: { session_id: string; page: number; limit: number }): Promise<UserIF.UserActionList> {
    const { code, data } = await request<{
      total: number
      user_actions_list: UserIF.UserList
    }>('get', '/communal/usersActionList', params)
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

  async getUserActionStatistics<T>(params: { session_id: string }): Promise<T> {
    const { data, code } = await request<T>('get', '/communal/usersActionsStatistics', params)
    if (code === 200) {
      return data
    }
    return null
  }
}
