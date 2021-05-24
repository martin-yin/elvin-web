import { UserIF } from '../interface'
import React from 'react'
import { Tag } from 'antd'

const PAGE_LOAD = (detail: UserIF.UserActionDetail): JSX.Element => {
  return (
    <>
      <li>
        <label>浏览页面：</label>
        <p>{detail.page_url}</p>
      </li>
      <li>
        <label>加载方式：</label>
        <p>{detail.load_type}</p>
      </li>
    </>
  )
}

const HTTP_LOG = (detail: UserIF.UserActionDetail): JSX.Element => {
  return (
    <>
      <li>
        <label></label>
        <p>请求URL：</p>
        <p className="over-hidde">{detail.http_url}</p>
      </li>
      <li>
        <label>请求参数：</label>
        <p>{detail.request_text}</p>
      </li>
      <li>
        <label>请求返回状态码：</label>
        <p>
          {detail.status > 200 ? (
            <Tag color="#f50">{`${detail.status}`} </Tag>
          ) : (
            <Tag color="#2db7f5">{`${detail.status}`} </Tag>
          )}
        </p>
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
        <p>{detail.page_url}</p>
      </li>
      <li>
        <label>异常信息：</label>
        <p>{detail.message}</p>
      </li>
    </>
  )
}

const RESOURCE = (detail: UserIF.UserActionDetail): JSX.Element => (
  <>
    <li>
      <label>页面URL：</label>
      <p>{detail.page_url}</p>
    </li>
    <li>
      <label>异常类型：</label>
      <p>{detail.element_type}</p>
    </li>
    <li>
      <label>异常资源：</label>
      <p>{detail.source_url}</p>
    </li>
  </>
)

const OPERATION = (detail: UserIF.UserActionDetail): JSX.Element => (
  <>
    <li>
      <label>点击Tag：</label>
      <p>{detail.tag_name}</p>
    </li>
    <li>
      <label>点击正文：</label>
      <p>{detail.innter_text}</p>
    </li>
    <li>
      <label>ClassName：</label>
      <p>{detail.class_name}</p>
    </li>
  </>
)

const PAGE_VIEW = (detail: UserIF.UserActionDetail): JSX.Element => (
  <>
    <li>
      <label>页面URL：</label>
      <p>{detail.page_url}</p>
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
