import { Injectable } from '../decorator'
import { IPerformanceService, PerformanceService } from '../services/performanceService'

@Injectable([PerformanceService])
export class PerformanceInteractor {
  constructor(private performanceService: IPerformanceService) {}

  async getQuotaData(params) {
    return await this.performanceService.getQuotaData(params)
  }

  async getPerformanceStack(params) {
    const stack = await this.performanceService.getPerformanceStack(params)
    if (stack) {
      return [
        {
          title: '',
          value: stack.redirect,
          type: '重定向耗时(redirect)'
        },
        {
          title: '',
          value: stack.appcache,
          type: '缓存查询耗时(appcache)'
        },
        {
          title: '',
          value: stack.lookup_domain,
          type: 'DNS查询耗时(lookup_domain)'
        },
        {
          title: '',
          value: stack.tcp,
          type: 'TCP耗时(tcp)'
        },
        {
          title: '',
          value: stack.ttfb,
          type: '首字节(TTFB)'
        },
        {
          title: '',
          value: stack.request,
          type: '请求耗时(request)'
        },
        {
          title: '',
          value: stack.dom_parse,
          type: 'dom处理耗时(dom_parse)'
        },
        {
          title: '',
          value: stack.load_event,
          type: 'dom事件(load_event)'
        }
      ]
    }
    return []
  }

  async getPerformancePages(params) {
    return await this.performanceService.getPerformancePages(params)
  }

  async getPerformanceStageTime(params) {
    const data = await this.performanceService.getPerformanceStageTime(params)
    if (data) {
      const pv = []
      const timeConsumes = []
      data.map(item => {
        pv.push({
          time: item.time_key,
          value: item.pv,
          type: '采样pv'
        })
        timeConsumes.push(
          ...[
            {
              time: item.time_key,
              count: item.redirect,
              name: '重定向'
            },
            {
              time: item.time_key,
              count: item.lookup_domain,
              name: 'DNS查询耗时'
            },
            {
              time: item.time_key,
              count: item.appcache,
              name: '缓存查询耗时'
            },
            {
              time: item.time_key,
              count: item.tcp,
              name: 'TCP耗时'
            },
            {
              time: item.time_key,
              count: item.ssl_t,
              name: 'SSL连接耗时'
            },
            {
              time: item.time_key,
              count: item.ttfb,
              name: '首字节'
            },
            {
              time: item.time_key,
              count: item.request,
              name: '请求耗时'
            },
            {
              time: item.time_key,
              count: item.dom_parse,
              name: 'DOM处理'
            },
            {
              time: item.time_key,
              count: item.load_event,
              name: 'Event耗时'
            },
            {
              time: item.time_key,
              count: item.load_page,
              name: '完全加载'
            }
          ]
        )
      })
      return { pv, timeConsumes }
    }
  }
}
