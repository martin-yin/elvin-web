export namespace JsErrIF {
  export interface JsErr {
    id: string
    page_url: string
    error_name: string
    message: string
    total: string
    today: string
    error_user: string
    last_time: string
    first_time: string
  }

  export type JsErrs = Array<JsErr>

  export interface StackFrames {
    columnNumber: number
    fileName: string
    functionName: string
    lineNumber: number
    source: string
    originSource: OriginSource
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
