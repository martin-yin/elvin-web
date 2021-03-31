import React, { FC, useCallback, useEffect, useRef, useState } from 'react'

import { Card, Table, Space, Tag, Tooltip } from 'antd'
import './index.less'
import { webPageReportData } from '../../request'
import { InfoCircleFilled } from '@ant-design/icons'

import * as echarts from 'echarts'

const ReportPage: FC = () => {
  const renderStackBarChart = (stack: any) => {
    const stackBar = document.getElementById('stackBar')
    const myChart = echarts.init(stackBar as any)

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: [
          '重定向耗时(redirect)',
          '缓存查询耗时(appcache)',
          'DNS查询耗时(lookup_domain)',
          'TCP耗时(tcp)',
          '首字节(TTFB)',
          '请求耗时(request)',
          'dom处理耗时(dom_parse)',
          'dom事件(load_event)'
        ]
      },
      xAxis: {
        type: 'value'
      },
      height: '70px',
      yAxis: {
        type: 'category',
        data: ['']
      },
      series: [
        {
          name: '重定向耗时(redirect)',
          type: 'bar',
          stack: 'total',
          data: [stack.redirect]
        },
        {
          name: '缓存查询耗时(appcache)',
          type: 'bar',
          stack: 'total',
          data: [stack.appcache]
        },
        {
          name: 'DNS查询耗时(lookup_domain)',
          type: 'bar',
          stack: 'total',
          data: [stack.lookup_domain]
        },
        {
          name: 'TCP耗时(tcp)',
          type: 'bar',
          stack: 'total',
          data: [stack.tcp]
        },
        {
          name: '首字节(TTFB)',
          type: 'bar',
          stack: 'total',
          data: [stack.ttfb]
        },
        {
          name: '请求耗时(request)',
          type: 'bar',
          stack: 'total',
          data: [stack.request]
        },
        {
          name: 'dom处理耗时(dom_parse)',
          type: 'bar',
          stack: 'total',
          data: [stack.dom_parse]
        },
        {
          name: 'dom事件(load_event)',
          type: 'bar',
          stack: 'total',
          data: [stack.load_event]
        }
      ]
    }
    myChart.setOption(option)
  }

  const renderStageTimeChart = (stage_time: any) => {
    const stageTime = document.getElementById('stageTime')
    const myChart = echarts.init(stageTime as any)
    const option = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['采样pv', '首字节', '请求耗时', 'SSL连接', '页面加载']
      },
      xAxis: {
        data: stage_time.map(function (item: any) {
          console.log(item.time_key)
          return item.time_key
        })
      },
      yAxis: [
        {
          type: 'value',
          name: '',
          position: 'left',
          axisLabel: {
            formatter: '{value} ms'
          }
        },
        {
          type: 'value',
          name: '采样pv',
          min: 0
        }
      ],
      toolbox: {
        right: 10,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: [
        // {
        //   startValue: '2011-04-30',
        //   endValue: '2011-05-10'
        // },
        {
          type: 'inside'
        }
      ],
      series: [
        {
          name: '采样pv',
          type: 'bar',
          data: stage_time.map(function (item: any) {
            return item.pv
          }),
          yAxisIndex: 1
        },
        {
          name: '首字节',
          type: 'line',
          data: stage_time.map(function (item: any) {
            return item.ttfb
          })
        },
        {
          name: '请求耗时',
          type: 'line',
          data: stage_time.map(function (item: any) {
            return item.request
          })
        },
        {
          name: 'SSL连接',
          type: 'line',
          data: stage_time.map(function (item: any) {
            return item.ssl_t
          })
        },
        {
          name: '页面加载',
          type: 'line',
          data: stage_time.map(function (item: any) {
            return item.load_page
          })
        }
      ]
    }
    myChart.setOption(option)
  }

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
    load_page_info_list: [],
    stage_time: []
  })

  const initData = useCallback(async () => {
    const result = await webPageReportData()
    setData(result.data)
    renderStackBarChart(result.data.stack)
    renderStageTimeChart(result.data.stage_time)
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
          <div id="stageTime" style={{ height: 400 }}></div>
        </Card>
        <Card style={{ margin: '20px 0px' }}>
          <div id="stackBar" style={{ height: 150 }}></div>

          {/* <DemoBar
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
          /> */}
        </Card>
        <Card>
          <Table dataSource={data.load_page_info_list} columns={columns} />
        </Card>
      </div>
    </>
  )
}

export default ReportPage
