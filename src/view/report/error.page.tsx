import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Table, Space, Tooltip } from 'antd'
import './index.less'
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
      title: '发生在几个页面',
      dataIndex: 'page_url_count',
      key: 'page_url_count'
    },
    {
      title: '影响用户',
      dataIndex: 'user_count',
      key: 'user_count'
    },
    {
      title: '共计发生错误次数',
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
            <div>
              <span className="item-label">{data.resources_quota.error_count} </span>ms
            </div>

            <div className="text-title">请求次数</div>
          </div>
          <div className="item">
            <div>
              <span className="item-label">{data.resources_quota.error_page} </span>ms
            </div>
            <div className="text-title">成功率</div>
          </div>
          <div className="item">
            <div>
              <span className="item-label">{data.resources_quota.error_user} </span>ms
            </div>

            <div className="text-title">请求耗时</div>
          </div>
        </Card>
        <Card>
          <Table dataSource={data.resources_list} columns={columns} />
        </Card>
      </div>
    </>
  )
}

export default ErrorPage
