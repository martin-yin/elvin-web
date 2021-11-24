import { request } from '../../utils/request'

export interface IPerformanceService {
  getQuotaData(params): Promise<any>
  getPerformanceStack(params): Promise<any>
  getPerformancePageList(params): Promise<any>
  getPerformanceStageTime(params): Promise<any>
  getPerformanceRankingList(params): Promise<any>
}

export class PerformanceService implements IPerformanceService {
  async getQuotaData(params: any): Promise<any> {
    const { code, data } = await request<any>('get', '/communal/performanceQuota', params)
    if (code === 200) {
      return data
    }
    return null
  }
  async getPerformanceStack(params: any): Promise<any> {
    const { code, data } = await request<any>('get', '/communal/performanceStack', params)
    console.log(data)
    if (code === 200) {
      return data
    }
    return null
  }
  async getPerformancePageList(params: any): Promise<any> {
    const { code, data } = await request<any>('get', '/communal/performancePageList', params)
    if (code === 200) {
      return data
    }
    return null
  }
  async getPerformanceStageTime(params: any): Promise<any> {
    const { code, data } = await request<any>('get', '/communal/performanceStageTime', params)
    if (code === 200) {
      return data
    }
    return null
  }
  async getPerformanceRankingList(params: any): Promise<any> {
    const { code, data } = await request<any>('get', '/communal/performanceRankingList', params)
    if (code === 200) {
      return data
    }
    return null
  }
}
