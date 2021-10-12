import { UserIF } from '../../interface'
import { request } from '../../utils/request'

export interface IUserService {
  getUsers(params: UserIF.UserParams): Promise<UserIF.UserList>
  getUserActions(params: any): Promise<any>
  getUser(id: string): Promise<UserIF.User>
  getUserActionsStatistics(params: any): Promise<any>
}

export class UserService implements IUserService {
  async getUsers(params: UserIF.UserParams): Promise<UserIF.UserList> {
    const { code, data } = await request<UserIF.UserList>('get', '/communal/userList', params)
    if (code == 200) {
      return data
    }
  }

  async getUserActions(params: any): Promise<any> {
    const { code, data } = await request<UserIF.UserList>('get', '/communal/usersActionList', params)
    if (code == 200) {
      return data
    }
    return []
  }

  async getUser(id: string): Promise<UserIF.User> {
    const { data, code } = await request<UserIF.User>('get', `/communal/user?id=${id}`)
    if (code === 200) {
      return data
    }
    return null
  }

  async getUserActionsStatistics(params: any): Promise<any> {
    const { data, code } = await request<any>('get', '/communal/usersActionsStatistics', params)
    if (code === 200) {
      return data
    }
    return null
  }
}
