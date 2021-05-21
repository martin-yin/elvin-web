export namespace HttpIF {
  export interface Quota {
    error_user: number
    load_time: number
    success_total: number
    total: number
    success_rate: string
  }

  export interface HttpUrl {
    http_url: string
    user_total: number
    load_time: number
    total: number
  }

  export type HttpUrlList = Array<HttpUrl>

  export interface StageTime {
    time_key: string
    load_time: number
    total: number
  }

  export type StageTimeList = Array<StageTime>
}
