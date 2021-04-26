export interface HttpQuota {
  error_user: number
  load_time: number
  success_total: number
  total: number
  success_rate: string
}

export interface HttpUrlList {
  http_url: string
  user_total: number
  load_time: number
  total: number
}

export interface HttpQuotaAndList {
  http_quota: HttpQuota
  http_list: Array<HttpUrlList>
}

export interface HttpStageTime {
  time_key: string
  load_time: number
  total: number
}

export type HttpStageTimeList = Array<HttpStageTime>
