import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Timeline } from 'antd'
import 'echarts/theme/macarons'
import { GetUserAction, GetUserActions } from '../../request'

import './index.less'
import ActionTimeLineItem from '../../components/UserAction/action.time.line'
import ActionDetail from '../../components/UserAction/action.detail'
const UserBehaviorDetailPage: FC = () => {
  const [data, setData] = useState([])

  const [detail, setDetail] = useState({} as any)

  const [activeId, setActiveId] = useState('')

  const initData = useCallback(async () => {
    const { data } = await GetUserActions()
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
