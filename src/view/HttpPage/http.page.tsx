import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button, Card, DatePicker, Radio, Statistic, Table, Tabs, Tooltip } from 'antd'
import './index.less'
import { httpData, httpStageData } from '../../request'
import { InfoCircleFilled } from '@ant-design/icons'
import moment from 'moment'
import HttpStageTimeChart from '../../components/HttpChart/stage.time.chart'
import { useAppState } from '../../stores'
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const HttpPage: FC = () => {
  const { monitorId } = useAppState(state => state.appsotre)
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

    console.log(httpStageDataResult.data.http_stagetime)
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
      title: '请求用户',
      dataIndex: 'user_total',
      key: 'user_total'
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

  return (
    <>
      <div>
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
            <Statistic title="请求耗时" value={data.http_quota.load_time} suffix="ms" />
          </div>
        </Card>
        <Card style={{ marginBottom: '20px' }}>
          <p className="quota-tips">
            <Tooltip title="Http请求性能只计算正常请求, 400 404 500等不列入计算范围！">
              <InfoCircleFilled style={{ fontSize: '16px', color: '#3399FF' }} />
            </Tooltip>
          </p>
          <div className="timePickerContainer">
            <div className="timePicker">
              <RangePicker
                disabledDate={disabledDate}
                defaultValue={[moment(httpParam.start_time, 'YYYY-MM-DD'), moment(httpParam.end_time, 'YYYY-MM-DD')]}
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
          <HttpStageTimeChart stageTime={httpStagetime} />
        </Card>
        <Card>
          <Table dataSource={data.http_info_list} columns={columns} rowKey="http_url" />
        </Card>
      </div>
    </>
  )
}

export default HttpPage
