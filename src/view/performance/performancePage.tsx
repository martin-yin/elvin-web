import { Card, Table, Tag } from 'antd'
import React, { FC } from 'react'
import HeaderQuota from '../../components/headerQuota/headerQuota'
import TimePickerChart from '../../components/timeChartPicker/timePickerChart'
import { PerformanceChart } from './components/performanceChart'
import { StackBarChar } from './components/stackBarChar'
import usePerformanceInit from './hook/usePerformance'
import './index.less'

const PerformancePage: FC = () => {
  const { stackConsumes, quota, performanceConsumes, pageList, performanceParam, setPerformanceParam } =
    usePerformanceInit()

  const columns = [
    {
      title: '页面url',
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
    }
  ]

  const onTimeChange = (dateStrings: any, time_grain: string) => {
    setPerformanceParam({
      start_time: dateStrings[0],
      end_time: dateStrings[1],
      time_grain: time_grain
    })
  }

  const quotaTitleUnitKey = [
    {
      title: '首字节',
      key: 'ttfb',
      unit: 'ms'
    },
    {
      title: 'DOM Ready',
      key: 'dom_parse',
      unit: 'ms'
    },
    {
      title: '页面完全加载',
      key: 'load_page',
      unit: 'ms'
    },
    {
      title: '采样PV',
      key: 'pv',
      unit: ''
    },
    {
      title: '2s 快开占比',
      key: 'fast',
      unit: '%'
    }
  ]

  return (
    <>
      <HeaderQuota quotaTitleUnitKey={quotaTitleUnitKey} quota={quota} />
      <Card className="consume_time_charts">
        <TimePickerChart
          onTimeChange={onTimeChange}
          startTime={performanceParam.start_time}
          endTime={performanceParam.end_time}
        >
          <PerformanceChart performanceConsumes={performanceConsumes} />
        </TimePickerChart>
        <Card>
          <StackBarChar stackConsumes={stackConsumes} />
        </Card>
      </Card>
      <Card>
        <Table dataSource={pageList} columns={columns} rowKey="page_url" />
      </Card>
    </>
  )
}

export default PerformancePage
