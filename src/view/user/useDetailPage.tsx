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
import { GetUse, GetUserActionList, GetUsersActionsStatistics } from '../../request/user'

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
  const [userAactionParams, setUserAactionParams] = useState({
    page: 1,
    limit: 3,
    total: 0
  })
  const [userActionsList, setUserActionsList] = useState([])
  const [userActionStatistics, setUserActionStatistics] = useState([])
  const [detail, setDetail] = useState({} as any)
  const [activeId, setActiveId] = useState('')
  const [userInfo, setUserInfo] = useState<UserIF.User>()
  const params: any = useParams()
  const initUserInfoData = useCallback(async () => {
    const userInfores = await GetUse(params.userId)
    if (userInfores.code == 200) {
      const usersActionsStatistics = await GetUsersActionsStatistics({
        event_id: userInfores.data.event_id
      })
      setUserInfo(userInfores.data)
      setUserActionStatistics(usersActionsStatistics.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initUserActionList = useCallback(async () => {
    const userActionList: any = await GetUserActionList({
      event_id: '4cd72c84-0c91-4348-86d9-733435c03458',
      page: userAactionParams.page,
      limit: userAactionParams.limit
    })
    setUserActionsList(userActionList.data.user_actions_list)
    setUserAactionParams({
      page: userActionList.data.page,
      limit: 3,
      total: userActionList.data.total
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    initUserInfoData()
  }, [initUserInfoData])

  useEffect(() => {
    initUserActionList()
  }, [initUserActionList])

  const activeTimeLine = async (item: any) => {
    setActiveId(`${item.happen_time}${item.action_type}`)
    setDetail(item.action_detail)
  }

  const onPageChange = (page: any) => {
    setActiveId('')
    setDetail(null)
    setUserAactionParams({
      page: page,
      total: userAactionParams.total,
      limit: userAactionParams.limit
    })
  }

  const userStatisticsRender = (key: number, item: any) => {
    const userAction = USERACTIONICON[item.action_type]
    return (
      <div key={key} className="info-statistics-item">
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
      <div className="user-action-detail-page">
        <div className="page-user-info">
          {userInfo ? (
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
                    return userStatisticsRender(key, item)
                  })}
                </Space>
              </div>
            </Card>
          ) : (
            <></>
          )}
        </div>
        <Card title="行为记录">
          <div className=" flex">
            <div className="flex-grow-1 time-line-list-box ">
              <Timeline>
                {userActionsList.map((item: UserIF.UserAction, key: number) => {
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
          <div style={{ marginTop: '10px', textAlign: 'right' }}>
            <Pagination
              onChange={onPageChange}
              current={userAactionParams.page}
              pageSize={3}
              total={userAactionParams.total}
            />
          </div>
        </Card>
      </div>
    </>
  )
}

export default UserActionPage
