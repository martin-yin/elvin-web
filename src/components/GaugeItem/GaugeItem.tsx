import React, { FC } from 'react'
import { Collapse } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import './GaugeItem.less'
import CollapseItemTable from './GaugeItemTable'

const { Panel } = Collapse

const genExtra = () => (
  <CheckCircleOutlined
    style={{ color: 'green' }}
    onClick={event => {
      event.stopPropagation()
    }}
  />
)

interface CollapseItemProps {
  type: string
  reportData: Array<any>
}

const CollapseItem: FC<CollapseItemProps> = ({ type, reportData }) => {
  return (
    <div>
      <p className={`collapse-title collapse-title-${type}`}>{type} 通过项</p>
      <Collapse expandIconPosition="right">
        {reportData.map((item, index) => {
          return (
            <Panel header={`${index + 1}、` + item.result.title} key={index} extra={genExtra()}>
              <div>{item.result.description}</div>
              <div>
                {item.id !== 'dom-size' ? (
                  item.result?.details?.type === 'table' ? (
                    <CollapseItemTable reportDataTable={item.result.details} />
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </div>
            </Panel>
          )
        })}
      </Collapse>
    </div>
  )
}

export default CollapseItem
