import { CaretRightOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons'
import { Button, Card, Col, Collapse, Divider, Empty, Form, message, Row, Space } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BrowserIcon from '../../assets/webIcons/browse.png'
import IpIcon from '../../assets/webIcons/ip.png'
import PcIcon from '../../assets/webIcons/pc.png'
import WindowIcon from '../../assets/webIcons/window.png'
import SourceMapLoadModal from '../../components/issue/sourceMap'
import StackFramesItem from '../../components/issue/stackFramesItem'
import { ListLable, ListLableItem } from '../../components/listLable/listLable'
import { Issue } from '../../interface/issue.interface'
import { GetIssuesDetail } from '../../request'
import './index.less'

const { Panel } = Collapse
const IssueDetailPage: FC = () => {
  const params = useParams<'error_id'>()
  const [form] = Form.useForm()
  const [issue, setIssue] = useState<Issue.Issue>()
  const [stackFramesList, setStackFramesList] = useState<Issue.StackFramesList>([])

  const [stackFrame, setStackFrame] = useState<any>({
    url: '',
    line: 0,
    column: 0,
    index: 0
  })

  const [visible, setVisible] = useState(false)

  const initStackTrackData = useCallback(async () => {
    const result = await GetIssuesDetail({
      issue_id: +params.error_id,
      error_id: 0
    })
    setIssue(result.data)
    setStackFramesList(JSON.parse(result.data.stack_frames))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onClose = () => {
    setVisible(false)
  }

  const changeIssue = async (id: number) => {
    if (id == 0) {
      message.warn('没有下一个问题了！')
      return
    }
    const result = await GetIssuesDetail({
      error_id: id,
      issue_id: 0
    })
    setIssue(result.data)
    setStackFramesList(JSON.parse(result.data.stack_frames))
  }

  const onCreate = result => {
    stackFramesList[result.index].origin_source = {
      ...result
    }
    setStackFramesList(stackFramesList)
    setVisible(false)
  }

  useEffect(() => {
    initStackTrackData()
  }, [initStackTrackData])

  useEffect(() => {
    form.resetFields()
  }, [visible, form])

  return (
    <div>
      <Row gutter={20}>
        <Col span={18}>
          <Card>
            {issue ? (
              <>
                <div>
                  <Space>
                    <h2>
                      {issue.error_name}: {issue.message}
                    </h2>
                  </Space>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <p>{issue.componentName}</p>
                </div>
                <div>
                  <Space>
                    <Button
                      style={{ fontSize: '10px' }}
                      size="small"
                      icon={<StepBackwardOutlined />}
                      disabled={issue.previous_error_id == 0}
                      onClick={() => changeIssue(issue.previous_error_id)}
                    >
                      上一个
                    </Button>
                    <Button
                      style={{ fontSize: '10px' }}
                      size="small"
                      icon={<StepForwardOutlined />}
                      disabled={issue.next_error_id == 0}
                      onClick={() => changeIssue(issue.next_error_id)}
                    >
                      下一个
                    </Button>
                  </Space>
                </div>
                <Divider />
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <Space>
                      <img src={IpIcon} alt="" />
                      <h3>{issue.ip}</h3>
                    </Space>
                  </Col>
                  <Col span={6}>
                    <Space>
                      <img src={BrowserIcon} alt="" />
                      <div>
                        <h3>{issue.browser}</h3>
                        <p>{issue.browser_version}</p>
                      </div>
                    </Space>
                  </Col>
                  <Col span={6}>
                    <Space>
                      <img src={WindowIcon} alt="" />
                      <div>
                        <h3>{issue.os}</h3>
                        <p>{issue.os_version}</p>
                      </div>
                    </Space>
                  </Col>
                  <Col span={6}>
                    <Space>
                      <img src={PcIcon} alt="" />
                      <div>
                        <h3>{issue.device}</h3>
                        <p>{issue.device_type}</p>
                      </div>
                    </Space>
                  </Col>
                </Row>
                <Divider />
                <h4>Js异常堆栈:</h4>
                <Collapse
                  bordered={false}
                  accordion
                  expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                  className="site-collapse-custom-collapse"
                >
                  {stackFramesList.length > 0 ? (
                    stackFramesList.map((item: Issue.StackFrames, index: number) => {
                      return (
                        <Panel header={item.fileName} key={index} className="site-collapse-custom-panel">
                          <StackFramesItem
                            item={item}
                            form={form}
                            index={index}
                            setVisible={setVisible}
                            setStackFrame={setStackFrame}
                          />
                        </Panel>
                      )
                    })
                  ) : (
                    <></>
                  )}
                </Collapse>
              </>
            ) : (
              <Empty></Empty>
            )}
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
      <SourceMapLoadModal stackFrame={stackFrame} visible={visible} form={form} onCreate={onCreate} onClose={onClose} />
    </div>
  )
}

export default IssueDetailPage
