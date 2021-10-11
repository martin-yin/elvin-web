import { Card, Col, DatePicker, Input, Row } from 'antd'
import React, { FC, useState } from 'react'
import { Select } from 'antd'
const { Option } = Select
import './index.less'

import moment from 'moment'
const { RangePicker } = DatePicker
const FilterHeader: FC<any> = ({ onTimeChange, startTime, endTime, children }) => {
  const disabledDate = (current: any) => {
    return current && current >= moment()
  }
  const [timeGrain, setTimeGrain] = useState('minute')
  const timeChange = (dates: any, dateStrings: [string, string]) => {
    const time = dates[1].diff(dates[0], 'days')
    let time_grain = timeGrain
    if (time > 0 && time <= 6) {
      time_grain = 'hour'
    } else if (time > 6) {
      time_grain = 'day'
    } else {
      time_grain = 'minute'
    }

    setTimeGrain(time_grain)
    console.log(dateStrings, time_grain)
  }

  const timeGrainChange = (e: string) => {
    setTimeGrain(e)
  }

  return (
    <Card className="filter-header">
      <div>
        <div className="filter-header-item">
          <div className="filter-header-item-label">
            <span>时间范围：</span>
          </div>
          <Select value={timeGrain} style={{ width: 88 }} onChange={timeGrainChange}>
            <Option value="minute">分钟</Option>
            <Option value="hour">小时</Option>
            <Option value="day">天</Option>
          </Select>
          <div className="time-picker-control">
            <RangePicker
              disabledDate={disabledDate}
              defaultValue={[moment(startTime, 'YYYY-MM-DD'), moment(endTime, 'YYYY-MM-DD')]}
              ranges={{
                今天: [moment(), moment()],
                昨天: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                最近七天: [moment().subtract(6, 'days'), moment()],
                近一个月: [moment().subtract(1, 'month'), moment()]
              }}
              onChange={timeChange}
            />
          </div>
        </div>
        {children}
      </div>
    </Card>
  )
}

export default FilterHeader
