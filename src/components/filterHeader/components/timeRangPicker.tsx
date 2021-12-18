import React, { DatePicker } from 'antd'
import moment from 'moment'
import { FC } from 'react'
import { useFilterHeaderContext } from '../hook/useFilterHeaderInit'
const { RangePicker } = DatePicker

const TimeRangPicker: FC = () => {
  const { filterHeaderParams, handleTimeChange } = useFilterHeaderContext()
  const disabledDate = current => {
    return current && current >= moment()
  }

  return (
    <div className="filter-header-item">
      <div className="filter-header-item-label">
        <span>时间范围：</span>
      </div>
      <div className="time-picker-control">
        <RangePicker
          disabledDate={disabledDate}
          defaultValue={[
            moment(filterHeaderParams.startTime, 'YYYY-MM-DD'),
            moment(filterHeaderParams.endTime, 'YYYY-MM-DD')
          ]}
          ranges={{
            今天: [moment(), moment()],
            昨天: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            最近七天: [moment().subtract(6, 'days'), moment()],
            近一个月: [moment().subtract(1, 'month'), moment()]
          }}
          onChange={handleTimeChange}
        />
      </div>
    </div>
  )
}

export default TimeRangPicker
