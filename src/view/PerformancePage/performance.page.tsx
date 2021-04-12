import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Statistic, Table, Tag, Tooltip, DatePicker, Radio, Button } from 'antd'
import './index.less'
import { webPageReportData } from '../../request'
import { InfoCircleFilled } from '@ant-design/icons'
import moment from 'moment'
import StageTimeChart from '../../components/PerformanceChart/stage.time.chart'
import StackBarChar from '../../components/PerformanceChart/stack.bar.chart'

const { RangePicker } = DatePicker

const PerformancePage: FC = () => {
  const [performanceParam, setPerformanceParam] = useState({
    time_grain: 'minute',
    start_time: moment().format('YYYY-MM-DD'),
    end_time: moment().format('YYYY-MM-DD')
  })
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
    const result = await webPageReportData({
      time_grain: performanceParam.time_grain,
      start_time: `${performanceParam.start_time}`,
      end_time: `${performanceParam.end_time}`
    })
    setData(result.data)
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

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

  const search = async () => {
    const result = await webPageReportData({
      time_grain: performanceParam.time_grain,
      start_time: `${performanceParam.start_time}`,
      end_time: `${performanceParam.end_time}`
    })
    setData(result.data)
  }

  const timeGrainChange = (e: any) => {
    setPerformanceParam({
      time_grain: e.target.value,
      start_time: `${performanceParam.start_time}`,
      end_time: `${performanceParam.end_time}`
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
          <Statistic title="首字节" value={data.quota.ttfb} suffix="ms" />
        </div>
        <div className="item">
          <Statistic title="DOM Ready" value={data.quota.dom_parse} suffix="ms" />
        </div>
        <div className="item">
          <Statistic title="页面完全加载" value={data.quota.load_page} suffix="ms" />
        </div>
        <div className="item">
          <Statistic title="采样PV" value={data.quota.pv} />
        </div>
        <div className="item">
          <Statistic title="2s 快开占比" value={data.quota.fast} suffix="%" />
        </div>
      </Card>
      <Card style={{ margin: '20px 0px' }}>
        <div className="performanceTimePicker">
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
            <Button type="primary" size="small" onClick={search}>
              搜索
            </Button>
          </div>
        </div>
        <StageTimeChart stage_time={data.stage_time} />
      </Card>
      <Card style={{ margin: '20px 0px' }}>
        <StackBarChar stack={data.stack}></StackBarChar>
      </Card>
      <Card>
        <Table dataSource={data.load_page_info_list} columns={columns} rowKey="page_url" />
      </Card>
    </>
  )
}

export default PerformancePage
