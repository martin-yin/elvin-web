import { HttpIF } from '../../interface'
import { HttpConsumes } from '../../view/http/hook/useHttp'
import { Injectable } from '../decorator'
import { HttpService, IHttpService } from '../services/httpService'

@Injectable([HttpService])
export class HttpInteractor {
  constructor(private httpService: IHttpService) {}
  async getHttpQuota(params): Promise<HttpIF.Quota> {
    const data = await this.httpService.getHttpQuota(params)
    if (data) {
      data.success_rate = ((data.success_total / data.total) * 100).toFixed(2).toString()
    }
    return data
  }

  async getHttps(params): Promise<HttpIF.HttpUrlList> {
    const data = await this.httpService.getHttps(params)
    return data
  }

  async getHttpErrors(params): Promise<HttpIF.HttpUrlList> {
    const data = await this.httpService.getHttpErrors(params)
    return data
  }

  async getHttpStage(params): Promise<HttpConsumes> {
    const data = await this.httpService.getHttpStage(params)
    if (data) {
      const total = []
      const timeConsumes = []
      data.map(item => {
        total.push({
          time: item.time_key,
          value: item.total,
          type: '请求数量'
        })
        timeConsumes.push(
          ...[
            {
              time: item.time_key,
              count: item.load_time,
              name: '请求耗时'
            }
          ]
        )
      })
      return { total, timeConsumes }
    }
  }
}
