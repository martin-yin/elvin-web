import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Table, Space, Timeline } from 'antd'
import 'echarts/theme/macarons'
import { GetUserBehavior, GetUserBehaviors } from '../../request'
import webIcon from '../../assets/web_icon.png'
import requestIcon from '../../assets/request_icon.png'
import clickIcon from '../../assets/click_icon.png'

import errorIcon from '../../assets/error_icon.png'

import './index.less'
const UserBehaviorDetailPage: FC = () => {
  const [data, setData] = useState([])

  const [info, setInfo] = useState({} as any)

  const initData = useCallback(async () => {
    const result = await GetUserBehaviors()
    setData(result.data)
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  const getWebPageUserDetailListData = async (item: any) => {
    const data = await GetUserBehavior(item.behavior_id, item.behavior_type)
    setInfo(data.data)
  }

  const transTimeLineData = (item: any, key: any) => {
    if (item.behavior_type == 'PAGE_LOAD') {
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
    } else if (item.behavior_type == 'HTTP_LOG') {
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
    } else if (item.behavior_type == 'BEHAVIOR_INFO') {
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
    } else if (item.behavior_type == 'RESOURCE_ERROR') {
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
    }
  }

  const transItem = () => {
    if (info.upload_type == 'PAGE_LOAD') {
      console.log(111)
      return (
        <div>
          <p>事件</p>
          <p>{info.upload_type}</p>
          <p>事件内容</p>
          <p>{info.page_url}</p>
          <p>发生时间</p>
          <p>{info.happen_time}</p>
        </div>
      )
    } else {
      return (
        <div>
          <p>事件</p>
          <p>{info.upload_type}</p>
          <p>事件内容</p>
          <p>{info.http_url}</p>
          <p>发生时间</p>
          <p>{info.happen_time}</p>
        </div>
      )
    }
  }

  return (
    <>
      <div className="site-layout-content">
        <Card title="行为记录">
          <div className="flex">
            <div className="flex-grow-1">
              <Timeline>
                {data.map((item: any, key: any) => {
                  return transTimeLineData(item, key)
                })}
              </Timeline>
            </div>
            <div className="flex-grow-1">{transItem()}</div>
          </div>
        </Card>
      </div>
    </>
  )
}
function getTimeHM(time: string) {
  const nowDate = new Date(time)
  return nowDate.getHours() + ':' + nowDate.getMinutes()
}

export default UserBehaviorDetailPage
