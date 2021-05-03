import { Card, Table } from 'antd'
import React, { FC } from 'react'

const TeamPage: FC = () => {
  const columns = [
    {
      title: '团队名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '团队创建人',
      dataIndex: 'frequency',
      key: 'frequency'
    },
    {
      title: '团队成员',
      dataIndex: 'frequency',
      key: 'frequency'
    },
    {
      title: '项目列表',
      dataIndex: 'frequency',
      key: 'frequency'
    },
    {
      title: '操作',
      dataIndex: 'frequency',
      key: 'frequency'
    }
  ]
  return (
    <div>
      <Card>
        <Table dataSource={[]} columns={columns} rowKey="message" />
      </Card>
    </div>
  )
}

export default TeamPage
