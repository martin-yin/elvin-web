import { Card, Space } from 'antd'
import React, { FC } from 'react'
import './index.less'
import TimeRangPicker from './components/timeRangPicker'
import FilterHeaderItem from './components/filterHeaderItem'

const FilterHeader: FC<any> = () => {
  return (
    <Card className="filter-header">
      <TimeRangPicker />
      <Space>
        <FilterHeaderItem title="浏览器版本" />
        <FilterHeaderItem title="国家/地区" />
        <FilterHeaderItem title="UUID" />
        <FilterHeaderItem title="页面" />
      </Space>
    </Card>
  )
}

export default FilterHeader
