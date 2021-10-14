import { Card, Table } from 'antd'
import moment from 'moment'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { HttpIF } from '../../interface'
import { GetHttpErrorList } from '../../request/http'

const HttperrorPage: FC = () => {
  const [httperrorList, setHttperrorList] = useState<HttpIF.HttpUrlList>([])

  const [httpParam, setHttpParam] = useState({
    time_grain: 'minute',
    start_time: moment().format('YYYY-MM-DD'),
    end_time: moment().format('YYYY-MM-DD'),
    stage_type: 'success'
  })

  const initHttpListData = useCallback(async () => {
    const { code, data } = await GetHttpErrorList({
      ...httpParam
    })
    if (code == 200) {
      setHttperrorList(data)
    }
  }, [httpParam])

  useEffect(() => {
    initHttpListData()
  }, [])

  const columns = [
    {
      title: '请求URL',
      dataIndex: 'http_url',
      key: 'http_url'
    },
    {
      title: '请求用户',
      dataIndex: 'user_total',
      key: 'user_total'
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

  return (
    <>
      <Card>
        <Table dataSource={httperrorList} columns={columns} rowKey="http_url" />
      </Card>
    </>
  )
}
export default HttperrorPage
