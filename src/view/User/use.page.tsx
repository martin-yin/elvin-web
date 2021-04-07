import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Table, Space } from 'antd'
import './index.less'
import 'echarts/theme/macarons'
import { GetUsers } from '../../request'
import { Link } from 'react-router-dom'

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
        return <div>{`${recode.device}/${recode.device_type}`}</div>
      }
    },
    {
      title: '操作系统',
      dataIndex: '操作系统',
      key: 'system',
      render: (text: string, recode: any) => {
        return <div>{`${recode.os} ${recode.os_version}`}</div>
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
          <Table dataSource={userLst} columns={columns} />
        </Card>
      </div>
    </>
  )
}

export default UserPage
