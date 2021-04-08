import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Table, Space, Tag } from 'antd'
import './index.less'
import 'echarts/theme/macarons'
import { GetUsers } from '../../request'
import { Link } from 'react-router-dom'
import { getTimeYYMMDDHM } from '../../utils'

const UserPage: FC = () => {
  const [userLst, setUserList] = useState([])

  const initData = useCallback(async () => {
    const result = await GetUsers()
    setUserList(result.data)
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

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
      render: (text: string, recode: any) => {
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
    },
    {
      title: '操作系统',
      dataIndex: '操作系统',
      key: 'system',
      render: (text: string, recode: any) => {
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
      render: (text: string, recode: any) => {
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
      key: 'address'
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
      render: (text: string, recode: any) => (
        <Space size="middle">
          <Link to={`/user-detail/${recode.id}`}>查看详情</Link>
        </Space>
      )
    }
  ]
  return (
    <>
      <div className="site-layout-content">
        <Card>
          <Table dataSource={userLst} columns={columns} rowKey="id" />
        </Card>
      </div>
    </>
  )
}

export default UserPage
