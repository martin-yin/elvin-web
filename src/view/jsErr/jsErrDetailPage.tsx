import { Card, Col, Divider, Row } from 'antd'
import React, { FC } from 'react'
import JsErrLabel from './components/jsErrLabel'
import JsErrSurvey from './components/jsErrSurvey'

import SourceMapLoadModal from './components/sourceMapLoadModal'
import StackFramesRender from './components/stackFrames'
import { useJsErrDeatilInit } from './hook/useJsErrDetail'
import './index.less'

const JsErrDetailPage: FC = () => {
  const {
    jsErr,
    setJsErr,
    stackFrames,
    visible,
    setStackFrames,
    stackFrame,
    handleOpenSourceMapModal,
    handleCloseModal,
    handleSetOriginSource
  } = useJsErrDeatilInit()

  return (
    <div>
      <Row gutter={20}>
        <Col span={18}>
          <Card>
            <JsErrSurvey jsErr={jsErr} setJsErr={jsErr} setStackFrames={setStackFrames} />
            <Divider />
            <StackFramesRender stackFrames={stackFrames} openSourceMapModal={handleOpenSourceMapModal} />
          </Card>
        </Col>
        <Col span={6}>{jsErr ? <JsErrLabel jsErr={jsErr} /> : <></>}</Col>
      </Row>
      <SourceMapLoadModal
        visible={visible}
        stackFrame={stackFrame}
        closeModal={handleCloseModal}
        setOriginSource={handleSetOriginSource}
      />
    </div>
  )
}

export default JsErrDetailPage
