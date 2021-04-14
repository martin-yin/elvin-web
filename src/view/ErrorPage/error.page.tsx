import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Statistic, Table, Tooltip } from 'antd'
import { webPageErrorData } from '../../request'
import { InfoCircleFilled } from '@ant-design/icons'

const ErrorPage: FC = () => {
  const [data, setData] = useState({
    resources_quota: {
      error_count: 13,
      error_page: 13,
      error_user: 1
    },
    resources_list: []
  })

  const initData = useCallback(async () => {
    const result = await webPageErrorData()
    setData(result.data)
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  const columns = [
    {
      title: '资源地址',
      dataIndex: 'page_source_url',
      key: 'page_source_url'
    },
    {
      title: '发生页面',
      dataIndex: 'page_url_count',
      key: 'page_url_count'
    },
    {
      title: '影响用户',
      dataIndex: 'user_count',
      key: 'user_count'
    },
    {
      title: '总共次数',
      dataIndex: 'source_count',
      key: 'source_count'
    },
    {
      title: '资源类型',
      dataIndex: 'element_type',
      key: 'element_type'
    }
  ]

  return (
    <>
      <div className="site-layout-content">
        <Card className="header-quota" style={{ marginBottom: '20px' }}>
          <p className="quota-tips">
            <Tooltip title="今日数据指标">
              <InfoCircleFilled style={{ fontSize: '16px', color: '#3399FF' }} />
            </Tooltip>
          </p>
          <div className="item">
            <Statistic title="失败次数" value={data.resources_quota.error_count} />
          </div>
          <div className="item">
            <Statistic title="异常页面" value={data.resources_quota.error_page} />
          </div>
          <div className="item">
            <Statistic title="影响用户" value={data.resources_quota.error_user} />
          </div>
        </Card>
        <Card>
          <Table dataSource={data.resources_list} columns={columns} rowKey="page_source_url" />
        </Card>
      </div>
    </>
  )
}

export default ErrorPage
