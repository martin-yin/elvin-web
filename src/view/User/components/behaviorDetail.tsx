import { Empty } from 'antd'
import React from 'react'
import { ListLable, ListLableItem } from '../../../components/listLable/listLable'
import { UserIF } from '../../../interface'
import { getTimeYYMMDDHM } from '../../../utils'
import { useActionDetailListProxy } from '../../../utils/useActionProxy'

interface BehaviorDetailProps {
  detail: UserIF.UserActionDetail
}

const BehaviorDetail = React.memo<BehaviorDetailProps>(({ detail }) => {
  const userActionDetail = (detail: UserIF.UserActionDetail): JSX.Element => {
    const userAction = Reflect.has(detail, 'action_type')
    return userAction ? (
      <ListLable>
        {useActionDetailListProxy[detail.action_type](detail)}
        <ListLableItem label="操作系统">
          {`${detail.device} / ${detail.device_type}`}
          &nbsp;&nbsp;&nbsp;
          {`${detail.os} ${detail.os_version}`}
        </ListLableItem>
        <ListLableItem label="浏览器">{`${detail.browser} ${detail.browser_version}`}</ListLableItem>
        <ListLableItem label="时间">{getTimeYYMMDDHM(detail.happen_time)}</ListLableItem>
        <ListLableItem label="UA">{detail.ua}</ListLableItem>
      </ListLable>
    ) : (
      <>
        <Empty></Empty>
      </>
    )
  }
  return <>{userActionDetail(detail)}</>
})

export default BehaviorDetail
