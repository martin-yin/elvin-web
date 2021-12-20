import moment from 'moment'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getJsErrors } from '../../request'
import { Tag, Card, Table, Space } from 'antd'
import { JsErrIF } from '../../interface/jsErr.interface'
import { CloseCircleOutlined, ExclamationCircleOutlined, SyncOutlined } from '@ant-design/icons'
import FilterHeader from '../../components/filterHeader/filterHeader'
import { useFilterHeaderContext } from '../../components/filterHeader/hook/useFilterHeaderInit'

const JsErrPage: FC = () => {
  const [jsErrs, setJsErrs] = useState<JsErrIF.JsErrs>([])
  const navigate = useNavigate()
  const { filterHeaderParams } = useFilterHeaderContext()

  const initData = useCallback(async () => {
    const result = await getJsErrors(filterHeaderParams)
    setJsErrs(result.data)
  }, [filterHeaderParams])

  useEffect(() => {
    initData()
  }, [filterHeaderParams])

  const columns = [
    {
      title: '概况',
      key: 'error_name',
      render: recode => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate(`/jsErr/detail/${recode.id}`)
          }}
        >
          <Space size="middle">
            <h3>
              <Tag icon={<CloseCircleOutlined />} color="error">
                {recode.error_name}
              </Tag>
            </h3>
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
      title: '最后出现时间',
      render: (recode: JsErrIF.JsErr) => (
        <Tag icon={<ExclamationCircleOutlined />} color="warning">
          {moment(recode?.last_time).fromNow()}
        </Tag>
      )
    },
    {
      title: '异常次数(总)',
      key: '',
      render: (recode: JsErrIF.JsErr) => <>{recode.total}</>
    },
    {
      title: '影响总数用户',
      key: 'error_user',
      render: (recode: JsErrIF.JsErr) => <>{recode.error_user}</>
    },
    {
      title: '处理人',
      dataIndex: '',
      key: ''
    },
    {
      title: '状态',
      dataIndex: '',
      key: '',
      render: (recode: JsErrIF.JsErr) => (
        <p>
          <Tag icon={<SyncOutlined spin />} color="error">
            等待修复
          </Tag>
        </p>
      )
    }
  ]

  return (
    <>
      <FilterHeader />
      <Card>
        <Table dataSource={jsErrs} columns={columns} rowKey="message" />
      </Card>
    </>
  )
}

export default JsErrPage
