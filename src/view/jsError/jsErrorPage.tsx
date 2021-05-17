import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Space, Table } from 'antd'
import { GetJsError } from '../../request'
import { useHistory } from 'react-router-dom'
const JsErrorPage: FC = () => {
  const [jsErrorList, setJsErrorList] = useState<any>([])
  const history = useHistory()

  const initData = useCallback(async () => {
    const result = await GetJsError()
    setJsErrorList(result.data)
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  const columns = [
    {
      title: '异常名称',
      dataIndex: 'error_name',
      key: 'error_name'
    },
    {
      title: '异常内容',
      dataIndex: 'message',
      key: 'message'
    },
    {
      title: '异常次数',
      dataIndex: 'error_count',
      key: 'error_count'
    },
    {
      title: '用户',
      dataIndex: 'error_user',
      key: 'error_user'
    },
    {
      title: '操作',
      key: 'action',
      render: (recode: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              history.push(`/js-error-detail/${recode.id}`)
            }}
          >
            查看详情
          </a>
        </Space>
      )
    }
  ]

  return (
    <>
      <div>
        <Card>
          <Table dataSource={jsErrorList} columns={columns} rowKey="message" />
        </Card>

        <Card>
          {/* {jsErrorList.map( (item: any, index: number) => {
          return <div key={index} dangerouslySetInnerHTML={{__html: item.stack}} onClick={ () => parseStack( item.stack)}></div>
        })}
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>{jsStack}</p> */}
        </Card>
      </div>
    </>
  )
}

export default JsErrorPage

// function parseStackTrack(error: string) {
//   const err = new Error(error)
//   const stackFrame = ErrorStackParser.parse(err)
//   return stackFrame
// }
