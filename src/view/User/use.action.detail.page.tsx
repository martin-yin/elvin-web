import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Timeline } from 'antd'
import { GetUse, GetUserAction, GetUserActions } from '../../request'
import './index.less'
import ActionTimeLineItem from '../../components/UserAction/action.time.line'
import ActionDetail from '../../components/UserAction/action.detail'
import { useParams } from 'react-router-dom'
const UserActionDetailPage: FC = () => {
  const [data, setData] = useState([])
  const [detail, setDetail] = useState({} as any)
  const [activeId, setActiveId] = useState('')

  const [userInfo, setUserInfo] = useState({} as any)
  const params: any = useParams()
  const initData = useCallback(async () => {
    const userInfo: any = await GetUse(params.userId)
    console.log(userInfo)
    const { data } = await GetUserActions(userInfo.data.event_id)
    setUserInfo(userInfo.data)
    setData(data)
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
            <ul className="info-ul">
              <li>
                <label>设备名称: </label>
                <span>{`${userInfo.device} / ${userInfo.device_type}`}</span>
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
          </Card>
        </div>
        <Card title="行为记录">
          <div className=" flex">
            <div className="flex-grow-1 time-line-list-box ">
              <Timeline>
                {data.map((item: any, key: any) => {
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
              <ActionDetail detail={detail} />
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default UserActionDetailPage
