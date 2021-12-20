export namespace JsErrIF {
  export interface JsErr {
    id: number
    page_url: string
    componentName: string
    message: string
    stack: string
    error_name: string
    stack_frames: string
    js_issues_id: number
    previous_error_id: number
    next_error_id: number
    user_id: string
    monitor_id: string
    action_type: string
    happen_time: number
    happen_day: string
    ip: string
    session_id: string
    device: string
    device_type: string
    os: string
    os_version: string
    browser: string
    browser_version: string
    ua: string
    nation: string
    province: string
    city: string
    district: string
    created_at: string
    total: string
    today: string
    error_user: string
    last_time: string
    first_time: string
  }

  export type JsErrs = Array<JsErr>

  export interface JsErrData {
    error_id: number
    issue_id: number
    jsErr: JsErr
    visible: boolean
    stackFrames: Array<StackFrame>
    stackFrame: Record<'url', string> & Record<'column' | 'line' | 'index', number>
  }

  export interface StackFrame {
    columnNumber: number
    fileName: string
    functionName: string
    lineNumber: number
    source: string
    originSource?: Record<'source', string> & Record<'column' | 'line', number>
  }
}
