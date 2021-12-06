import { UserIF } from '../../interface'
import { Injectable } from '../decorator'
import { IUserService, UserService } from '../services/userService'

@Injectable([UserService])
export class UserInteractor {
  constructor(private userSerivce: IUserService) {}

  public async geUsers(params: UserIF.UserParams): Promise<UserIF.Users> {
    const data = await this.userSerivce.getUsers(params)
    return data
  }

  public async getUserActions(params: {
    session_id: string
    page: number
    limit: number
  }): Promise<UserIF.UserActions> {
    const data = await this.userSerivce.getUserActions(params)
    return data
  }

  public async getUserActionStatistics(params: { session_id: string }): Promise<UserIF.UserActionStatistics> {
    const data = await this.userSerivce.getUserActionStatistics(params)
    return data
  }

  public async getUser(id: string): Promise<UserIF.User> {
    const data = await this.userSerivce.getUser(id)
    return data
  }
}
