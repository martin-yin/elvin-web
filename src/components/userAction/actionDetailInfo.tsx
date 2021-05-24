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
        <ul className="detail-box">
          {userActionDetailListProxy[detail.action_type](detail)}
          <>
            <li>
              <label>操作系统：</label>
              <p>
                {`${detail.device}/ ${detail.device_type}`}
                &nbsp;&nbsp;&nbsp;
                {`${detail.os} ${detail.os_version}`}
              </p>
            </li>
            <li>
              <label>浏览器：</label>
              <p>{`${detail.browser} ${detail.browser_version}`}</p>
            </li>
            <li>
              <label>时间：</label>
              <p>{getTimeYYMMDDHM(detail.happen_time)}</p>
            </li>
            <li>
              <label>UA：</label>
              <p>{detail.ua}</p>
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
