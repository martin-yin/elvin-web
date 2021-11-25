import { InjectFactory } from '../decorator'
import { AdminInteractor } from './adminInteractor'
import { HttpInteractor } from './httpInteractor'
import { PerformanceInteractor } from './performanceInteractor'
import { ProjectInteractor } from './projectInteractor'
import { UserInteractor } from './userInteractor'

const userInteractor = InjectFactory(UserInteractor)
const projectInteractor = InjectFactory(ProjectInteractor)
const adminInteractor = InjectFactory(AdminInteractor)
const performanceInteractor = InjectFactory(PerformanceInteractor)
const httpInteractor = InjectFactory(HttpInteractor)

export { userInteractor, projectInteractor, adminInteractor, performanceInteractor, httpInteractor }
