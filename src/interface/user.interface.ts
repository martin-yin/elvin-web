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
