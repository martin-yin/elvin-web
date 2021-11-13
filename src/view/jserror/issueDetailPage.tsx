import { Card, Col, Divider, Row } from 'antd'
import React, { FC } from 'react'
import IssueLabel from './components/issueLabel'
import IssueSurvey from './components/issueSurvey'

import SourceMapLoadModal from './components/sourceMapLoadModal'
import StackFramesRender from './components/stackFrames'
import { useJsErrorInit } from './hook/useJsError'
import './index.less'

const IssueDetailPage: FC = () => {
  const {
    issue,
    setIssue,
    stackFrames,
    visible,
    setStackFrames,
    stackFrame,
    handleOpenSourceMapModal,
    handleCloseModal,
    handleSetOriginSource
  } = useJsErrorInit()

  return (
    <div>
      <Row gutter={20}>
        <Col span={18}>
          <Card>
            <IssueSurvey issue={issue} setIssue={setIssue} setStackFrames={setStackFrames} />
            <Divider />
            <StackFramesRender stackFrames={stackFrames} openSourceMapModal={handleOpenSourceMapModal} />
          </Card>
        </Col>
        <Col span={6}>{issue ? <IssueLabel issue={issue} /> : <></>}</Col>
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

export default IssueDetailPage
