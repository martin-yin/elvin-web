import 'reflect-metadata'

type Constructor<T = any> = new (...args: any[]) => T

/**
 * class 装饰器
 * @Injectable([serivce])
 * class Test {
 *  constructor(private testService: serivce) {}
 * }
 *
 * @param service
 * @returns
 */
export const Injectable =
  (service: Array<any>): ClassDecorator =>
  target => {
    Reflect.defineMetadata('inject:service', service, target)
  }

/**
 * 注入工厂
 * const projectInteractor = InjectFactory(ProjectInteractor)
 * @param target
 * @returns
 */
export const InjectFactory = <T>(target: Constructor<T>): T => {
  const providers = Reflect.getMetadata('inject:service', target)
  const args = providers.map((provider: Constructor) => new provider())
  return new target(...args)
}
