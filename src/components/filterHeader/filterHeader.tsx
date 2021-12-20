import { Card, Space } from 'antd'
import React, { FC } from 'react'
import './index.less'
import TimeRangPicker from './components/timeRangPicker'
import FilterHeaderItem from './components/filterHeaderItem'

const FilterHeader: FC<any> = () => {
  return (
    <Card className="filter-header">
      <Space>
        <TimeRangPicker />
        <FilterHeaderItem title="UUID" />
        <FilterHeaderItem title="SessionId" />
      </Space>
    </Card>
  )
}

export default FilterHeader
