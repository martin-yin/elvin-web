export * from './resource.interface'
export * from './http.interface'
export * from './performance.interface'
export * from './team.interface'
export * from './user.interface'
export * from './project.interface'

export interface Menu {
  title: string
  path?: string
  children?: Array<{
    title: string
    path: string
  }>
}

export type MenuList = Array<Menu>

export interface QuotaTitleUnitKey {
  title: string
  key: string
  unit: string
}

export type QuotaTitleUnitKeyList = Array<QuotaTitleUnitKey>
