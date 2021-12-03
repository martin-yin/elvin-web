import { Card, Divider, Space } from 'antd'
import React from 'react'
import { ListLable, ListLableItem } from '../../../components/listLable/listLable'
import {
  PageOperationIcon,
  PageJsErrorIcon,
  PageLoadIcon,
  PageNetworkIcon,
  PageViewIcon,
  PageResourceIcon
} from '../../../assets'
import { UserIF } from '../../../interface'

const USERACTIONICONS: {
  [key: string]: { icon: string; text: string }
} = {
  PAGE_LOAD: { icon: PageLoadIcon, text: '次打开页面' },
  HTTP_LOG: { icon: PageNetworkIcon, text: '次网络请求' },
  PAGE_VIEW: { icon: PageViewIcon, text: '次浏览页面' },
  OPERATION: { icon: PageOperationIcon, text: '次点击事件' },
  RESOURCE: { icon: PageResourceIcon, text: '次资源异常' },
  JS_ERROR: { icon: PageJsErrorIcon, text: '次JS异常' }
}

interface SessionSurveyProps {
  sessionSurvey: UserIF.User
  behavioStatistics: UserIF.UserActionStatistics
}

const SessionSurvey = React.memo<SessionSurveyProps>(({ sessionSurvey, behavioStatistics }) => {
  const userStatisticsRender = (key: number, item: UserIF.UserActionStatistic) => {
    const action = USERACTIONICONS[item.action_type]
    return (
      <div key={key} className="survey_statistics_item">
        <div className="statistics-item-icon">
          <img className="userActionIcon" src={action.icon} />
        </div>
        <p>
          {item.total}
          {action.text}
        </p>
      </div>
    )
  }

  return (
    <div className="user__survey">
      {sessionSurvey ? (
        <Card title="用户信息">
          <Space size={60}>
            <ListLable>
              <ListLableItem label="设备名称">{`${sessionSurvey.device} / ${sessionSurvey.device_type}`}</ListLableItem>
              <ListLableItem label="浏览器">
                {sessionSurvey.browser}:{sessionSurvey.browser_version}
              </ListLableItem>
              <ListLableItem label="系统版本">
                {sessionSurvey.os}: {sessionSurvey.os_version}
              </ListLableItem>
              <ListLableItem label="IP地址">{sessionSurvey.ip}</ListLableItem>
              <ListLableItem label="所在地区">{`${sessionSurvey.nation}${sessionSurvey.province}${sessionSurvey.city}${sessionSurvey.district}`}</ListLableItem>
            </ListLable>
            <div className="user__survey_statistics">
              <Space split={<Divider type="vertical" />} align="center" size={60}>
                {behavioStatistics.map((item, key: number) => {
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
  )
})

export default SessionSurvey
