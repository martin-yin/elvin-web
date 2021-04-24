export interface PerformanceParam {
  time_grain: string
  start_time: string
  end_time: string
}

export interface PerformanceQuota {
  ttfb: number
  dom_parse: number
  load_page: number
  pv: number
  fast: string
}

export interface PerformanceStack {
  redirect: number
  appcache: number
  lookup_domain: number
  tcp: number
  ttfb: number
  request: number
  dom_parse: number
  load_page: number
  load_event: number
}

export interface PerformancePageList {
  page_url: string
  ttfb: string
  dom_parse: string
  load_event: string
  load_type: string
  pv: string
}

export interface PerformanceStageTime {
  time_key: string
  pv: string
  redirect: string
  lookup_domain: string
  appcache: string
  tcp: string
  ssl_t: string
  ttfb: string
  request: string
  dom_parse: string
  load_event: string
  load_page: string
}
