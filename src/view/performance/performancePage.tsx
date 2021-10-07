import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Table, Tag } from 'antd'
import './index.less'
import moment from 'moment'
import { PerformanceIF } from '../../interface'
import StageTimeChart from '../../components/charts/performanceChart/stageTimeChart'
import StackBarChar from '../../components/charts/performanceChart/stackBarChart'
import {
  GetPerformancePageList,
  GetPerformanceRankingList,
  GetPerformanceStack,
  GetPerformanceStageTime,
  GetQuotaData
} from '../../request/performance'
import HeaderQuota from '../../components/headerQuota/headerQuota'
import TimePickerChart from '../../components/timeChartPicker/timePickerChart'

const PerformancePage: FC = () => {
  const [performanceParam, setPerformanceParam] = useState<PerformanceIF.PerformanceParam>({
    time_grain: 'minute',
    start_time: moment().format('YYYY-MM-DD'),
    end_time: moment().format('YYYY-MM-DD')
  })

  const [quota, setQuota] = useState<PerformanceIF.PerformanceQuota>()
  const [stack, setStack] = useState<PerformanceIF.PerformanceStack>({
    redirect: 0,
    appcache: 0,
    lookup_domain: 0,
    tcp: 0,
    ttfb: 0,
    request: 0,
    dom_parse: 0,
    load_page: 0,
    load_event: 0
  })
  const [pageList, setPageList] = useState<Array<PerformanceIF.PerformancePageList>>([])
  const [stageTime, setStageTime] = useState<Array<PerformanceIF.PerformanceStageTime>>([])

  const initQuotaData = useCallback(async () => {
    const result = await GetQuotaData(performanceParam)
    setQuota(result.data)
  }, [performanceParam])

  const initStackData = useCallback(async () => {
    const result = await GetPerformanceStack(performanceParam)
    setStack(result.data)
  }, [performanceParam])

  const initPageListData = useCallback(async () => {
    const result = await GetPerformancePageList(performanceParam)
    setPageList(result.data)
  }, [performanceParam])

  const initStageTimeData = useCallback(async () => {
    const result = await GetPerformanceStageTime(performanceParam)
    setStageTime(result.data)
  }, [performanceParam])

  useEffect(() => {
    initQuotaData()
    initStackData()
    initPageListData()
    initStageTimeData()
  }, [initQuotaData, initStackData, initPageListData, initStageTimeData])

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
          <StageTimeChart stage_time={stageTime} />
        </TimePickerChart>
        <Card>
          <StackBarChar stack={stack}></StackBarChar>
        </Card>
      </Card>
      <Card>
        {/* <p>这里需要增加一个查看单条URL 加载得信息 参考：http://www.webfunny.cn/demo/pagePerformance.html</p> */}
        <Table dataSource={pageList} columns={columns} rowKey="page_url" />
      </Card>
    </>
  )
}

export default PerformancePage
