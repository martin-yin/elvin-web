import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Timeline } from 'antd'
import 'echarts/theme/macarons'
import { GetUse, GetUserAction, GetUserActions } from '../../request'
import './index.less'
import ActionTimeLineItem from '../../components/UserAction/action.time.line'
import ActionDetail from '../../components/UserAction/action.detail'
import { useParams } from 'react-router-dom'
const UserBehaviorDetailPage: FC = () => {
  const [data, setData] = useState([])
  const [detail, setDetail] = useState({} as any)
  const [activeId, setActiveId] = useState('')

  const [userInfo, setUserInfo] = useState({} as any)
  const params: any = useParams()
  const initData = useCallback(async () => {
    const { data } = await GetUserActions()
    const userInfo = await GetUse(params.userId)
    setUserInfo(userInfo.data)
    setData(data)
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
      <Card title="用户信息">
        <ul className="detail-box">
          <li>
            <label>设备名称: </label>
            <p>{`${userInfo.device} / ${userInfo.device_type}`}</p>
          </li>
          <li>
            <label>系统版本: </label>
            <p>
              {userInfo.os}: {userInfo.os_version}
            </p>
          </li>
          <li>
            <label>IP地址: </label>
            <p>{userInfo.ip}</p>
          </li>
          <li>
            <label>所在地区: </label>
            <p></p>
          </li>
        </ul>
      </Card>
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
    </>
  )
}

export default UserBehaviorDetailPage
