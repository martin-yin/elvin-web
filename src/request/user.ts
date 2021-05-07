import { User, UserList, UserParams } from '../interface/user.interface'
import { request } from '../utils/request'

export const GetUserList = (params: UserParams) => request<UserList>('get', '/communal/users', params)

export const GetUserActions = (params: any) => request<any>('get', `/communal/userActions`, params)

export const GetUse = (id: string) => request<User>('get', `/communal/user?id=${id}`)

export const GetUserAction = (action_id: string, action_type: string) =>
  request<any>('get', `/communal/userAction?action_id=${action_id}&action_type=${action_type}`)

export const GetUserActionList = (params: any) => request<any>('get', '/communal/usersActionList', params)

export const GetUsersActionsStatistics = (params: any) =>
  request<any>('get', '/communal/usersActionsStatistics', params)
