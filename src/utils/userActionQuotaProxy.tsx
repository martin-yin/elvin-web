import { UserIF } from '../interface'
import React from 'react'

import {
  PageClickIcon,
  PageLoadIcon,
  PageNetworkIcon,
  PageViewIcon,
  PageResoucesErrorIcon,
  PageJsErrorIcon
} from '../assets'

const PAGE_LOAD = (item: UserIF.UserAction): UserIF.UserActionQuota => {
  return {
    icon: (): React.ReactNode => {
      return <img className="actionTimeLineImg" src={PageLoadIcon} />
    },
    title: '打开页面',
    content: `页面URL: ${item.action_detail.page_url}`
  }
}

const HTTP_LOG = (item: UserIF.UserAction): UserIF.UserActionQuota => {
  return {
    icon: (): React.ReactNode => {
      return <img className="actionTimeLineImg" src={PageNetworkIcon} />
    },
    title: '发送请求',
    content: `请求URL: ${item.action_detail.http_url}`
  }
}

const JS_ERROR = (item: UserIF.UserAction): UserIF.UserActionQuota => {
  return {
    icon: (): React.ReactNode => {
      return <img className="actionTimeLineImg" src={PageJsErrorIcon} />
    },
    title: `异常信息${item.action_detail.message}`,
    content: `异常页面: ${item.action_detail.page_url}`
  }
}

const RESOURCE = (item: UserIF.UserAction): UserIF.UserActionQuota => {
  return {
    icon: (): React.ReactNode => {
      return <img className="actionTimeLineImg" src={PageResoucesErrorIcon} />
    },
    title: `资源加载异常${item.action_detail.element_type}`,
    content: `资源URL: ${item.action_detail.source_url}`
  }
}

const OPERATION = (item: UserIF.UserAction): UserIF.UserActionQuota => {
  return {
    icon: (): React.ReactNode => {
      return <img className="actionTimeLineImg" src={PageClickIcon} />
    },
    title: '点击事件',
    content: `点击内容: ${item.action_detail.innter_text}`
  }
}

const PAGE_VIEW = (item: UserIF.UserAction): UserIF.UserActionQuota => {
  return {
    icon: (): React.ReactNode => {
      return <img className="actionTimeLineImg" src={PageViewIcon} />
    },
    title: '页面浏览',
    content: `页面URL: ${item.action_detail.page_url}`
  }
}

const EMPTY = (): UserIF.UserActionQuota => {
  return {
    icon: (): React.ReactNode => {
      return <img className="actionTimeLineImg" src={PageViewIcon} />
    },
    title: '',
    content: ``
  }
}

export const UserActionQuotaList = {
  PAGE_LOAD,
  HTTP_LOG,
  JS_ERROR,
  RESOURCE,
  OPERATION,
  PAGE_VIEW,
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
