import { Input, Select } from 'antd'
import React, { FC } from 'react'
const { Option } = Select

const FilterHeaderItem: FC<any> = (props: { title: string }) => {
  return (
    <div className="filter-header-item">
      <div className="filter-header-item-label">
        <span>{props.title}：</span>
      </div>
      <div className="filter-header-item-content">
        <Input.Group compact>
          <Select defaultValue="=">
            <Option value="=">等于</Option>
            <Option value="!=">不等于</Option>
          </Select>
          <Select
            className="filter-header-item-content-select"
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder={'请选择' + props.title}
          ></Select>
        </Input.Group>
      </div>
    </div>
  )
}

export default FilterHeaderItem
