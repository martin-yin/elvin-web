import { UserIF } from '../../interface'
import { Injectable } from '../decorator'
import { IUserService, UserService } from '../services/userService'

@Injectable([UserService])
export class UserInteractor {
  constructor(private userSerivce: IUserService) {}

  public async geUsers(params: UserIF.UserParams): Promise<UserIF.UserList> {
    const data = await this.userSerivce.getUsers(params)
    return data
  }

  public async getUserActions(params: any): Promise<any> {
    const data = await this.userSerivce.getUserActions(params)
    return data
  }
}
