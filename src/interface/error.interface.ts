export interface ResourcesErrorQuota {
  error_count: number
  error_page: number
  error_user: number
}

export interface ResourcesError {
  page_source_url: string
  page_url_count: string
  user_count: string
  source_count: string
  element_type: string
}

export type ResourcesErrorList = Array<ResourcesError>
