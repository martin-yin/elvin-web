import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Space, Table, Tabs } from 'antd'
import './index.less'
import moment from 'moment'
import HttpStageTimeChart from '../../components/charts/httpChart/stageTimeChart'
import { GetHttpList, GetHttpQuota, GetHttpStage } from '../../request/http'
import { HttpIF } from '../../interface'
import HeaderQuota from '../../components/headerQuota/headerQuota'
import TimePickerChart from '../../components/timeChartPicker/timePickerChart'

const { TabPane } = Tabs

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

  const onTimeChange = (dateStrings: any, time_grain: string) => {
    setHttpParam({
      start_time: dateStrings[0],
      end_time: dateStrings[1],
      time_grain: time_grain,
      stage_type: httpParam.stage_type
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

  const quotaTitleUnitKey = [
    {
      title: '请求次数',
      key: 'total',
      unit: ''
    },
    {
      title: '请求耗时',
      key: 'load_time',
      unit: 'ms'
    },
    {
      title: '成功率',
      key: 'success_rate',
      unit: '%'
    },
    {
      title: '异常影响用户',
      key: 'error_user',
      unit: ''
    }
  ]

  return (
    <>
      <div>
        <HeaderQuota quotaTitleUnitKey={quotaTitleUnitKey} quota={quota} />
        <Space className="http__consume_time_warp" size={20}>
          <Card className="consume_time_ranking">
            {httpList.map((item: any, key: number) => {
              return (
                <div key={key} className="consume_time_ranking_item flex">
                  <div className="flex-grow-1">{item.http_url}</div>
                  <div className="flex-grow-0">耗时{item.load_time}ms</div>
                </div>
              )
            })}
          </Card>
          <Card className="time__pciker_chart_warp">
            <Tabs defaultActiveKey="1">
              <TabPane tab="成功率" key="1"></TabPane>
              <TabPane tab="成功耗时" key="2"></TabPane>
              <TabPane tab="失败耗时" key="3"></TabPane>
            </Tabs>
            <TimePickerChart onTimeChange={onTimeChange} startTime={httpParam.start_time} endTime={httpParam.end_time}>
              <HttpStageTimeChart stageTime={stageTime} />
            </TimePickerChart>
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
