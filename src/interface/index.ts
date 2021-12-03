import React, { ComponentType } from 'react'
export * from './resource.interface'
export * from './http.interface'
export * from './performance.interface'
export * from './team.interface'
export * from './user.interface'
export * from './admin.interface'

export interface Menu {
  title: string
  path?: string
  children?: Array<Record<'title' | 'path', string>>
}

export type Menus = Array<Menu>

export type QuotaTitleUnitKey = Record<'title' | 'key' | 'unit', string>

export type QuotaTitleUnitKeys = Array<QuotaTitleUnitKey>

export type RouteWrapperProps = {
  element: React.LazyExoticComponent<ComponentType<any>>
}
