import { Empty } from 'antd'
import React, { FC } from 'react'
import { UserIF } from '../../interface'
import { getTimeYYMMDDHM } from '../../utils'
import { userActionDetailListProxy } from '../../utils/userActionProxy'
import ListLable from '../listLable/listLable'
import ListLableItem from '../listLable/listLableItem'

interface UserActionDetailInfoProps {
  detail: UserIF.UserActionDetail
}

const UserActionDetailInfo: FC<UserActionDetailInfoProps> = ({ detail }) => {
  const userActionDetail = (detail: UserIF.UserActionDetail): JSX.Element => {
    const userAction = Reflect.has(detail, 'action_type')
    return userAction ? (
      <ListLable>
        {userActionDetailListProxy[detail.action_type](detail)}
        <ListLableItem label="操作系统">
          {`${detail.device}/ ${detail.device_type}`}
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
}

export default UserActionDetailInfo
