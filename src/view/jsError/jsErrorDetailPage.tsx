import React, { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetJsErrorDetail, LoadSourceMap } from '../../request'
import { Button, Card, Col, Collapse, Divider, Form, message, Row, Space } from 'antd'
import SourceMapLoadModal from '../../components/jsError/sourceMap'
import sourceMap from 'source-map-js'
import './index.less'
import SourceMaoItem from '../../components/jsError/sourceMapItem'
import { CaretRightOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons'
const { Panel } = Collapse
const JsErrorDetailPage: FC = () => {
  const params: any = useParams()
  const [stackTrack, setStackTrack] = useState<any>([])

  const [souceCode, setSourceCode] = useState<any>({
    column: 0,
    line: 0,
    source: '',
    sourcesContent: ''
  })

  const [form] = Form.useForm()
  const [jsError, setJsError] = useState<any>({})
  const [visible, setVisible] = useState(false)

  const initStackTrackData = useCallback(async () => {
    const result = await GetJsErrorDetail({
      issue_id: params.error_id,
      error_id: 0
    })
    setJsError(result.data)
    setStackTrack(JSON.parse(result.data.stack_frames))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onClose = () => {
    form.resetFields()
    setVisible(false)
  }

  const changeIssue = async (id: number) => {
    if (id == 0) {
      message.warn('没有下一个问题了！')
      return
    }
    const result = await GetJsErrorDetail({
      error_id: id,
      issue_id: 0
    })
    setJsError(result.data)
    setStackTrack(JSON.parse(result.data.stack_frames))
  }

  const loadSourceMap = () => {
    form.validateFields().then(async (value: any) => {
      const sourceMapData: any = await LoadSourceMap(value.url)
      const consumer = await new sourceMap.SourceMapConsumer(sourceMapData)
      const lookUpRes: any = consumer.originalPositionFor({
        line: value.line,
        column: value.column
      })
      const originSource = consumer.sourceContentFor(lookUpRes.source)
      setSourceCode({
        ...lookUpRes,
        originSource: originSource
      })
      setVisible(false)
    })
  }

  useEffect(() => {
    initStackTrackData()
  }, [initStackTrackData])

  return (
    <div>
      <Card>
        <div>
          <Space>
            <h2>
              {jsError?.error_name}: {jsError?.message}
            </h2>
          </Space>
        </div>
        <p>{jsError?.componentName}</p>
        <div style={{ marginBottom: '14px' }}>
          <Space size={10} direction="vertical">
            <p>{jsError?.created_at}</p>
            <p>{jsError?.page_url}</p>
          </Space>
        </div>
        <div>
          <Space>
            <Button
              style={{ fontSize: '10px' }}
              size="small"
              icon={<StepBackwardOutlined />}
              disabled={jsError?.previous_error_id == 0}
              onClick={() => changeIssue(jsError?.previous_error_id)}
            >
              上一个
            </Button>
            <Button
              style={{ fontSize: '10px' }}
              size="small"
              icon={<StepForwardOutlined />}
              disabled={jsError?.next_error_id == 0}
              onClick={() => changeIssue(jsError?.next_error_id)}
            >
              下一个
            </Button>
          </Space>
        </div>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <h3>{jsError?.ip}</h3>
          </Col>
          <Col span={6}>
            <h3>{jsError?.browser}</h3>
            <p>{jsError?.browser_version}</p>
          </Col>
          <Col span={6}>
            <h3>{jsError?.os}</h3>
            <p>{jsError?.os_version}</p>
          </Col>
          <Col span={6}>
            <h3>{jsError?.device}</h3>
            <p>{jsError?.device_type}</p>
          </Col>
        </Row>
        <Divider />
        <h4>Js错误堆栈:</h4>
        <Collapse
          bordered={false}
          accordion
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          className="site-collapse-custom-collapse"
        >
          {stackTrack.length > 0 ? (
            stackTrack.map((item: any, index: number) => {
              return (
                <Panel header={item.fileName} key={index} className="site-collapse-custom-panel">
                  <Row gutter={[8, 8]}>
                    <Col span={16}>
                      {souceCode?.originSource ? (
                        <SourceMaoItem souceCode={souceCode} />
                      ) : (
                        <div>
                          <pre className="textOverhidden">{item.source}</pre>
                        </div>
                      )}
                    </Col>
                    <Col span={8}>
                      <Button
                        size={'small'}
                        type="primary"
                        onClick={() => {
                          setVisible(true)
                          form.setFieldsValue({
                            url: item.fileName + '.map',
                            line: item.lineNumber,
                            column: item.columnNumber
                          })
                        }}
                      >
                        映射源码
                      </Button>
                    </Col>
                  </Row>
                </Panel>
              )
            })
          ) : (
            <></>
          )}
        </Collapse>
      </Card>

      {/* <Card>
        <Row gutter={[8, 8]}>
          <Col span={16}>
            <pre>{jsError.stack}</pre>
          </Col>
          <Col span={8}>
            <Button
              size={'small'}
              type="primary"
              onClick={() => {
                setVisible(true)
                form.setFieldsValue({
                  url: stackTrack[0].fileName + '.map'
                })
              }}
            >
              映射源码
            </Button>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={16}></Col>
          <Col span={8}></Col>
        </Row>
      </Card> */}
      <SourceMapLoadModal visible={visible} form={form} onCreate={loadSourceMap} onClose={onClose} />
    </div>
  )
}

export default JsErrorDetailPage
