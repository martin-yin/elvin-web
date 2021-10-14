import { Card, Table, Tabs } from 'antd'
import moment from 'moment'
import React, { FC, useCallback, useEffect, useState } from 'react'
import HttpStageTimeChart from '../../components/charts/httpChart/stageTimeChart'
import HeaderQuota from '../../components/headerQuota/headerQuota'
import TimePickerChart from '../../components/timeChartPicker/timePickerChart'
import { HttpIF } from '../../interface'
import { GetHttpList, GetHttpQuota, GetHttpStage } from '../../request/http'
import './index.less'
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
      setQUota({
        ...data,
        success_rate: ((data.success_total / data.total) * 100).toFixed(2).toString()
      })
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
      dataIndex: 'url',
      key: 'url'
    },
    {
      title: '请求用户',
      dataIndex: 'user_total',
      key: 'user_total'
    },
    {
      title: '慢查询',
      dataIndex: 'user_slow',
      key: 'user_slow'
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
      <HeaderQuota quotaTitleUnitKey={quotaTitleUnitKey} quota={quota} />
      <Card className="time__pciker_chart_warp">
        <TimePickerChart onTimeChange={onTimeChange} startTime={httpParam.start_time} endTime={httpParam.end_time}>
          <HttpStageTimeChart stageTime={stageTime} />
        </TimePickerChart>
      </Card>
      <Card>
        <Table dataSource={httpList} columns={columns} rowKey="url" />
      </Card>
    </>
  )
}

export default HttpPage

// import { Card, Table, Tabs } from 'antd'
// import moment from 'moment'
// import React, { FC, useCallback, useEffect, useState } from 'react'
// import HttpStageTimeChart from '../../components/charts/httpChart/stageTimeChart'
// import HeaderQuota from '../../components/headerQuota/headerQuota'
// import TimePickerChart from '../../components/timeChartPicker/timePickerChart'
// import { HttpIF } from '../../interface'
// import { GetHttpList, GetHttpQuota, GetHttpStage } from '../../request/http'
// import './index.less'

// const HttpPage: FC = () => {
//   const [httpParam, setHttpParam] = useState({
//     time_grain: 'minute',
//     start_time: moment().format('YYYY-MM-DD'),
//     end_time: moment().format('YYYY-MM-DD'),
//     stage_type: 'success'
//   })

//   return (
//     <>
//       <div>
//         <Card>
//           <RenderTable httpParam={httpParam} />
//         </Card>
//       </div>
//     </>
//   )
// }

// export default HttpPage
