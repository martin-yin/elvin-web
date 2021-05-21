import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Statistic, Table, Tag, Tooltip, DatePicker, Radio, Space, Empty } from 'antd'
import './index.less'
import { InfoCircleFilled } from '@ant-design/icons'
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

const { RangePicker } = DatePicker

const PerformancePage: FC = () => {
  const [performanceParam, setPerformanceParam] = useState<PerformanceIF.PerformanceParam>({
    time_grain: 'minute',
    start_time: moment().format('YYYY-MM-DD'),
    end_time: moment().format('YYYY-MM-DD')
  })

  const [quota, setQuota] = useState<PerformanceIF.PerformanceQuota>({
    ttfb: 0,
    dom_parse: 0,
    load_page: 0,
    pv: 0,
    fast: ''
  })
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
  const [rankingList, setRankeList] = useState([])

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

  const initRankingList = useCallback(async () => {
    const result = await GetPerformanceRankingList(performanceParam)
    setRankeList(result.data)
    console.log(result.data, 'rankingList')
  }, [performanceParam])

  useEffect(() => {
    initQuotaData()
    initStackData()
    initPageListData()
    initStageTimeData()
    initRankingList()
  }, [initQuotaData, initStackData, initPageListData, initStageTimeData, initRankingList])

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

  const disabledDate = (current: any) => {
    return current && current >= moment()
  }

  const timeGrainChange = (e: any) => {
    setPerformanceParam({
      ...performanceParam,
      time_grain: e.target.value
    })
  }

  const onTimeChange = (dates: any, dateStrings: [string, string]) => {
    const time = dates[1].diff(dates[0], 'days')
    let time_grain = performanceParam.time_grain
    if (time > 0 && time <= 6) {
      time_grain = 'hour'
    } else if (time > 6) {
      time_grain = 'day'
    } else {
      time_grain = 'minute'
    }
    setPerformanceParam({
      start_time: dateStrings[0],
      end_time: dateStrings[1],
      time_grain: time_grain
    })
  }

  return (
    <>
      <Card className="header-quota">
        <p className="quota-tips">
          <Tooltip title="今日数据指标">
            <InfoCircleFilled style={{ fontSize: '16px', color: '#3399FF' }} />
          </Tooltip>
        </p>
        <div className="item">
          <Statistic title="首字节" value={quota.ttfb} suffix="ms" />
        </div>
        <div className="item">
          <Statistic title="DOM Ready" value={quota.dom_parse} suffix="ms" />
        </div>
        <div className="item">
          <Statistic title="页面完全加载" value={quota.load_page} suffix="ms" />
        </div>
        <div className="item">
          <Statistic title="采样PV" value={quota.pv} />
        </div>
        <div className="item">
          <Statistic title="2s 快开占比" value={quota.fast} suffix="%" />
        </div>
      </Card>
      <Space className="performanceTime" size={20}>
        <Card className="performanceRanking">
          <div className="performanceTimeList">
            {rankingList.length != 0 ? (
              rankingList.map((item: any, key: number) => {
                return (
                  <div key={key} className="performanceTimeItem flex">
                    <div className="flex-grow-1">{item.page_url}</div>
                    <div className="flex-grow-0">耗时{item.load_page}ms</div>
                  </div>
                )
              })
            ) : (
              <Empty />
            )}
          </div>
        </Card>
        <div>
          <Card className="timeCharts">
            <div className="timePickerContainer">
              <div className="timePicker">
                <RangePicker
                  disabledDate={disabledDate}
                  defaultValue={[
                    moment(performanceParam.start_time, 'YYYY-MM-DD'),
                    moment(performanceParam.end_time, 'YYYY-MM-DD')
                  ]}
                  ranges={{
                    今天: [moment(), moment()],
                    昨天: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    最近七天: [moment().subtract(6, 'days'), moment()],
                    近一个月: [moment().subtract(1, 'month'), moment()]
                  }}
                  onChange={onTimeChange}
                />
              </div>
              <div className="timeGrain">
                <p>时间粒度：</p>
                <Radio.Group onChange={timeGrainChange} value={performanceParam.time_grain}>
                  <Radio value={'minute'}>分钟</Radio>
                  <Radio value={'hour'}>小时</Radio>
                  <Radio value={'day'}>天</Radio>
                </Radio.Group>
              </div>
            </div>
            <StageTimeChart stage_time={stageTime} />
          </Card>
          <Card style={{ marginTop: '20px' }} className="timeCharts">
            <StackBarChar stack={stack}></StackBarChar>
          </Card>
        </div>
      </Space>

      <Card>
        {/* <p>这里需要增加一个查看单条URL 加载得信息 参考：http://www.webfunny.cn/demo/pagePerformance.html</p> */}
        <Table dataSource={pageList} columns={columns} rowKey="page_url" />
      </Card>
    </>
  )
}

export default PerformancePage
