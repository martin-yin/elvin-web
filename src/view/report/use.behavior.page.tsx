import React, { FC } from 'react'
import { Card, Table, Space } from 'antd'
import './index.less'
import 'echarts/theme/macarons'

const UserBehaviorsPage: FC = () => {
  const columns = [
    {
      title: 'user_id',
      dataIndex: 'user_id',
      key: 'user_id'
    },
    {
      title: '设备平台',
      dataIndex: '设备平台',
      key: '设备平台'
    },
    {
      title: '用户IP地址',
      dataIndex: '用户IP地址',
      key: '用户IP地址'
    },
    {
      title: '位置',
      dataIndex: '位置',
      key: '位置'
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>查看日志</a>
        </Space>
      )
    }
  ]
  return (
    <>
      <div className="site-layout-content">
        <Card>
          <Table dataSource={[]} columns={columns} />
        </Card>
      </div>
    </>
  )
}

export default UserBehaviorsPage
