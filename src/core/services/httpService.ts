import { FilterHeaderParams } from '../../components/filterHeader/hook/useFilterHeaderInit'
import { HttpIF } from '../../interface'
import { request } from '../../utils/request'

export interface IHttpService {
  getHttpQuota(params: FilterHeaderParams): Promise<HttpIF.Quota>
  getHttps(params: FilterHeaderParams): Promise<HttpIF.Https>
  getHttpErrors(params: FilterHeaderParams): Promise<HttpIF.Https>
  getHttpStage(params: FilterHeaderParams): Promise<HttpIF.HttpStageTimes>
}

export class HttpService implements IHttpService {
  async getHttpQuota(params: FilterHeaderParams): Promise<HttpIF.Quota> {
    const { code, data } = await request<HttpIF.Quota>('get', '/communal/httpQuota', params)
    if (code === 200) {
      return data
    }
    return null
  }

  async getHttps(params: FilterHeaderParams): Promise<HttpIF.Https> {
    const { code, data } = await request<HttpIF.Https>('get', '/communal/https', params)
    if (code === 200) {
      return data
    }
    return null
  }

  async getHttpErrors(params: FilterHeaderParams): Promise<HttpIF.Https> {
    const { code, data } = await request<HttpIF.Https>('get', '/communal/httpErrors', params)
    if (code === 200) {
      return data
    }
    return null
  }

  async getHttpStage(params: FilterHeaderParams): Promise<HttpIF.HttpStageTimes> {
    const { code, data } = await request<HttpIF.HttpStageTimes>('get', '/communal/httpStage', params)
    if (code === 200) {
      return data
    }
    return null
  }
}
