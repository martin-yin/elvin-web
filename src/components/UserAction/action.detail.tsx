import { ChromeFilled } from '@ant-design/icons'
import { Tag } from 'antd'
import React, { FC } from 'react'

interface ActionDetailProps {
  detail: any
}

const ActionDetail: FC<ActionDetailProps> = ({ detail }) => {
  console.log(detail)
  const transformationActionDetail = (detail: any) => {
    if (detail?.upload_type == 'PAGE_LOAD') {
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
    } else if (detail?.upload_type == 'HTTP_LOG') {
      return (
        <>
          <li>
            <label>请求URL：</label>
            <p>{detail.http_url}</p>
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
            <p>{`${detail.response_text}`}</p>
          </li>
        </>
      )
    } else if (detail?.upload_type == 'JS_ERROR') {
      return (
        <>
          <li>
            <label>页面URL：</label>
            <p>{detail.page_url}</p>
          </li>
          <li>
            <label>错误信息：</label>
            <p>{detail.message}</p>
          </li>
        </>
      )
    }
  }
  return (
    <>
      {Object.keys(detail).length == 0 ? (
        <></>
      ) : (
        <ul className="detail-box">
          {transformationActionDetail(detail)}
          <li>
            <label>操作系统：</label>
            <p>{`${detail.os} ${detail.os_version}`}</p>
          </li>
          <li>
            <label>浏览器：</label>
            <p>{`${detail.browser} ${detail.browser_version}`}</p>
          </li>
          <li>
            <label>时间：</label>
            <p>{detail.happen_time}</p>
          </li>
          <li>
            <label>UA：</label>
            <p>{detail.ua}</p>
          </li>
        </ul>
      )}
    </>
  )
}

export default ActionDetail
