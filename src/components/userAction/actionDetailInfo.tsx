import { Tag } from 'antd'
import React, { FC } from 'react'
import { UserActionDetail } from '../../interface/user.interface'
import { getTimeYYMMDDHM } from '../../utils'

interface UserActionDetailInfoProps {
  detail: UserActionDetail
}

const UserActionDetailInfo: FC<UserActionDetailInfoProps> = ({ detail }) => {
  const transformationActionDetail = (detail: UserActionDetail) => {
    if (detail?.action_type == 'PAGE_LOAD') {
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
    } else if (detail?.action_type == 'HTTP_LOG') {
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
    } else if (detail?.action_type == 'JS_ERROR') {
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
    } else if (detail?.action_type == 'RESOURCE_ERROR') {
      return (
        <>
          <li>
            <label>页面URL：</label>
            <p>{detail.page_url}</p>
          </li>
          <li>
            <label>错误类型：</label>
            <p>{detail.element_type}</p>
          </li>
          <li>
            <label>错误资源：</label>
            <p>{detail.source_url}</p>
          </li>
        </>
      )
    } else if (detail?.action_type == 'BEHAVIOR_INFO') {
      return (
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
    } else if (detail?.action_type == 'PAGE_VIEW') {
      return (
        <>
          <li>
            <label>页面URL：</label>
            <p>{detail.page_url}</p>
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
            <p>
              {`${detail.device}/ ${detail.device_type}`}
              &nbsp;&nbsp;&nbsp;
              {`${detail.os} ${detail.os_version}`}
            </p>
          </li>
          <li>
            <label>浏览器：</label>
            <p>{`${detail.browser} ${detail.browser_version}`}</p>
          </li>
          <li>
            <label>时间：</label>
            <p>{getTimeYYMMDDHM(detail.happen_time)}</p>
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

export default UserActionDetailInfo
