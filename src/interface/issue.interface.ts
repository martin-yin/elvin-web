export namespace Issue {
  export interface Issue {
    action_type: string
    browser: string
    browser_version: string
    city: string
    componentName: string
    created_at: string
    device: string
    device_type: string
    district: string
    error_name: string
    session_id: string
    happen_day: string
    happen_time: number
    id: number
    ip: string
    js_issues_id: number
    message: string
    monitor_id: string
    nation: string
    next_error_id: number
    os: string
    os_version: string
    page_url: string
    previous_error_id: number
    province: string
    stack: string | any
    stack_frames: string | any
    ua: string
    user_id: string
  }

  export interface StackFrames {
    columnNumber: number
    fileName: string
    functionName: string
    lineNumber: number
    source: string
    origin_source: OriginSource
  }

  export interface OriginSource {
    column: number
    line: number
    source: string
    originSource: string
  }

  export interface LookUpRes {
    column: number
    line: number
    source: string
  }

  export type StackFramesList = Array<StackFrames>
}
