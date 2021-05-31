import { UserIF } from '../interface'
import React from 'react'
import {
  PageOperationIcon,
  PageLoadIcon,
  PageNetworkIcon,
  PageViewIcon,
  PageResourceIcon,
  PageJsErrorIcon
} from '../assets'

const EMPTY = (): UserIF.UserActionQuota => {
  return {
    icon: (): React.ReactNode => {
      return <></>
    },
    title: '',
    content: ``
  }
}

const UserActionQuotaRender = (img: string, title: string, content: string): UserIF.UserActionQuota => {
  return {
    icon: (): React.ReactNode => {
      return <img className="action_time_line_image" src={img} />
    },
    title,
    content
  }
}

export const UserActionQuotaList = {
  PAGE_LOAD: (item: UserIF.UserAction) =>
    UserActionQuotaRender(PageLoadIcon, '页面浏览', `页面URL: ${item.action_detail.page_url}`),
  HTTP_LOG: (item: UserIF.UserAction) =>
    UserActionQuotaRender(PageNetworkIcon, 'HTTP请求', `请求URL: ${item.action_detail.http_url}`),
  JS_ERROR: (item: UserIF.UserAction) =>
    UserActionQuotaRender(
      PageJsErrorIcon,
      `异常信息 ${item.action_detail.message}`,
      `异常页面: ${item.action_detail.page_url}`
    ),
  RESOURCE: (item: UserIF.UserAction) =>
    UserActionQuotaRender(
      PageResourceIcon,
      `资源加载异常${item.action_detail.element_type}`,
      `资源URL: ${item.action_detail.source_url}`
    ),
  OPERATION: (item: UserIF.UserAction) =>
    UserActionQuotaRender(PageOperationIcon, '点击事件', `页面URL: ${item.action_detail.page_url}`),
  PAGE_VIEW: (item: UserIF.UserAction) =>
    UserActionQuotaRender(PageViewIcon, '页面浏览', `页面URL: ${item.action_detail.page_url}`),
  EMPTY
}
export const UserActionQuotaListProxy = new Proxy(UserActionQuotaList, {
  get(target, phrase: string) {
    if (phrase in target) {
      return Reflect.get(target, phrase)
    } else {
      return Reflect.get(target, 'EMPTY')
    }
  }
})
