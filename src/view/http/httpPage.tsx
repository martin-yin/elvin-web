import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button, Card, DatePicker, Radio, Space, Statistic, Table, Tabs, Tooltip } from 'antd'
import './index.less'
import { InfoCircleFilled } from '@ant-design/icons'
import moment from 'moment'
import { HttpQuotaAndList, HttpStageTimeList } from '../../interface/http.interface'
import HttpStageTimeChart from '../../components/charts/httpChart/stageTimeChart'
import { httpData, httpStageData } from '../../request/http'

const { TabPane } = Tabs
const { RangePicker } = DatePicker

const HttpPage: FC = () => {
  const [httpQuotaAndList, setHttpQuotaAndList] = useState<HttpQuotaAndList>({
    http_quota: {
      error_user: 0,
      load_time: 0,
      success_total: 0,
      total: 0,
      success_rate: ''
    },
    http_list: []
  })
  const [httpStageTimeList, setHttpStageTimeList] = useState<HttpStageTimeList>([])
  const [httpParam, setHttpParam] = useState({
    time_grain: 'minute',
    start_time: moment().format('YYYY-MM-DD'),
    end_time: moment().format('YYYY-MM-DD'),
    stage_type: 'success'
  })

  const initHttpQuotaAndList = useCallback(async () => {
    const {
      code,
      data: { http_quota, http_list }
    } = await httpData({
      ...httpParam
    })
    if (code == 0) {
      http_quota.success_rate = ((http_quota.success_total / http_quota.total) * 100).toFixed(2)
      setHttpQuotaAndList({
        http_quota,
        http_list
      })
    }
  }, [httpParam])

  const initHttpStageTimeList = useCallback(async () => {
    const {
      code,
      data: { http_stagetime }
    } = await httpStageData({
      ...httpParam
    })
    if (code == 0) {
      setHttpStageTimeList(http_stagetime)
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
  const search = async () => {
    const result = await httpStageData({
      ...httpParam
    })
    setHttpStageTimeList(result.data.http_stagetime)
  }

  useEffect(() => {
    initHttpQuotaAndList()
    initHttpStageTimeList()
  }, [initHttpQuotaAndList, initHttpStageTimeList])

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
            <Statistic title="请求次数" value={httpQuotaAndList.http_quota.total} suffix="" />
          </div>
          <div className="item">
            <Statistic title="请求耗时" value={httpQuotaAndList.http_quota.load_time} suffix="ms" />
          </div>
          <div className="item">
            <Statistic title="成功率" value={httpQuotaAndList.http_quota.success_rate} suffix="%" />
          </div>
          <div className="item">
            <Statistic title="异常影响用户" value={httpQuotaAndList.http_quota.error_user} />
          </div>
        </Card>

        <Space className="httpTime" size={20}>
          <Card className="httpRanking">
            <div className="">
              {httpQuotaAndList.http_list.map((item: any, key: number) => {
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
            <HttpStageTimeChart stageTime={httpStageTimeList} />
          </Card>
        </Space>
        <Card>
          <Table dataSource={httpQuotaAndList.http_list} columns={columns} rowKey="http_url" />
        </Card>
      </div>
    </>
  )
}

export default HttpPage
