import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Divider, Space, Timeline } from 'antd'
import { GetUse, GetUserAction, GetUserActions } from '../../request'
import './index.less'
import ActionTimeLineItem from '../../components/userAction/action.time.line'
import { useParams } from 'react-router-dom'
import { User, UserAction } from '../../interface/user.interface'
import UserActionDetailInfo from '../../components/userAction/actionDetailInfo'

import {
  PageClickIcon,
  PageJsErrorIcon,
  PageLoadIcon,
  PageNetworkIcon,
  PageViewIcon,
  PageResoucesErrorIcon
} from '../../assets'
const UserActionDetailPage: FC = () => {
  const [userActionsList, setUserActionsList] = useState([])
  const [userActionStatistics, setUserActionStatistics] = useState([])
  const [detail, setDetail] = useState({} as any)
  const [activeId, setActiveId] = useState('')
  const [userInfo, setUserInfo] = useState<User>({
    user_id: '',
    device: '',
    system: '',
    browser: '',
    browser_version: '',
    ip: '',
    address: '',
    happen_time: '',
    device_type: '',
    os: '',
    os_version: '',
    nation: '',
    province: '',
    city: '',
    district: '',
    event_id: ''
  })
  const params: any = useParams()
  const initData = useCallback(async () => {
    const userInfo = await GetUse(params.userId)
    const { data } = await GetUserActions(userInfo.data.event_id)
    setUserInfo(userInfo.data)
    setUserActionsList(data.user_actions_list)
    setUserActionStatistics(data.user_action_statistics)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  const activeTimeLine = async (item: any) => {
    const data = await GetUserAction(item.action_id, item.action_type)
    setActiveId(`${item.action_id}${item.action_type}`)
    setDetail(data.data)
  }

  return (
    <>
      <div className="user-action-detail-page">
        <div className="page-user-info">
          <Card title="用户信息">
            <div className="user-info-ul">
              <ul className="info-ul">
                <li>
                  <label>设备名称: </label>
                  <span>{`${userInfo.device} / ${userInfo.device_type}`}</span>
                </li>
                <li>
                  <label>浏览器: </label>
                  <span>
                    {userInfo.browser}:{userInfo.browser_version}
                  </span>
                </li>
                <li>
                  <label>系统版本: </label>
                  <span>
                    {userInfo.os}: {userInfo.os_version}
                  </span>
                </li>
                <li>
                  <label>IP地址: </label>
                  <span>{userInfo.ip}</span>
                </li>
                <li>
                  <label>所在地区: </label>
                  <span>{`${userInfo.nation}${userInfo.province}${userInfo.city}${userInfo.district}`}</span>
                </li>
              </ul>
            </div>
            <div className="user-info-statistics">
              <Space split={<Divider type="vertical" />} align="center" size={60}>
                {userActionStatistics.map((item: any, key: any) => {
                  if (item.action_type == 'PAGE_LOAD') {
                    return (
                      <div key={key} className="info-statistics-item">
                        <div className="statistics-item-icon">
                          <img className="userActionIcon" src={PageLoadIcon} />
                        </div>
                        <p>{item.total} 次打开页面</p>
                      </div>
                    )
                  }
                  if (item.action_type == 'HTTP_LOG') {
                    return (
                      <div key={key} className="info-statistics-item">
                        <div className="statistics-item-icon">
                          <img className="userActionIcon" src={PageNetworkIcon} />
                        </div>
                        <p>{item.total} 网络请求</p>
                      </div>
                    )
                  }
                  if (item.action_type == 'PAGE_VIEW') {
                    return (
                      <div key={key} className="info-statistics-item">
                        <div className="statistics-item-icon">
                          <img className="userActionIcon" src={PageViewIcon} />
                        </div>
                        <p>{item.total} 次浏览页面</p>
                      </div>
                    )
                  }
                  if (item.action_type == 'BEHAVIOR_INFO') {
                    return (
                      <div key={key} className="info-statistics-item">
                        <div className="statistics-item-icon">
                          <img className="userActionIcon" src={PageClickIcon} />
                        </div>
                        <p>{item.total} 次点击事件</p>
                      </div>
                    )
                  }
                  if (item.action_type == 'RESOURCE_ERROR') {
                    return (
                      <div key={key} className="info-statistics-item">
                        <div className="statistics-item-icon">
                          <img className="userActionIcon" src={PageResoucesErrorIcon} />
                        </div>
                        <p>{item.total} 次资源异常</p>
                      </div>
                    )
                  }
                  if (item.action_type == 'JS_ERROR') {
                    return (
                      <div key={key} className="info-statistics-item">
                        <div className="statistics-item-icon">
                          <img className="userActionIcon" src={PageJsErrorIcon} />
                        </div>
                        <p>{item.total} 次JS异常</p>
                      </div>
                    )
                  }
                })}
                {/* 
                <div className="info-statistics-item">
                  <div className="statistics-item-icon">
                    <i className="icofont-ui-network"></i>
                  </div>
                  <p>0 次网络请求</p>
                </div>
                <div className="info-statistics-item">
                  <div className="statistics-item-icon">
                    <i className="icofont-warning"></i>
                  </div>
                  <p>0 次资源错误</p>
                </div>
                <div className="info-statistics-item">
                  <div className="statistics-item-icon">
                    <i className="icofont-warning"></i>
                  </div>
                  <p>0 js错误</p>
                </div>
                <div className="info-statistics-item">
                  <div className="statistics-item-icon">
                    <i className="icofont-touch"></i>
                  </div>
                  <p>0 次点击事件</p>
                </div> */}
              </Space>
            </div>
          </Card>
        </div>
        <Card title="行为记录">
          <div className=" flex">
            <div className="flex-grow-1 time-line-list-box ">
              <Timeline>
                {userActionsList.map((item: UserAction, key: number) => {
                  return (
                    <ActionTimeLineItem
                      activeId={activeId}
                      activeTimeLine={activeTimeLine}
                      key={key}
                      item={item}
                    ></ActionTimeLineItem>
                  )
                })}
              </Timeline>
            </div>
            <div className="flex-grow-1">
              <UserActionDetailInfo detail={detail} />
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default UserActionDetailPage