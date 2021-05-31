import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button, Card, DatePicker, Radio, Space, Statistic, Table, Tabs, Tooltip } from 'antd'
import './index.less'
import { InfoCircleFilled } from '@ant-design/icons'
import moment from 'moment'
import HttpStageTimeChart from '../../components/charts/httpChart/stageTimeChart'
import { GetHttpList, GetHttpQuota, GetHttpStage } from '../../request/http'
import { HttpIF } from '../../interface'

const { TabPane } = Tabs
const { RangePicker } = DatePicker

const HttpPage: FC = () => {
  const [quota, setQUota] = useState<HttpIF.Quota>({
    error_user: 0,
    load_time: 0,
    success_total: 0,
    total: 0,
    success_rate: ''
  })
  const [httpList, setHttpList] = useState<HttpIF.HttpUrlList>([])
  const [stageTime, setStageTime] = useState<HttpIF.StageTimeList>([])

  const [httpParam, setHttpParam] = useState({
    time_grain: 'minute',
    start_time: moment().format('YYYY-MM-DD'),
    end_time: moment().format('YYYY-MM-DD'),
    stage_type: 'success'
  })

  const initQuotaData = useCallback(async () => {
    const { code, data } = await GetHttpQuota({
      ...httpParam
    })
    if (code == 200) {
      setQUota(data)
    }
  }, [httpParam])

  const initHttpListData = useCallback(async () => {
    const { code, data } = await GetHttpList({
      ...httpParam
    })
    if (code == 200) {
      setHttpList(data)
    }
  }, [httpParam])

  const initStageTimeData = useCallback(async () => {
    const { code, data } = await GetHttpStage({
      ...httpParam
    })
    if (code == 200) {
      setStageTime(data)
    }
  }, [httpParam])

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
      ...httpParam,
      time_grain: e.target.value
    })
  }

  useEffect(() => {
    initQuotaData()
    initHttpListData()
    initStageTimeData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <Card className="header-quota">
          <p className="quota-tips">
            <Tooltip title="今日数据指标">
              <InfoCircleFilled style={{ fontSize: '16px', color: '#3399FF' }} />
            </Tooltip>
          </p>
          <div className="item">
            <Statistic title="请求次数" value={quota.total} suffix="" />
          </div>
          <div className="item">
            <Statistic title="请求耗时" value={quota.load_time} suffix="ms" />
          </div>
          <div className="item">
            <Statistic title="成功率" value={quota.success_rate} suffix="%" />
          </div>
          <div className="item">
            <Statistic title="异常影响用户" value={quota.error_user} />
          </div>
        </Card>

        <Space className="httpTime" size={20}>
          <Card className="httpRanking">
            <div className="">
              {httpList.map((item: any, key: number) => {
                return (
                  <div key={key} className="httpRankingItem flex">
                    <div className="flex-grow-1">{item.http_url}</div>
                    <div className="flex-grow-0">耗时{item.load_time}ms</div>
                  </div>
                )
              })}
            </div>
          </Card>
          <Card className="timeCharts">
            <Tabs defaultActiveKey="1">
              <TabPane tab="成功率" key="1"></TabPane>
              <TabPane tab="成功耗时" key="2"></TabPane>
              <TabPane tab="失败耗时" key="3"></TabPane>
            </Tabs>
            <div className="time_picker_warp">
              <div className="time_picker">
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
              <div className="time_grain">
                <p>时间粒度：</p>
                <Radio.Group onChange={timeGrainChange} value={httpParam.time_grain}>
                  <Radio value={'minute'}>分钟</Radio>
                  <Radio value={'hour'}>小时</Radio>
                  <Radio value={'day'}>天</Radio>
                </Radio.Group>
                <Button type="primary" size="small">
                  搜索
                </Button>
              </div>
            </div>
            <HttpStageTimeChart stageTime={stageTime} />
          </Card>
        </Space>
        <Card>
          <Table dataSource={httpList} columns={columns} rowKey="http_url" />
        </Card>
      </div>
    </>
  )
}

export default HttpPage
