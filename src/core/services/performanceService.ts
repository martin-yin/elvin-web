import { FilterHeaderParams } from '../../components/filterHeader/hook/useFilterHeaderInit'
import { PerformanceIF } from '../../interface'
import { request } from '../../utils/request'

export interface IPerformanceService {
  getQuotaData(params: FilterHeaderParams): Promise<PerformanceIF.PerformanceQuota>
  getPerformanceStack(params: FilterHeaderParams): Promise<PerformanceIF.PerformanceStack>
  getPerformancePages(params: FilterHeaderParams): Promise<PerformanceIF.Performances>
  getPerformanceStageTime(params: FilterHeaderParams): Promise<PerformanceIF.PerformanceStageTimes>
}

export class PerformanceService implements IPerformanceService {
  async getQuotaData(params: FilterHeaderParams): Promise<PerformanceIF.PerformanceQuota> {
    const { code, data } = await request<PerformanceIF.PerformanceQuota>('get', '/communal/performanceQuota', params)
    if (code === 200) {
      return data
    }
    return null
  }
  async getPerformanceStack(params: FilterHeaderParams): Promise<PerformanceIF.PerformanceStack> {
    const { code, data } = await request<PerformanceIF.PerformanceStack>('get', '/communal/performanceStack', params)
    if (code === 200) {
      return data
    }
    return null
  }
  async getPerformancePages(params: FilterHeaderParams): Promise<PerformanceIF.Performances> {
    const { code, data } = await request<PerformanceIF.Performances>('get', '/communal/performancePages', params)
    if (code === 200) {
      return data
    }
    return null
  }
  async getPerformanceStageTime(params: FilterHeaderParams): Promise<PerformanceIF.PerformanceStageTimes> {
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
