import { Card, Table } from 'antd'
import moment from 'moment'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { HttpIF } from '../../interface'

const HttperrorPage: FC = () => {
  const [httperrorList, setHttperrorList] = useState<HttpIF.Https>([])

  const [httpParam, setHttpParam] = useState({
    time_grain: 'minute',
    start_time: moment().format('YYYY-MM-DD'),
    end_time: moment().format('YYYY-MM-DD'),
    stage_type: 'success'
  })

  const initHttpListData = useCallback(async () => {
    // const { code, data } = await GetHttpErrorList({
    //   ...httpParam
    // })
    // if (code == 200) {
    //   setHttperrorList(data)
    // }
  }, [httpParam])

  useEffect(() => {
    initHttpListData()
  }, [])

  const columns = [
    {
      title: '请求URL',
      dataIndex: 'url',
      key: 'url'
    },
    {
      title: '出现时间',
      render: (text, recode) => (
        <div>
          <p>
            {moment(recode?.first_happen_time).format('YYYY-MM-DD HH:mm:ss')}~
            {moment(recode?.last_happen_time).fromNow()}
          </p>
        </div>
      )
    },
    {
      title: '影响用户',
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
    },
    {
      title: '处理人',
      dataIndex: '',
      key: ''
    },
    {
      title: '状态',
      dataIndex: '',
      key: ''
    }
  ]

  return (
    <>
      <Card>
        <Table dataSource={httperrorList} columns={columns} rowKey="url" />
      </Card>
    </>
  )
}
export default HttperrorPage
