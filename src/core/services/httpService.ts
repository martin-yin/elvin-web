import { HttpIF } from '../../interface'
import { request } from '../../utils/request'

export interface IHttpService {
  getHttpQuota(params: any): Promise<HttpIF.Quota>
  getHttpList(params: any): Promise<HttpIF.HttpUrlList>
  getHttpErrorList(params: any): Promise<HttpIF.HttpUrlList>
  getHttpStage(params: any): Promise<HttpIF.StageTimeList>
}

export class HttpService implements IHttpService {
  async getHttpQuota(params: any): Promise<HttpIF.Quota> {
    const { code, data } = await request<HttpIF.Quota>('get', '/communal/httpQuota', params)
    if (code === 200) {
      return data
    }
    return null
  }

  async getHttpList(params: any): Promise<HttpIF.HttpUrlList> {
    const { code, data } = await request<HttpIF.HttpUrlList>('get', '/communal/httpList', params)
    if (code === 200) {
      return data
    }
    return null
  }

  async getHttpErrorList(params: any): Promise<HttpIF.HttpUrlList> {
    const { code, data } = await request<HttpIF.HttpUrlList>('get', '/communal/httpErrorList', params)
    if (code === 200) {
      return data
    }
    return null
  }

  async getHttpStage(params: any): Promise<HttpIF.StageTimeList> {
    const { code, data } = await request<HttpIF.StageTimeList>('get', '/communal/httpStage', params)
    if (code === 200) {
      return data
    }
    return null
  }
}
