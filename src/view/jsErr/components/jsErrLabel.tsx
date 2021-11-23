import { Card } from 'antd'
import React from 'react'
import { ListLable, ListLableItem } from '../../../components/listLable/listLable'

const JsErrLabel = React.memo<any>(({ issue }) => {
  return (
    <Card>
      <ListLable title="概要">
        <ListLableItem label="monitor_id">{issue.monitor_id}</ListLableItem>
        <ListLableItem label="URL">{issue.page_url}</ListLableItem>
        <ListLableItem label="browser">
          {issue.browser}: {issue.browser_version}
        </ListLableItem>
        <ListLableItem label="device">{issue.device}</ListLableItem>
        <ListLableItem label="os">
          {issue.os}: {issue.os_version}
        </ListLableItem>
        <ListLableItem label="sessionId">{issue.session_id}</ListLableItem>
        <ListLableItem label="时间">{issue.created_at}</ListLableItem>
      </ListLable>
      <ListLable title="位置">
        <ListLableItem label="ip">{issue.ip}</ListLableItem>
        <ListLableItem label="地址">{issue.nation + issue.province + issue.city + issue.district}</ListLableItem>
      </ListLable>
      <ListLable title="网络">
        <ListLableItem label="网络">未知</ListLableItem>
        <ListLableItem label="运行商">未知</ListLableItem>
      </ListLable>
    </Card>
  )
})

export default JsErrLabel
