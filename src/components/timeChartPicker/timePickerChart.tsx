import { DatePicker, Radio } from 'antd'
import moment from 'moment'
import React, { FC, useState } from 'react'
import './index.less'

const { RangePicker } = DatePicker
const TimePickerChart: FC<any> = ({ onTimeChange, startTime, endTime, children }) => {
  const [timeGrain, setTimeGrain] = useState('minute')

  const disabledDate = current => {
    return current && current >= moment()
  }

  const timeChange = (dates, dateStrings: [string, string]) => {
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

  const timeGrainChange = e => {
    setTimeGrain(e.target.value)
  }

  return <>{children}</>
}

export default TimePickerChart
