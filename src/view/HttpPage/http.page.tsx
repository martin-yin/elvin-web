import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button, Card, DatePicker, Radio, Statistic, Table, Tabs, Tooltip } from 'antd'
import './index.less'
import { webPageHttpData } from '../../request'
import { InfoCircleFilled } from '@ant-design/icons'
import moment from 'moment'
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const HttpPage: FC = () => {
  const [data, setData] = useState({
    http_quota: {
      error_user: 0,
      load_time: 0,
      success_total: 1611,
      total: 1611
    },
    http_info_list: []
  })

  const initData = useCallback(async () => {
    const result = await webPageHttpData()
    setData(result.data)
  }, [])

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
            <Statistic
              title="成功率"
              value={(data.http_quota.success_total / data.http_quota.total) * 100}
              suffix="%"
            />
          </div>
          <div className="item">
            <Statistic title="请求耗时" value={data.http_quota.load_time} suffix="ms" />
          </div>
          <div className="item">
            <Statistic title="失败影响用户" value={data.http_quota.error_user} />
          </div>
        </Card>
        <Card style={{ marginBottom: '20px' }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="成功率" key="1">
              <div className="performanceTimePicker">
                <div className="timePicker">
                  <RangePicker
                    defaultValue={[moment(), moment()]}
                    ranges={{
                      今天: [moment(), moment()],
                      昨天: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                      最近七天: [moment().subtract(6, 'days'), moment()],
                      近一个月: [moment().subtract(1, 'month'), moment()]
                    }}
                  />
                </div>
                <div className="timeGrain">
                  <p>时间粒度：</p>
                  <Radio.Group>
                    <Radio value={'minute'}>分钟</Radio>
                    <Radio value={'hour'}>小时</Radio>
                    <Radio value={'day'}>天</Radio>
                  </Radio.Group>
                  <Button type="primary" size="small">
                    搜索
                  </Button>
                </div>
              </div>
            </TabPane>
            <TabPane tab="成功耗时" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="失败耗时" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Card>
        <Card>
          <Table dataSource={data.http_info_list} columns={columns} rowKey="http_url" />
        </Card>
      </div>
    </>
  )
}

export default HttpPage
