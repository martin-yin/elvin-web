import { InjectFactory } from '../decorator'
import { ProjectInteractor } from './projectInteractor'
import { UserInteractor } from './userInteractor'

const userInteractor = InjectFactory(UserInteractor)
const projectInteractor = InjectFactory(ProjectInteractor)

export { userInteractor, projectInteractor }
