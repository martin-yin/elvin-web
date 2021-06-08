import { Empty } from 'antd'
import React, { FC } from 'react'
import { UserIF } from '../../interface'
import { getTimeYYMMDDHM } from '../../utils'
import { userActionDetailListProxy } from '../../utils/userActionProxy'

interface UserActionDetailInfoProps {
  detail: UserIF.UserActionDetail
}

const UserActionDetailInfo: FC<UserActionDetailInfoProps> = ({ detail }) => {
  const userActionDetail = (detail: UserIF.UserActionDetail): JSX.Element => {
    const userAction = Reflect.has(detail, 'action_type')
    return userAction ? (
      <>
        <ul className="info-ul">
          {userActionDetailListProxy[detail.action_type](detail)}
          <>
            <li>
              <label>操作系统：</label>
              <span>
                {`${detail.device}/ ${detail.device_type}`}
                &nbsp;&nbsp;&nbsp;
                {`${detail.os} ${detail.os_version}`}
              </span>
            </li>
            <li>
              <label>浏览器：</label>
              <span>{`${detail.browser} ${detail.browser_version}`}</span>
            </li>
            <li>
              <label>时间：</label>
              <span>{getTimeYYMMDDHM(detail.happen_time)}</span>
            </li>
            <li>
              <label>UA：</label>
              <span>{detail.ua}</span>
            </li>
          </>
        </ul>
      </>
    ) : (
      <>
        <Empty></Empty>
      </>
    )
  }
  return <>{userActionDetail(detail)}</>
}

export default UserActionDetailInfo
