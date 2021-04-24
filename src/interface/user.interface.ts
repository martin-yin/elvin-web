export interface User {
  user_id: string
  device: string
  system: string
  browser: string
  browser_version: string
  ip: string
  address: string
  happen_time: string
  device_type: string
  os: string
  os_version: string
  nation: string
  province: string
  city: string
  district: string
  event_id: string
}

export type UserList = Array<User>

export interface UserParams {
  search_date: string
  search_hour: string
  user_id?: string
}

export interface UserActionStatistics {
  action_type: string
  total: number
}

export interface UserActionDetail {
  action_type: string
  device: string
  device_type: string
  os: string
  os_version: string
  browser: string
  browser_version: string
  happen_time: string
  ua: string
  page_url: string
  // 点击事件
  tag_name?: string
  innter_text?: string
  class_name?: string
  // 资源错误
  element_type?: string
  source_url?: string
  // js 错误
  message?: string
  // http请求
  http_url?: string
  request_text?: string
  status: number
  response_text?: string
  // 页面加载
  load_type?: string
}

export interface UserAction {
  action_type: string
  // js 错误
  message?: string
  // 资源错误
  element_type?: string
  source_url?: string
  // 点击事件
  innter_text?: string
  // http请求
  http_url?: string
  // 页面加载
  page_url?: string
  action_id?: string
  happen_time: string
}
