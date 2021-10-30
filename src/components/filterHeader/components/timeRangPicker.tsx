import React, { DatePicker, Select } from 'antd'
import moment from 'moment'
import { FC } from 'react'
import { useFilterHeaderInit } from '../hook/useFilterHeaderInit'
const { Option } = Select
const { RangePicker } = DatePicker

const TimeRangPicker: FC<any> = () => {
  const { timePicker, setTimePicker } = useFilterHeaderInit()

  const onTimeChange = (dates: any, dateString: [string, string]) => {
    setTimePicker({
      ...timePicker,
      startTime: dateString[0],
      endTime: dateString[1]
    })
  }

  const onTimeGrainChange = (e: string) => {
    setTimePicker({
      ...timePicker,
      timeGrain: e
    })
  }

  const disabledDate = (current: any) => {
    return current && current >= moment()
  }

  return (
    <div className="filter-header-item">
      <div className="filter-header-item-label">
        <span>时间范围：</span>
      </div>
      <Select value={timePicker.timeGrain} style={{ width: 88 }} onChange={onTimeGrainChange}>
        <Option value="minute">分钟</Option>
        <Option value="hour">小时</Option>
        <Option value="day">天</Option>
      </Select>
      <div className="time-picker-control">
        <RangePicker
          disabledDate={disabledDate}
          defaultValue={[moment(timePicker.startTime, 'YYYY-MM-DD'), moment(timePicker.endTime, 'YYYY-MM-DD')]}
          ranges={{
            今天: [moment(), moment()],
            昨天: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            最近七天: [moment().subtract(6, 'days'), moment()],
            近一个月: [moment().subtract(1, 'month'), moment()]
          }}
          onChange={onTimeChange}
        />
      </div>
    </div>
  )
}

export default TimeRangPicker
