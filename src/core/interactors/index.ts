import { InjectFactory } from '../decorator'
import { AdminInteractor } from './adminInteractor'
import { ProjectInteractor } from './projectInteractor'
import { UserInteractor } from './userInteractor'

const userInteractor = InjectFactory(UserInteractor)
const projectInteractor = InjectFactory(ProjectInteractor)
const adminInteractor = InjectFactory(AdminInteractor)

export { userInteractor, projectInteractor, adminInteractor }
