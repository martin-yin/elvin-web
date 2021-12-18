import { Card, Table, Tag } from 'antd'
import moment from 'moment'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { httpInteractor } from '../../core/interactors'
import { HttpIF } from '../../interface'

const HttpErrPage: FC = () => {
  const [httperrs, setHttps] = useState<HttpIF.Https>([])

  const [httpParam, setHttpParam] = useState({
    time_grain: 'minute',
    start_time: '2021-12-14',
    end_time: moment().format('YYYY-MM-DD'),
    stage_type: 'success'
  })

  const initHttpErrData = useCallback(async () => {
    const data = await httpInteractor.getHttpErrors(httpParam)
    setHttps(data)
  }, [httpParam])

  useEffect(() => {
    initHttpErrData()
  }, [])

  const columns = [
    {
      title: '请求URL',
      dataIndex: 'url',
      key: 'url'
    },
    {
      title: '请求参数',
      dataIndex: 'request_text',
      key: 'request_text'
    },
    {
      title: '出现时间',
      render: (text: string, recode) => <p>{moment(recode?.last_happen_time).fromNow()}</p>
    },
    {
      title: '状态码',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => <Tag color="#f50">{text}</Tag>
    },
    {
      title: '影响用户',
      dataIndex: 'user_total',
      key: 'user_total'
    }
  ]

  return (
    <Card>
      <Table dataSource={httperrs} columns={columns} rowKey="url" />
    </Card>
  )
}
export default HttpErrPage
