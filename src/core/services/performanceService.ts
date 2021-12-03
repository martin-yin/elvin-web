import { PerformanceIF } from '../../interface'
import { request } from '../../utils/request'

export interface IPerformanceService {
  getQuotaData(params: PerformanceIF.PerformanceParams): Promise<PerformanceIF.PerformanceQuota>
  getPerformanceStack(params: PerformanceIF.PerformanceParams): Promise<PerformanceIF.PerformanceStack>
  getPerformancePages(params: PerformanceIF.PerformanceParams): Promise<PerformanceIF.Performances>
  getPerformanceStageTime(params: PerformanceIF.PerformanceParams): Promise<PerformanceIF.PerformanceStageTimes>
}

export class PerformanceService implements IPerformanceService {
  async getQuotaData(params: PerformanceIF.PerformanceParams): Promise<PerformanceIF.PerformanceQuota> {
    const { code, data } = await request<PerformanceIF.PerformanceQuota>('get', '/communal/performanceQuota', params)
    if (code === 200) {
      return data
    }
    return null
  }
  async getPerformanceStack(params: PerformanceIF.PerformanceParams): Promise<PerformanceIF.PerformanceStack> {
    const { code, data } = await request<PerformanceIF.PerformanceStack>('get', '/communal/performanceStack', params)
    if (code === 200) {
      return data
    }
    return null
  }
  async getPerformancePages(params: PerformanceIF.PerformanceParams): Promise<PerformanceIF.Performances> {
    const { code, data } = await request<PerformanceIF.Performances>('get', '/communal/performancePages', params)
    if (code === 200) {
      return data
    }
    return null
  }
  async getPerformanceStageTime(params: PerformanceIF.PerformanceParams): Promise<PerformanceIF.PerformanceStageTimes> {
    const { code, data } = await request<PerformanceIF.PerformanceStageTimes>(
      'get',
      '/communal/performanceStageTime',
      params
    )
    if (code === 200) {
      return data
    }
    return null
  }
}
