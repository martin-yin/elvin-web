import { Card, Col, Divider, Row } from 'antd'
import React, { FC } from 'react'
import { ListLable, ListLableItem } from '../../components/listLable/listLable'
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
        <Col span={6}>
          {issue ? (
            <Card>
              <ListLable title="概要">
                <ListLableItem label="monitor_id">{issue.monitor_id}</ListLableItem>
                <ListLableItem label="URL">{issue.page_url}</ListLableItem>
                <ListLableItem label="时间">{issue.created_at}</ListLableItem>
              </ListLable>
              <ListLable title="位置">
                <ListLableItem label="ip">{issue.ip}</ListLableItem>
                <ListLableItem label="地址">
                  {issue.nation + issue.province + issue.city + issue.district}
                </ListLableItem>
              </ListLable>
              <ListLable title="网络">
                <ListLableItem label="网络">未知</ListLableItem>
                <ListLableItem label="运行商">未知</ListLableItem>
              </ListLable>
            </Card>
          ) : (
            <></>
          )}
        </Col>
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
