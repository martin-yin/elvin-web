import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Tag, Timeline } from 'antd'
import 'echarts/theme/macarons'
import { GetUserAction, GetUserActions } from '../../request'
import webIcon from '../../assets/web_icon.png'
import requestIcon from '../../assets/request_icon.png'
import clickIcon from '../../assets/click_icon.png'
import errorIcon from '../../assets/error_icon.png'

import './index.less'
const UserBehaviorDetailPage: FC = () => {
  const [data, setData] = useState([])

  const [info, setInfo] = useState({} as any)

  const initData = useCallback(async () => {
    const { data } = await GetUserActions()
    setData(data)
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  const getWebPageUserDetailListData = async (item: any) => {
    const data = await GetUserAction(item.action_id, item.action_type)
    setInfo(data.data)
  }

  const transformTimeLineData = (item: any, key: any) => {
    if (item.action_type == 'PAGE_LOAD') {
      return (
        <Timeline.Item key={key} dot={<img src={webIcon} className="web_icon" />}>
          <div className="footprint-des" onClick={() => getWebPageUserDetailListData(item)}>
            <div className="flex">
              <div className="flex-grow-1">页面浏览</div>
              <div className="flex-grow-0 flex-item">{getTimeHM(item.happen_time)}</div>
            </div>
            <div>页面URL: {item.page_url}</div>
          </div>
        </Timeline.Item>
      )
    } else if (item.action_type == 'HTTP_LOG') {
      return (
        <Timeline.Item key={key} dot={<img src={requestIcon} className="request_icon" />}>
          <div className="footprint-des" onClick={() => getWebPageUserDetailListData(item)}>
            <div className="flex">
              <div className="flex-grow-1">发送请求</div>
              <div className="flex-grow-0 flex-item">{getTimeHM(item.happen_time)}</div>
            </div>
            <div>请求URL: {item.http_url}</div>
          </div>
        </Timeline.Item>
      )
    } else if (item.action_type == 'BEHAVIOR_INFO') {
      return (
        <Timeline.Item key={key} dot={<img src={clickIcon} className="click_icon" />}>
          <div className="footprint-des">
            <div className="flex">
              <div className="flex-grow-1">点击</div>
              <div className="flex-grow-0 flex-item">{getTimeHM(item.happen_time)}</div>
            </div>
            <div>点击内容: {item.innter_text}</div>
          </div>
        </Timeline.Item>
      )
    } else if (item.action_type == 'RESOURCE_ERROR') {
      return (
        <Timeline.Item key={key} dot={<img src={errorIcon} className="click_icon" />}>
          <div className="footprint-des">
            <div className="flex">
              <div className="flex-grow-1">资源加载错误({item.element_type})</div>
              <div className="flex-grow-0 flex-item">{getTimeHM(item.happen_time)}</div>
            </div>
            <div>资源URL: {item.source_url}</div>
          </div>
        </Timeline.Item>
      )
    } else if (item.action_type == 'JS_ERROR') {
      return (
        <Timeline.Item key={key} dot={<img src={errorIcon} className="click_icon" />}>
          <div className="footprint-des" onClick={() => getWebPageUserDetailListData(item)}>
            <div className="flex">
              <div className="flex-grow-1">JS错误({item.message})</div>
              <div className="flex-grow-0 flex-item">{getTimeHM(item.happen_time)}</div>
            </div>
            <div>错误页面: {item.page_url}</div>
          </div>
        </Timeline.Item>
      )
    }
  }

  const transformItem = () => {
    if (info?.upload_type == 'PAGE_LOAD') {
      return (
        <>
          <li>
            <label>浏览页面：</label>
            <p>{info.page_url}</p>
          </li>
          <li>
            <label>加载方式：</label>
            <p>{info.load_type}</p>
          </li>
          <li>
            <label>操作系统：</label>
            <p>{`${info.os} ${info.os_version}`}</p>
          </li>
          <li>
            <label>浏览器：</label>
            <p>{`${info.browser} ${info.browser_version}`}</p>
          </li>
          <li>
            <label>时间：</label>
            <p>{info.happen_time}</p>
          </li>
        </>
      )
    } else if (info?.upload_type == 'HTTP_LOG') {
      return (
        <>
          <li>
            <label>请求URL：</label>
            <p>{info.http_url}</p>
          </li>
          <li>
            <label>请求参数：</label>
            <p>{info.request_text}</p>
          </li>
          <li>
            <label>请求返回状态码：</label>
            <p>
              <Tag color="#2db7f5">{`${info.status}`} </Tag>
            </p>
          </li>
          <li>
            <label>请求返回：</label>
            <p>{`${info.response_text}`}</p>
          </li>
          <li>
            <label>浏览器：</label>
            <p>{`${info.browser} ${info.browser_version}`}</p>
          </li>
          <li>
            <label>时间：</label>
            <p>{info.happen_time}</p>
          </li>
        </>
      )
    } else if (info?.upload_type == 'JS_ERROR') {
      return (
        <>
          <li>
            <label>页面URL：</label>
            <p>{info.page_url}</p>
          </li>
          <li>
            <label>错误信息：</label>
            <p>{info.message}</p>
          </li>
          <li>
            <label>浏览器：</label>
            <p>{`${info.browser} ${info.browser_version}`}</p>
          </li>
          <li>
            <label>时间：</label>
            <p>{info.happen_time}</p>
          </li>
          <li>
            <label>UA：</label>
            <p>{info.ua}</p>
          </li>
        </>
      )
    }
  }

  return (
    <>
      <Card title="行为记录">
        <div className=" flex">
          <div className="flex-grow-1 time-line-list-box">
            <Timeline>
              {data.map((item: any, key: any) => {
                return transformTimeLineData(item, key)
              })}
            </Timeline>
          </div>
          <div className="flex-grow-1">
            <ul className="detail-box">{transformItem()}</ul>
          </div>
        </div>
      </Card>
    </>
  )
}
function getTimeHM(time: string) {
  const nowDate = new Date(time)
  return nowDate.getHours() + ':' + nowDate.getMinutes()
}

export default UserBehaviorDetailPage
