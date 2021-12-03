export namespace HttpIF {
  export interface Quota {
    error_user: number
    load_time: number
    success_total: number
    total: number
    success_rate: string
  }

  export interface Http {
    http_url: string
    user_total: number
    load_time: number
    total: number
  }

  export type Https = Array<Http>

  export interface HttpStageTime {
    time_key: string
    load_time: number
    total: number
  }
  export type HttpStageTimes = Array<HttpStageTime>

  export interface HttpConsumes {
    total: Array<{
      time: string
      value: number
      type: string
    }>
    timeConsumes: Array<{
      time: string
      count: number
      name: string
    }>
  }

  export type HttpParams = Record<'time_grain' | 'start_time' | 'end_time', string>
}
