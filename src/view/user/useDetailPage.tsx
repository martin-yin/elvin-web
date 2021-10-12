import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Divider, Pagination, Space, Timeline } from 'antd'
import './index.less'
import { useParams } from 'react-router-dom'
import { UserIF } from '../../interface'
import ActionTimeLineItem from '../../components/userAction/actionTimeLine'
import UserActionDetailInfo from '../../components/userAction/actionDetailInfo'
import {
  PageOperationIcon,
  PageJsErrorIcon,
  PageLoadIcon,
  PageNetworkIcon,
  PageViewIcon,
  PageResourceIcon
} from '../../assets'
import { GetUse, GetUsersActionsStatistics } from '../../request/user'
import { ListLable, ListLableItem } from '../../components/listLable/listLable'
import userInteractor from '../../core/interactors/userInteractor copy'

const USERACTIONICON: {
  [key: string]: { icon: string; text: string }
} = {
  PAGE_LOAD: { icon: PageLoadIcon, text: '次打开页面' },
  HTTP_LOG: { icon: PageNetworkIcon, text: '次网络请求' },
  PAGE_VIEW: { icon: PageViewIcon, text: '次浏览页面' },
  OPERATION: { icon: PageOperationIcon, text: '次点击事件' },
  RESOURCE: { icon: PageResourceIcon, text: '次资源异常' },
  JS_ERROR: { icon: PageJsErrorIcon, text: '次JS异常' }
}

const UserActionPage: FC = () => {
  const [userActionsList, setUserActionsList] = useState({
    total: 0,
    list: []
  })
  const [userActionStatistics, setUserActionStatistics] = useState([])
  const [detail, setDetail] = useState({} as any)
  const [activeId, setActiveId] = useState('')
  const [userInfo, setUserInfo] = useState<UserIF.User>()
  const params = useParams<'user_id' | 'session_id'>()
  const initUserInfoData = useCallback(async () => {
    const userInfores = await GetUse(params.user_id)
    const usersActionsStatistics = await GetUsersActionsStatistics({
      session_id: params.session_id
    })
    setUserInfo(userInfores.data)
    setUserActionStatistics(usersActionsStatistics.data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initUserActionList = useCallback(async page => {
    const userActionList = await userInteractor.getUserActions({
      session_id: params.session_id,
      page: page,
      limit: 3
    })

    setUserActionsList({
      ...userActionsList,
      total: userActionList.total,
      list: userActionList.user_actions_list
    })
  }, [])

  useEffect(() => {
    initUserInfoData()
  }, [initUserInfoData])

  useEffect(() => {
    initUserActionList(1)
  }, [])

  const activeTimeLine = async (item: any) => {
    setActiveId(`${item.happen_time}${item.action_type}`)
    setDetail(item.action_detail)
  }

  const onPageChange = async (page: any) => {
    setUserActionsList({
      ...userActionsList
    })
    initUserActionList(page)
  }

  const userStatisticsRender = (key: number, item: any) => {
    const userAction = USERACTIONICON[item.action_type]
    return (
      <div key={key} className="survey_statistics_item">
        <div className="statistics-item-icon">
          <img className="userActionIcon" src={userAction.icon} />
        </div>
        <p>
          {item.total}
          {userAction.text}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="user__detail_page">
        <div className="user__survey">
          {userInfo ? (
            <Card title="用户信息">
              <Space size={60}>
                <ListLable>
                  <ListLableItem label="设备名称">{`${userInfo.device} / ${userInfo.device_type}`}</ListLableItem>
                  <ListLableItem label="浏览器">
                    {userInfo.browser}:{userInfo.browser_version}
                  </ListLableItem>
                  <ListLableItem label="系统版本">
                    {userInfo.os}: {userInfo.os_version}
                  </ListLableItem>
                  <ListLableItem label="IP地址">{userInfo.ip}</ListLableItem>
                  <ListLableItem label="所在地区">{`${userInfo.nation}${userInfo.province}${userInfo.city}${userInfo.district}`}</ListLableItem>
                </ListLable>
                <div className="user__survey_statistics">
                  <Space split={<Divider type="vertical" />} align="center" size={60}>
                    {userActionStatistics.map((item: any, key: any) => {
                      return userStatisticsRender(key, item)
                    })}
                  </Space>
                </div>
              </Space>
            </Card>
          ) : (
            <></>
          )}
        </div>
        <Card title="行为记录">
          <div className="flex">
            <div className="flex-grow-1 time_lines_warp">
              <Timeline>
                {userActionsList.list.map((item: UserIF.UserAction, key: number) => {
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
            <div className="flex-grow-1 time_line_detail_warp">
              <UserActionDetailInfo detail={detail} />
            </div>
          </div>
          <div style={{ marginTop: '10px', textAlign: 'right' }}>
            <Pagination onChange={onPageChange} pageSize={3} total={userActionsList.total} />
          </div>
        </Card>
      </div>
    </>
  )
}

export default UserActionPage
