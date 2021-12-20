import { Card, Col, Divider, Row } from 'antd'
import React, { FC } from 'react'
import JsErrLabel from './components/jsErrLabel'
import JsErrSurvey from './components/jsErrSurvey'
import SourceMapLoadModal from './components/sourceMapLoadModal'
import StackFramesRender from './components/stackFrames'
import { JsErrorProvider, useJsErrContext } from './hook/useJsErrDetail'
import './index.less'

const JsErrDetailPage: FC = () => {
  const JsErrContextRender = () => {
    const {
      jsErrData: { jsErr, visible, stackFrames }
    } = useJsErrContext()
    return (
      <>
        <Row gutter={20}>
          <Col span={18}>
            <Card>
              <JsErrSurvey jsErr={jsErr} />
              <Divider />
              <StackFramesRender stackFrames={stackFrames} />
            </Card>
          </Col>
          <Col span={6}>
            <JsErrLabel jsErr={jsErr} />
          </Col>
        </Row>
        <SourceMapLoadModal visible={visible} />
      </>
    )
  }

  return (
    <JsErrorProvider>
      <JsErrContextRender />
    </JsErrorProvider>
  )
}

export default JsErrDetailPage
