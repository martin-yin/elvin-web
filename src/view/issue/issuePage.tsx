import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Dropdown, Menu, Space, Table } from 'antd'
import { GetJsError } from '../../request'
import { useHistory } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'
const IssuePage: FC = () => {
  const [jsErrorList, setJsErrorList] = useState<any>([])
  const history = useHistory()

  const initData = useCallback(async () => {
    const result = await GetJsError()
    setJsErrorList(result.data)
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  const menu = (
    <Menu>
      <Menu.Item>a danger item</Menu.Item>
      <Menu.Item>a danger item</Menu.Item>
    </Menu>
  )

  const columns = [
    {
      title: '',
      key: 'error_name',
      render: (recode: any) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            history.push(`/issue-detail/${recode.id}`)
          }}
        >
          <Space size="middle">
            <h3>{recode.error_name}</h3>
            <p>xxx url</p>
          </Space>
          <p>{recode.message}</p>
          <Space size="small">
            <p>最近一次时间</p>
            <p>-</p>
            <p>最后发生的时间</p>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                分配给 <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        </div>
      )
    },
    {
      title: '概述柱状图',
      key: 'action'
    },
    {
      title: '异常次数',
      key: 'error_count',
      render: () => <p>12/12</p>
    },
    {
      title: '总数用户',
      key: 'error_user',
      render: (recode: any) => <p>{recode.error_count}</p>
    }
  ]

  return (
    <>
      <div>
        <Card>
          <Table dataSource={jsErrorList} columns={columns} rowKey="message" />
        </Card>
      </div>
    </>
  )
}

export default IssuePage
