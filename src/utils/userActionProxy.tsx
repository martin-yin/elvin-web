import React from 'react'
import { UserIF } from '../interface'
import { Tag } from 'antd'

const PAGE_LOAD = (detail: UserIF.UserActionDetail): JSX.Element => {
  return (
    <>
      <li>
        <label>浏览页面：</label>
        <span>{detail.page_url}</span>
      </li>
      <li>
        <label>加载方式：</label>
        <span>{detail.load_type}</span>
      </li>
    </>
  )
}

const HTTP_LOG = (detail: UserIF.UserActionDetail): JSX.Element => {
  return (
    <>
      <li>
        <label>请求URL：</label>
        <span className="over-hidde">{detail.http_url}</span>
      </li>
      <li>
        <label>请求参数：</label>
        <span>{detail.request_text}</span>
      </li>
      <li>
        <label>请求返回状态码：</label>
        <span>
          {detail.status > 200 ? (
            <Tag color="#f50">{`${detail.status}`} </Tag>
          ) : (
            <Tag color="#2db7f5">{`${detail.status}`} </Tag>
          )}
        </span>
      </li>
      <li>
        <label>请求返回：</label>
        <span>{detail.response_text}</span>
      </li>
    </>
  )
}

const JS_ERROR = (detail: UserIF.UserActionDetail): JSX.Element => {
  return (
    <>
      <li>
        <label>页面URL：</label>
        <span>{detail.page_url}</span>
      </li>
      <li>
        <label>异常信息：</label>
        <span>{detail.message}</span>
      </li>
    </>
  )
}

const RESOURCE = (detail: UserIF.UserActionDetail): JSX.Element => (
  <>
    <li>
      <label>页面URL：</label>
      <span>{detail.page_url}</span>
    </li>
    <li>
      <label>异常类型：</label>
      <span>{detail.element_type}</span>
    </li>
    <li>
      <label>异常资源：</label>
      <span>{detail.source_url}</span>
    </li>
  </>
)

const OPERATION = (detail: UserIF.UserActionDetail): JSX.Element => (
  <>
    <li>
      <label>点击Tag：</label>
      <span>{detail.tag_name}</span>
    </li>
    <li>
      <label>点击正文：</label>
      <span>{detail.innter_text}</span>
    </li>
    <li>
      <label>ClassName：</label>
      <span>ClassName：{detail.class_name}</span>
    </li>
  </>
)

const PAGE_VIEW = (detail: UserIF.UserActionDetail): JSX.Element => (
  <>
    <li>
      <label>页面URL：</label>
      <span>{detail.page_url}</span>
    </li>
  </>
)

const EMPTY = () => <></>

export const userActionDetailList = {
  PAGE_LOAD,
  HTTP_LOG,
  JS_ERROR,
  RESOURCE,
  OPERATION,
  PAGE_VIEW,
  EMPTY
}
export const userActionDetailListProxy = new Proxy(userActionDetailList, {
  get(target, phrase: string) {
    if (phrase in target) {
      return Reflect.get(target, phrase)
    } else {
      return Reflect.get(target, 'EMPTY')
    }
  }
})
