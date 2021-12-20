import { Collapse, Empty } from 'antd'
import React from 'react'
import { CaretRightOutlined } from '@ant-design/icons'
import { JsErrIF } from '../../../interface/jsErr.interface'
import StackFrameItem from './stackFrameItem'
const { Panel } = Collapse

const StackFramesRender = React.memo<{ stackFrames: Array<JsErrIF.StackFrame> }>(({ stackFrames }) => {
  return (
    <>
      <h4>Js异常堆栈:</h4>
      {stackFrames?.length > 0 ? (
        <Collapse
          bordered={false}
          accordion
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          className="site-collapse-custom-collapse"
        >
          {stackFrames.map((item: JsErrIF.StackFrame, index: number) => {
            return (
              <Panel header={item.fileName} key={index} className="site-collapse-custom-panel">
                <StackFrameItem item={item} index={index} />
              </Panel>
            )
          })}
        </Collapse>
      ) : (
        <Empty></Empty>
      )}
    </>
  )
})
export default StackFramesRender
