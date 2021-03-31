import React, { FC, useCallback, useEffect, useState } from 'react'

import { Card, Row, Col, Table, Space, Tag, Tooltip } from 'antd'
import { Bar } from '@ant-design/charts'
import './index.less'
import { webPageReportData } from '../../request'
import { InfoCircleFilled } from '@ant-design/icons'

interface BarData {
  data: Array<Bar>
}

interface Bar {
  name?: string
  value: number | string
  type: string
}

const DemoBar: React.FC<BarData> = ({ data }) => {
  // const data =
  const config = {
    data: data,
    height: 140,
    isStack: true,
    autoFit: true,
    xField: 'value',
    yField: 'name',
    padding: [10, 60, 60, 60],
    seriesField: 'type',
    tooltip: {
      formatter: (datum: any) => {
        return { name: datum.type, value: `${datum.value}ms` }
      }
    },
    yAxis: {
      label: null,
      line: null
    },
    xAxis: {
      grid: {
        line: {
          style: {
            stroke: '#c0c0c0',
            lineDash: [2, 2]
          }
        }
      },
      label: {
        autoHide: true,
        autoRotate: false,
        formatter: (value: string) => {
          return value + 'ms'
        }
      }
    },
    legend: {
      position: 'bottom'
    }
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Bar {...config} />
}

const ReportPage: FC = () => {
  const [data, setData] = useState({
    quota: {
      ttfb: 0,
      dom_parse: 0,
      load_page: 0,
      pv: 0,
      fast: ''
    },
    stack: {
      redirect: 0,
      appcache: 0,
      lookup_domain: 0,
      tcp: 0,
      ttfb: 0,
      request: 0,
      dom_parse: 0,
      load_page: 0,
      load_event: 0
    },
    load_page_info_list: []
  })

  const initData = useCallback(async () => {
    const result = await webPageReportData()
    setData(result.data)
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'page_url',
      dataIndex: 'page_url',
      key: 'page_url'
    },
    {
      title: '首字节',
      dataIndex: 'ttfb',
      key: 'ttfb',
      render: (text: string) => <span>{text}ms</span>
    },
    {
      title: 'DOM处理',
      dataIndex: 'dom_parse',
      key: 'dom_parse',
      render: (text: string) => <span>{text}ms</span>
    },

    {
      title: 'event 事件',
      dataIndex: 'load_event',
      key: 'load_event',
      render: (text: string) => <span>{text}ms</span>
    },
    {
      title: '完全加载',
      dataIndex: 'load_page',
      key: 'load_page',
      render: (text: string) => <span>{text}ms</span>
    },
    {
      title: '加载类型',
      dataIndex: 'load_type',
      key: 'load_type',
      render: (text: string) => <Tag color="#2db7f5">{text}</Tag>
    },
    {
      title: '采样pv',
      dataIndex: 'pv',
      key: 'pv'
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>查看日志</a>
        </Space>
      )
    }
  ]
  return (
    <>
      <div className="site-layout-content">
        <Card className="header-quota">
          <p className="quota-tips">
            <Tooltip title="今日数据指标">
              <InfoCircleFilled style={{ fontSize: '16px', color: '#3399FF' }} />
            </Tooltip>
          </p>
          <div className="item">
            <div>
              <span className="item-label">{data.quota.ttfb} </span>ms
            </div>

            <div className="text-title">首字节</div>
          </div>
          <div className="item">
            <div>
              <span className="item-label">{data.quota.dom_parse} </span>ms
            </div>
            <div className="text-title">DOM Ready</div>
          </div>
          <div className="item">
            <div>
              <span className="item-label">{data.quota.load_page} </span>ms
            </div>

            <div className="text-title">页面完全加载</div>
          </div>
          <div className="item">
            <div>
              <span className="item-label">{data.quota.pv} </span>
            </div>
            <div className="text-title">采样PV</div>
          </div>
          <div className="item">
            <div>
              <span className="item-label">{data.quota.fast} </span>ms
            </div>
            <div className="text-title">2s 快开占比</div>
          </div>
        </Card>
        <Card style={{ margin: '20px 0px' }}>
          <p>各阶段耗时</p>
          <DemoBar
            data={[
              {
                name: '性能',
                value: data.stack.load_event,
                type: 'dom事件(load_event)'
              },
              {
                name: '性能',
                value: data.stack.dom_parse,
                type: 'dom处理耗时(dom_parse)'
              },
              {
                name: '性能',
                value: data.stack.request,
                type: '请求耗时(request)'
              },
              {
                name: '性能',
                value: data.stack.ttfb,
                type: '首字节(TTFB)'
              },
              {
                name: '性能',
                value: data.stack.tcp,
                type: 'TCP耗时(tcp)'
              },
              {
                name: '性能',
                value: data.stack.lookup_domain,
                type: 'DNS查询耗时(lookup_domain)'
              },
              {
                name: '性能',
                value: data.stack.appcache,
                type: '缓存查询耗时(appcache)'
              },
              {
                name: '性能',
                value: data.stack.redirect,
                type: '重定向耗时(redirect)'
              }
            ]}
          />
        </Card>
        <Card>
          <Table dataSource={data.load_page_info_list} columns={columns} />
        </Card>
      </div>
    </>
  )
}

export default ReportPage
