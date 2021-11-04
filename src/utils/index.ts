import React, { useEffect, useRef } from 'react'

export const getTimeYYMMDDHM = (time: string) => {
  const datetime = new Date(parseInt(time))
  const year = datetime.getFullYear(),
    month = ('0' + (datetime.getMonth() + 1)).slice(-2),
    date = ('0' + datetime.getDate()).slice(-2),
    hours = ('0' + datetime.getHours()).slice(-2),
    minutes = ('0' + datetime.getMinutes()).slice(-2)
  return `${year}-${month}-${date} ${hours}:${minutes}`
}

export const getTimeHHMM = (time: string) => {
  const datetime = new Date(parseInt(time))
  const hours = ('0' + datetime.getHours()).slice(-2),
    minutes = ('0' + datetime.getMinutes()).slice(-2)
  return ` ${hours}:${minutes}`
}

export const formatTimeByType = (time: string, type = 'fullTime') => {
  const datetime = new Date(parseInt(time))
  const year = datetime.getFullYear(),
    month = ('0' + (datetime.getMonth() + 1)).slice(-2),
    date = ('0' + datetime.getDate()).slice(-2),
    hours = ('0' + datetime.getHours()).slice(-2),
    minutes = ('0' + datetime.getMinutes()).slice(-2)
  if (type == 'fullTime') {
    return `${year}-${month}-${date} ${hours}:${minutes}`
  } else {
    return ` ${hours}:${minutes}`
  }
}

export const getTimeYYMMDD = () => {
  const datetime = new Date()
  const year = datetime.getFullYear(),
    month = ('0' + (datetime.getMonth() + 1)).slice(-2),
    date = ('0' + datetime.getDate()).slice(-2)
  return `${year}-${month}-${date}`
}

export const findKeyByMenuList = (menuList, path: string) => {
  const item = menuList.find(item => {
    if (item?.children) {
      return item.children.find(child => child.path == path)
    }
    if (item.path == path) {
      return item
    }
  })
  if (item?.children) {
    const chilld = item.children.find(child => child.path == path)
    return [chilld.path, item]
  } else {
    return item
  }
}

export type CasedProperties<T> = {
  [K in keyof T as UnderScoreCaseToCamelCase<K>]: T[K]
}

type UnderScoreCaseToCamelCase<S> = S extends `${infer StartChar}_${infer EndChar}`
  ? `${StartChar}${Uppercase<EndChar>}`
  : any

// 驼峰转换成下划线
export const toLineData = <T>(data: T): CasedProperties<T> => {
  const lineData: CasedProperties<T> = {} as any
  for (const k of Object.keys(data)) {
    const lineK = k.replace(/([A-Z])/g, '_$1').toLowerCase()
    lineData[lineK] = data[k]
  }
  return lineData
}

export const usePersistFn = <T extends (...args: any[]) => any>(fn: T) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const ref = React.useRef<Function>(() => {
    throw new Error('Cannot call function while rendering.')
  })
  ref.current = fn
  return React.useCallback(ref.current as T, [ref])
}

export const preLineStartEnd = originSource => {
  const { source, line } = originSource
  // 先获取源码有多少行
  const sourceLine = source.split('\n')
  const len = sourceLine.length - 1
  const start = line - 3 >= 0 ? line - 3 : 0
  const end = start + 5 >= len ? len : start + 5 // 最多展示6行
  return {
    start,
    end,
    sourceLine
  }
}

export const encodeHTML = (str: string): string => {
  if (!str || str.length == 0) return ''
  return str.replace(/&/g, '&#38;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\'/g, '&#39;')
}
