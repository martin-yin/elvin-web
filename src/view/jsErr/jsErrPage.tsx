import moment from 'moment'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getJsErrors } from '../../request'
import { Tag, Card, Table, Space } from 'antd'
import { JsErrIF } from '../../interface/jsErr.interface'

const JsErrPage: FC = () => {
  const [jsErrs, setJsErrs] = useState<JsErrIF.JsErrs>([])
  const navigate = useNavigate()

  const initData = useCallback(async () => {
    const result = await getJsErrors()
    setJsErrs(result.data)
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  const columns = [
    {
      title: '',
      key: 'error_name',
      render: recode => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate(`/jsErr/detail/${recode.id}`)
          }}
        >
          <Space size="middle">
            <h3>{recode.error_name}</h3>
            <p>{recode.page_url}</p>
          </Space>
          <p>{recode.message}</p>
          <Space size="small">
            <p>{moment(recode?.last_time).fromNow()}</p>
            <p>{moment(recode?.first_time).fromNow()}</p>
          </Space>
        </div>
      )
    },
    {
      title: '时间',
      render: (recode: JsErrIF.JsErr) => <Tag color="#f50">{moment(recode?.last_time).fromNow()}</Tag>
    },
    {
      title: '异常次数',
      key: '',
      render: (recode: JsErrIF.JsErr) => (
        <p>
          {recode.today}/{recode.total}
        </p>
      )
    },
    {
      title: '总数用户',
      key: 'error_user',
      render: (recode: JsErrIF.JsErr) => <p>{recode.error_user}</p>
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
    <Card>
      <Table dataSource={jsErrs} columns={columns} rowKey="message" />
    </Card>
  )
}

export default JsErrPage
