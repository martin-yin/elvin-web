import { DatePicker, Radio } from 'antd'
import moment from 'moment'
import React, { FC, useState } from 'react'
import './index.less'

const { RangePicker } = DatePicker
const TimePickerChart: FC<any> = ({ onTimeChange, startTime, endTime, children }) => {
  const [timeGrain, setTimeGrain] = useState('minute')

  const disabledDate = (current: any) => {
    return current && current >= moment()
  }

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
    onTimeChange(dateStrings, time_grain)
  }

  const timeGrainChange = (e: any) => {
    setTimeGrain(e.target.value)
  }

  return (
    <>
      <div className="time_chart_picker_warp">
        <div className="time_picker">
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
        <div className="time_grain">
          <p>时间粒度：</p>
          <Radio.Group onChange={timeGrainChange} value={timeGrain}>
            <Radio value={'minute'}>分钟</Radio>
            <Radio value={'hour'}>小时</Radio>
            <Radio value={'day'}>天</Radio>
          </Radio.Group>
        </div>
      </div>
      {children}
    </>
  )
}

export default TimePickerChart
