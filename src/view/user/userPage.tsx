import { Card, DatePicker, Input, Select, Space, Tag } from 'antd'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import FilterHeader from '../../components/filterHeader/filterHeader'
import { useFilterHeaderContext } from '../../components/filterHeader/hook/useFilterHeaderInit'
import TableData from '../../components/tableData/tableData'
import { userInteractor } from '../../core/interactors'
import { UserIF } from '../../interface'
import { getTimeYYMMDDHM } from '../../utils'
import './index.less'

const UserPage: FC = () => {
  const [users, setUsers] = useState<UserIF.Users>([])
  const { filterHeaderParams } = useFilterHeaderContext()

  useEffect(() => {
    ;(async () => {
      const data = await userInteractor.geUsers(filterHeaderParams)
      setUsers(data)
    })()
  }, [filterHeaderParams])

  const tbDeviceRender = (recode: UserIF.User) => {
    return (
      <div>
        {recode.device_type == 'Pc' ? (
          <Tag color="#2db7f5">
            {recode.device}/ {recode.device_type}
          </Tag>
        ) : (
          ''
        )}
        {recode.os == 'Android' ? (
          <Tag color="#87d068">
            {recode.device}/ {recode.device_type}
          </Tag>
        ) : (
          ''
        )}
        {recode.os == 'iOS' ? (
          <Tag color="#f50">
            {recode.device}/ {recode.device_type}
          </Tag>
        ) : (
          ''
        )}
      </div>
    )
  }

  const columns = [
    {
      title: 'user_id',
      dataIndex: 'user_id',
      key: 'user_id'
    },
    {
      title: '设备',
      dataIndex: 'device',
      key: 'device',
      render: (text: string, recode: UserIF.User) => tbDeviceRender(recode)
    },
    {
      title: '操作系统',
      dataIndex: '操作系统',
      key: 'system',
      render: (text: string, recode: UserIF.User) => {
        return (
          <div>
            <Tag color="green">{`${recode.os} ${recode.os_version}`}</Tag>
          </div>
        )
      }
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      key: 'browser',
      render: (text: string, recode: UserIF.User) => {
        return <div>{`${recode.browser} ${recode.browser_version}`}</div>
      }
    },
    {
      title: 'ip',
      dataIndex: 'ip',
      key: 'ip'
    },
    {
      title: '位置',
      dataIndex: '位置',
      key: 'address',
      render: (text: string, recode: UserIF.User) => {
        return <div>{`${recode.nation}${recode.province}${recode.city}${recode.district}`}</div>
      }
    },
    {
      title: '创建时间',
      dataIndex: 'happen_time',
      key: 'happen_time',
      render: (text: string) => {
        return getTimeYYMMDDHM(text)
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, recode: UserIF.User) => (
        <Space size="middle">
          <Link to={`/user/detail/${recode.session_id}/${recode.id}`}>查看详情</Link>
        </Space>
      )
    }
  ]
  return (
    <>
      <FilterHeader />
      <Card>
        <TableData dataSource={users} columns={columns} />
      </Card>
    </>
  )
}

export default UserPage
