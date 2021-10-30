export namespace UserIF {
  export type UserActionKey = 'PAGE_LOAD' | 'HTTP_LOG' | 'JS_ERROR' | 'RESOURCE' | 'OPERATION' | 'PAGE_VIEW' | 'EMPTY'

  export type UserActionType = Record<UserActionKey, (detail: UserActionDetail) => JSX.Element>

  export type UserActionQuotaType = Record<UserActionKey, (item?: UserAction) => UserActionQuota>

  export interface User {
    user_id: string
    device: string
    system: string
    browser: string
    browser_version: string
    ip: string
    address: string
    action_type: string
    happen_time: string
    device_type: string
    os: string
    os_version: string
    nation: string
    province: string
    city: string
    district: string
    session_id: string
    id?: string
  }

  export type UserList = Array<User>

  export interface UserParams {
    searchDate: string
    searchHour: string
    userId?: string
  }

  export interface UserActionStatistics {
    action_type: string
    total: number
  }

  export interface UserActionDetailBase {
    action_type: string
    device: string
    device_type: string
    os: string
    os_version: string
    browser: string
    browser_version: string
    happen_time: string
    ua: string
  }

  export type PAGE_LOAD = 'load_type'
  export type HTTP_LOG = 'http_url' | 'request_text' | 'response_text'
  export type RESOURCE = 'element_type' | 'source_url'
  export type OPERATION = 'tag_name' | 'inner_text' | 'class_name'

  export type UserActionDetail = Readonly<
    Record<'status', number> &
      Record<PAGE_LOAD | HTTP_LOG | 'page_url' | 'message' | RESOURCE | OPERATION, string> &
      UserActionDetailBase
  >

  export interface UserAction {
    action_type: string
    // js 异常
    message?: string

    session_id?: string

    action_detail: string | any

    // 资源异常
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

  export interface UserActionQuota {
    icon: React.ReactNode
    title: string
    content: string
  }
}
