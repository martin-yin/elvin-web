import { Collapse, Empty, Form } from 'antd'
import React, { FC } from 'react'
import { CaretRightOutlined } from '@ant-design/icons'
import { Issue } from '../../../interface/issue.interface'
import StackFrameItem from './stackFrameItem'
import { useJsErrorInit } from '../hook/useJsError'
import SourceMapLoadModal from './sourceMapLoadModal'
const { Panel } = Collapse

const StackFramesRender: FC = () => {
  const [form] = Form.useForm()
  const { stackFrames, stackFrame, visible, handleCloseModal, handleOpenSourceMapModal, handleSetOriginSource } =
    useJsErrorInit()

  return (
    <>
      <SourceMapLoadModal
        visible={visible}
        stackFrame={stackFrame}
        form={form}
        setOriginSource={handleSetOriginSource}
        closeModal={() => {
          handleCloseModal()
        }}
      />
      <h4>Js异常堆栈:</h4>
      {stackFrames.length > 0 ? (
        <Collapse
          bordered={false}
          accordion
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          className="site-collapse-custom-collapse"
        >
          {stackFrames.map((item: Issue.StackFrames, index: number) => {
            return (
              <Panel header={item.fileName} key={index} className="site-collapse-custom-panel">
                <StackFrameItem item={item} index={index} openSourceMapModal={handleOpenSourceMapModal} />
              </Panel>
            )
          })}
        </Collapse>
      ) : (
        <Empty></Empty>
      )}
    </>
  )
}
export default StackFramesRender
