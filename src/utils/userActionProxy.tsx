import React from 'react'
import { UserIF } from '../interface'
import { Tag } from 'antd'
import ListLableItem from '../components/listLable/listLableItem'

const PAGE_LOAD = (detail: UserIF.UserActionDetail): JSX.Element => (
  <>
    <ListLableItem label="浏览页面：">{detail.page_url}</ListLableItem>
    <ListLableItem label="加载方式">{detail.load_type}</ListLableItem>
  </>
)

const HTTP_LOG = (detail: UserIF.UserActionDetail): JSX.Element => (
  <>
    <ListLableItem label="请求URL" spanClass="over-hidde">
      {detail.http_url}
    </ListLableItem>
    <ListLableItem label="请求参数">{detail.request_text}</ListLableItem>
    <ListLableItem label="请求返回状态码">
      {detail.status > 200 ? (
        <Tag color="#f50">{`${detail.status}`} </Tag>
      ) : (
        <Tag color="#2db7f5">{`${detail.status}`} </Tag>
      )}
    </ListLableItem>
    <ListLableItem label="请求返回">{detail.response_text}</ListLableItem>
  </>
)

const JS_ERROR = (detail: UserIF.UserActionDetail): JSX.Element => (
  <>
    <ListLableItem label="页面URL">{detail.page_url}</ListLableItem>
    <ListLableItem label="异常信息">{detail.message}</ListLableItem>
  </>
)

const RESOURCE = (detail: UserIF.UserActionDetail): JSX.Element => (
  <>
    <ListLableItem label="页面URL">{detail.page_url}</ListLableItem>
    <ListLableItem label="异常类型">{detail.element_type}</ListLableItem>
    <ListLableItem label="异常资源">{detail.source_url}</ListLableItem>
  </>
)

const OPERATION = (detail: UserIF.UserActionDetail): JSX.Element => (
  <>
    <ListLableItem label="点击Tag">{detail.tag_name}</ListLableItem>
    <ListLableItem label="点击正文">{detail.innter_text}</ListLableItem>
    <ListLableItem label="ClassName">{detail.class_name}</ListLableItem>
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
