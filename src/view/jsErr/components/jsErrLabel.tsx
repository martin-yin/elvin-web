import { Card } from 'antd'
import React from 'react'
import { ListLable, ListLableItem } from '../../../components/listLable/listLable'
import { useJsErrContext } from '../hook/useJsErrDetail'

const JsErrLabel = React.memo<any>(({ jsErr }) => {
  return (
    <>
      {jsErr ? (
        <>
          <Card>
            <ListLable title="概要">
              <ListLableItem label="monitor_id">{jsErr.monitor_id}</ListLableItem>
              <ListLableItem label="URL">{jsErr.page_url}</ListLableItem>
              <ListLableItem label="browser">
                {jsErr.browser}: {jsErr.browser_version}
              </ListLableItem>
              <ListLableItem label="device">{jsErr.device}</ListLableItem>
              <ListLableItem label="os">
                {jsErr.os}: {jsErr.os_version}
              </ListLableItem>
              <ListLableItem label="sessionId">{jsErr.session_id}</ListLableItem>
              <ListLableItem label="时间">{jsErr.created_at}</ListLableItem>
            </ListLable>
            <ListLable title="位置">
              <ListLableItem label="ip">{jsErr.ip}</ListLableItem>
              <ListLableItem label="地址">{jsErr.nation + jsErr.province + jsErr.city + jsErr.district}</ListLableItem>
            </ListLable>
            <ListLable title="网络">
              <ListLableItem label="网络">未知</ListLableItem>
              <ListLableItem label="运行商">未知</ListLableItem>
            </ListLable>
          </Card>
        </>
      ) : null}
    </>
  )
})

export default JsErrLabel
