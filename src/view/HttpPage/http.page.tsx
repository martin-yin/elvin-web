import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Statistic, Table, Tooltip } from 'antd'
import './index.less'
import { webPageHttpData } from '../../request'
import { InfoCircleFilled } from '@ant-design/icons'

const HttpPage: FC = () => {
  const [data, setData] = useState({
    http_quota: {
      error_user: 0,
      load_time: 0,
      success_total: 1611,
      total: 1611
    },
    http_info_list: []
  })

  const initData = useCallback(async () => {
    const result = await webPageHttpData()
    setData(result.data)
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  const columns = [
    {
      title: 'http_url',
      dataIndex: 'http_url',
      key: 'http_url'
    },
    {
      title: '成功率',
      dataIndex: 'success_rate',
      key: 'success_rate',
      render: (text: string, record: any) => <>{(record.success_total / record.total) * 100}%</>
    },
    {
      title: 'load_time',
      dataIndex: 'load_time',
      key: 'load_time',
      render: (text: string) => <span>{text}ms</span>
    },
    {
      title: 'total',
      dataIndex: 'total',
      key: 'total'
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
            <Statistic title="请求次数" value={data.http_quota.total} />
          </div>
          <div className="item">
            <Statistic title="成功率" value={(data.http_quota.success_total / data.http_quota.total) * 100} />
          </div>
          <div className="item">
            <Statistic title="请求耗时" value={data.http_quota.load_time} />
          </div>
          <div className="item">
            <Statistic title="失败影响用户" value={data.http_quota.error_user} />
          </div>
        </Card>
        <Card>
          <Table dataSource={data.http_info_list} columns={columns} rowKey="http_url" />
        </Card>
      </div>
    </>
  )
}

export default HttpPage
