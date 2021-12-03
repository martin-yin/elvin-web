export namespace PerformanceIF {
  export type PerformanceParams = Record<'time_grain' | 'start_time' | 'end_time', string>

  export type PerformanceQuota = Record<'dom_parse' | 'load_page' | 'pv', number> & { fast: string }

  export type Performance = Record<'page_url' | 'ttfb' | 'dom_parse' | 'load_event' | 'load_type' | 'pv', number>

  export type Performances = Array<Performance>

  export type PerformanceStageTime = Omit<Performance, 'page_url' | 'load_type'> &
    Record<'redirect' | 'appcache' | 'lookup_domain' | 'tcp' | 'request' | 'load_page' | 'ssl_t', number> & {
      time_key: string
    }

  export type PerformanceStageTimes = Array<PerformanceStageTime>
  export type PerformanceStack = Omit<PerformanceStageTime, 'pv' | 'time_key'>
}
