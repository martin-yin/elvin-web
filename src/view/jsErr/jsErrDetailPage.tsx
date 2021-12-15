import { Card, Col, Divider, Row } from 'antd'
import React, { FC } from 'react'
import JsErrLabel from './components/jsErrLabel'
import JsErrSurvey from './components/jsErrSurvey'
import SourceMapLoadModal from './components/sourceMapLoadModal'

import StackFramesRender from './components/stackFrames'
import { JsErrorProvider, useJsErrContext, useJsErrDeatilInit } from './hook/useJsErrDetail'
import './index.less'

const JsErrDetailPage: FC = () => {
  //

  const JsErrContextDiv = () => {
    const [jsErrorContext, setJsErrContxt] = useJsErrContext()

    console.log(jsErrorContext, '=========')

    useJsErrDeatilInit(jsErrorContext, setJsErrContxt)

    return (
      <>
        <Row gutter={20}>
          <Col span={18}>
            <Card>
              <JsErrSurvey />
              <Divider />
              <StackFramesRender />
            </Card>
          </Col>
          <Col span={6}>
            <JsErrLabel />
          </Col>
        </Row>
        <SourceMapLoadModal
          visible={false}
          // stackFrame={stackFrame}
          // closeModal={handleCloseModal}
          // setOriginSource={handleSetOriginSource}
        />
      </>
    )
  }

  return (
    <JsErrorProvider>
      <JsErrContextDiv />
    </JsErrorProvider>
  )
}

export default JsErrDetailPage
