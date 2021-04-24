import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, DatePicker, Statistic, Table, Tooltip } from 'antd'
import './index.less'
import { InfoCircleFilled } from '@ant-design/icons'
import { GetHttpError } from '../../request'
import moment from 'moment'
const HttpPageError: FC = () => {
  const [userParams, setUserParams] = useState({
    search_date: moment().format('YYYY-MM-DD')
  })

  const [data, setData] = useState({
    http_error_quota: {
      error_400: 0,
      error_404: 0,
      error_500: 0,
      error_user: 0
    },
    http_error_list: []
  })
  const initData = useCallback(async () => {
    const data = await GetHttpError({
      start_time: userParams.search_date,
      end_time: userParams.search_date
    })
    setData(data.data)
  }, [])

  const timeChange = (date: any, dateString: string) => {
    setUserParams({
      search_date: dateString
    })
  }

  const columns = [
    {
      title: '请求URL',
      dataIndex: 'http_url',
      key: 'http_url'
    },
    {
      title: '失败用户',
      dataIndex: 'error_user',
      key: 'error_user'
    },
    {
      title: '平均耗时',
      dataIndex: 'load_time',
      key: 'load_time',
      render: (text: string) => <span>{text}ms</span>
    },
    {
      title: '请求次数',
      dataIndex: 'total',
      key: 'total'
    }
  ]

  useEffect(() => {
    initData()
  }, [initData])

  return (
    <>
      <div>
        <Card className="header-quota" style={{ marginBottom: '20px' }}>
          <p className="quota-tips">
            <Tooltip title="今日数据指标">
              <InfoCircleFilled style={{ fontSize: '16px', color: '#3399FF' }} />
            </Tooltip>
          </p>
          <div className="item">
            <Statistic title="400错误" value={data.http_error_quota.error_400} />
          </div>
          <div className="item">
            <Statistic title="404错误" value={data.http_error_quota.error_404} />
          </div>
          <div className="item">
            <Statistic title="500错误" value={data.http_error_quota.error_500} />
          </div>
          <div className="item">
            <Statistic title="失败影响用户" value={data.http_error_quota.error_user} />
          </div>
        </Card>
        {/* <Card className="header-quota" style={{ marginBottom: '20px' }}></Card> */}
        <Card>
          <DatePicker
            defaultValue={moment(userParams.search_date, 'YYYY-MM-DD')}
            onChange={timeChange}
            style={{ width: 160 }}
          />
          <Table dataSource={data.http_error_list} columns={columns} rowKey="http_url" />
        </Card>
      </div>
    </>
  )
}

export default HttpPageError
