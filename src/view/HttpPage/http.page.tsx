import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button, Card, DatePicker, Radio, Statistic, Table, Tabs, Tooltip } from 'antd'
import './index.less'
import { httpData, httpStageData } from '../../request'
import { InfoCircleFilled } from '@ant-design/icons'
import moment from 'moment'
import HttpStageTimeChart from '../../components/HttpChart/stage.time.chart'
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const HttpPage: FC = () => {
  const [data, setData] = useState({
    http_quota: {
      error_user: 0,
      load_time: 0,
      success_total: 0,
      total: 0,
      success_rate: 0
    },
    http_info_list: []
  })
  const [httpStagetime, setHttpStagetime] = useState([])
  const [httpParam, setHttpParam] = useState({
    time_grain: 'minute',
    start_time: moment().format('YYYY-MM-DD'),
    end_time: moment().format('YYYY-MM-DD'),
    stage_type: 'success'
  })

  const initData = useCallback(async () => {
    const result = await httpData({
      time_grain: httpParam.time_grain,
      start_time: httpParam.start_time,
      end_time: httpParam.end_time,
      stage_type: httpParam.stage_type
    })
    const httpStageDataResult = await httpStageData({
      time_grain: httpParam.time_grain,
      start_time: httpParam.start_time,
      end_time: httpParam.end_time,
      stage_type: httpParam.stage_type
    })
    setHttpStagetime(httpStageDataResult.data.http_stagetime)
    setData(result.data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onTimeChange = (dates: any, dateStrings: [string, string]) => {
    const time = dates[1].diff(dates[0], 'days')
    let time_grain = httpParam.time_grain
    if (time > 0 && time <= 6) {
      time_grain = 'hour'
    } else if (time > 6) {
      time_grain = 'day'
    } else {
      time_grain = 'minute'
    }
    setHttpParam({
      start_time: dateStrings[0],
      end_time: dateStrings[1],
      time_grain: time_grain,
      stage_type: httpParam.stage_type
    })
  }

  const timeGrainChange = (e: any) => {
    setHttpParam({
      time_grain: e.target.value,
      start_time: httpParam.start_time,
      end_time: httpParam.end_time,
      stage_type: httpParam.stage_type
    })
  }
  const search = async () => {
    const result = await httpStageData({
      time_grain: httpParam.time_grain,
      start_time: httpParam.start_time,
      end_time: httpParam.end_time,
      stage_type: httpParam.stage_type
    })
    setHttpStagetime(result.data.http_stagetime)
  }

  useEffect(() => {
    initData()
  }, [initData])

  const columns = [
    {
      title: '请求URL',
      dataIndex: 'http_url',
      key: 'http_url'
    },
    {
      title: '成功率',
      dataIndex: 'success_rate',
      key: 'success_rate',
      render: (text: string, record: any) => <>{(record.success_total / record.total) * 100}%</>
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
    }
  ]

  const disabledDate = (current: any) => {
    return current && current >= moment()
  }

  const tabChange = async (activeKey: string) => {
    let stage_type = ''
    if (activeKey === '1') {
      stage_type = 'success'
    } else {
      stage_type = 'fail'
    }
    setHttpParam({
      time_grain: httpParam.time_grain,
      start_time: httpParam.start_time,
      end_time: httpParam.end_time,
      stage_type: stage_type
    })
    const httpStageDataResult = await httpStageData({
      time_grain: httpParam.time_grain,
      start_time: httpParam.start_time,
      end_time: httpParam.end_time,
      stage_type: stage_type
    })
    setHttpStagetime(httpStageDataResult.data.http_stagetime)
  }
  return (
    <>
      <div className="site-layout-content">
        <Card className="header-quota" style={{ marginBottom: '20px' }}>
          <p className="quota-tips">
            <Tooltip title="今日数据指标">
              <InfoCircleFilled style={{ fontSize: '16px', color: '#3399FF' }} />
            </Tooltip>
          </p>
          <div className="item">
            <Statistic title="请求次数" value={data.http_quota.total} suffix="" />
          </div>
          <div className="item">
            <Statistic title="成功率" value={data.http_quota.success_rate} suffix="%" />
          </div>
          <div className="item">
            <Statistic title="请求耗时" value={data.http_quota.load_time} suffix="ms" />
          </div>
          <div className="item">
            <Statistic title="失败影响用户" value={data.http_quota.error_user} />
          </div>
        </Card>
        <Card style={{ marginBottom: '20px' }}>
          <Tabs defaultActiveKey="1" onChange={tabChange}>
            <TabPane tab="成功请求" key="1">
              <div className="performanceTimePicker">
                <div className="timePicker">
                  <RangePicker
                    disabledDate={disabledDate}
                    defaultValue={[
                      moment(httpParam.start_time, 'YYYY-MM-DD'),
                      moment(httpParam.end_time, 'YYYY-MM-DD')
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
                  <Radio.Group onChange={timeGrainChange} value={httpParam.time_grain}>
                    <Radio value={'minute'}>分钟</Radio>
                    <Radio value={'hour'}>小时</Radio>
                    <Radio value={'day'}>天</Radio>
                  </Radio.Group>
                  <Button type="primary" size="small" onClick={search}>
                    搜索
                  </Button>
                </div>
              </div>
            </TabPane>
            <TabPane tab="失败请求" key="2">
              <div className="performanceTimePicker">
                <div className="timePicker">
                  <RangePicker
                    disabledDate={disabledDate}
                    defaultValue={[
                      moment(httpParam.start_time, 'YYYY-MM-DD'),
                      moment(httpParam.end_time, 'YYYY-MM-DD')
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
                  <Radio.Group onChange={timeGrainChange} value={httpParam.time_grain}>
                    <Radio value={'minute'}>分钟</Radio>
                    <Radio value={'hour'}>小时</Radio>
                    <Radio value={'day'}>天</Radio>
                  </Radio.Group>
                  <Button type="primary" size="small" onClick={search}>
                    搜索
                  </Button>
                </div>
              </div>
            </TabPane>
          </Tabs>
          <HttpStageTimeChart stageTime={httpStagetime} stageType={httpParam.stage_type} />
        </Card>
        <Card>
          <Table dataSource={data.http_info_list} columns={columns} rowKey="http_url" />
        </Card>
      </div>
    </>
  )
}

export default HttpPage
