import { Card, Table } from 'antd'
import React, { FC } from 'react'
import FilterHeader from '../../components/filterHeader/filterHeader'
import HeaderQuota from '../../components/headerQuota/headerQuota'
import { HttpChart } from './components/httpChart'
import { useHttpInit } from './hook/useHttp'
import './index.less'

const HttpPage: FC = () => {
  const { quota, httpList, httpConsumes } = useHttpInit()

  const columns = [
    {
      title: '请求URL',
      dataIndex: 'url',
      key: 'url'
    },
    {
      title: '慢查询',
      dataIndex: 'user_slow',
      key: 'user_slow'
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
      title: '成功率',
      dataIndex: 'success_rate',
      key: 'success_rate',
      render: (text: string) => <span>{text}%</span>
    },
    {
      title: '用户数',
      dataIndex: 'user_total',
      key: 'user_total'
    }
  ]

  const quotaTitleUnitKeys = [
    {
      title: '请求次数',
      key: 'total',
      unit: ''
    },
    {
      title: '请求耗时',
      key: 'load_time',
      unit: 'ms'
    },
    {
      title: '成功率',
      key: 'success_rate',
      unit: '%'
    },
    {
      title: '异常影响用户',
      key: 'error_user',
      unit: ''
    }
  ]

  return (
    <>
      <FilterHeader />
      <HeaderQuota quotaTitleUnitKeys={quotaTitleUnitKeys} quota={quota} />
      <Card className="time__pciker_chart_warp">
        <HttpChart httpConsumes={httpConsumes} />
      </Card>
      <Card>
        <Table dataSource={httpList} columns={columns} rowKey="url" />
      </Card>
    </>
  )
}

export default HttpPage
