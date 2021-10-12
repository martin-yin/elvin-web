import { UserIF } from '../../interface'
import { IUserService, UserService } from '../services/userService'

class UserInteractor {
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

const userInteractor = new UserInteractor(new UserService())
export default userInteractor
