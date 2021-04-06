import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Table } from 'antd'
import './index.less'
import { GetJsError } from '../request'

const JsErrorPage: FC = () => {
  const [jsErrorList, setJsErrorList] = useState([])

  const initData = useCallback(async () => {
    const result = await GetJsError()
    setJsErrorList(result.data)
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  const columns = [
    {
      title: '异常内容',
      dataIndex: 'message',
      key: 'message'
    },
    {
      title: '发生次数',
      dataIndex: 'frequency',
      key: 'frequency'
    }
  ]

  return (
    <>
      <div className="site-layout-content">
        <Card>
          <Table dataSource={jsErrorList} columns={columns} />
        </Card>
      </div>
    </>
  )
}

export default JsErrorPage
