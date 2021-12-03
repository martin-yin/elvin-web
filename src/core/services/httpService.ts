import { HttpIF } from '../../interface'
import { request } from '../../utils/request'

export interface IHttpService {
  getHttpQuota(params: HttpIF.HttpParams): Promise<HttpIF.Quota>
  getHttps(params: HttpIF.HttpParams): Promise<HttpIF.Https>
  getHttpErrors(params: HttpIF.HttpParams): Promise<HttpIF.Https>
  getHttpStage(params: HttpIF.HttpParams): Promise<HttpIF.HttpStageTimes>
}

export class HttpService implements IHttpService {
  async getHttpQuota(params: HttpIF.HttpParams): Promise<HttpIF.Quota> {
    const { code, data } = await request<HttpIF.Quota>('get', '/communal/httpQuota', params)
    if (code === 200) {
      return data
    }
    return null
  }

  async getHttps(params: HttpIF.HttpParams): Promise<HttpIF.Https> {
    const { code, data } = await request<HttpIF.Https>('get', '/communal/https', params)
    if (code === 200) {
      return data
    }
    return null
  }

  async getHttpErrors(params: HttpIF.HttpParams): Promise<HttpIF.Https> {
    const { code, data } = await request<HttpIF.Https>('get', '/communal/httpErrors', params)
    if (code === 200) {
      return data
    }
    return null
  }

  async getHttpStage(params: HttpIF.HttpParams): Promise<HttpIF.HttpStageTimes> {
    const { code, data } = await request<HttpIF.HttpStageTimes>('get', '/communal/httpStage', params)
    if (code === 200) {
      return data
    }
    return null
  }
}
