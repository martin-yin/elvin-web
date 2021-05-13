import React, { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorStackParser from 'error-stack-parser'
import { GetJsErrorDetail, LoadSourceMap } from '../../request'
import { Button, Card, Col, Form, Row } from 'antd'
import SourceMapLoadModal from '../../components/jsError/sourceMap'
import sourceMap from 'source-map-js'
import "./index.less"
import SourceMaoItem from '../../components/jsError/sourceMapItem'
import { SourceCode } from 'eslint'
const JsErrorDetailPage: FC = () => {
  const params: any = useParams()
  const [stackTrack, setStackTrack] = useState<any>([])

  const [souceCode, setSourceCode] = useState<any>({
    column: 9,
    line: 25,
    source: '',
    sourcesContent: ''
  })

  const [form] = Form.useForm()
  const [jsError, setJsError] = useState<any>({})
  const [visible, setVisible] = useState(false)

  const sourcesPathMap: any = {}

  const parseStackTrack = (error: string): Array<any> => {
    const err = new Error(error)
    const stackFrame = ErrorStackParser.parse(err)
    return stackFrame
  }

  const initStackTrackData = useCallback(async () => {
    const result = await GetJsErrorDetail(params.errorId)
    setJsError(result.data)
    setStackTrack(parseStackTrack(result.data.stack))
  }, [])

  const onClose = () => {
    form.resetFields()
    setVisible(false)
  }

  function fixPath(filepath: any) {
    return filepath.replace(/\.[\.\/]+/g, '')
  }

  const loadSourceMap = () => {
    form.validateFields().then(async (value: any) => {
      const data: any = await LoadSourceMap(value.url)
      const fileContent = data,
        fileObj = fileContent,
        sources = fileObj.sources
      sources.map((item: any) => {
        sourcesPathMap[fixPath(item)] = item
      })
      const consumer = await new sourceMap.SourceMapConsumer(fileContent)

      const lookUpResult: any = consumer.originalPositionFor({
        line: stackTrack[0].lineNumber,
        column: stackTrack[0].columnNumber
      })

      const originSource = sourcesPathMap[lookUpResult.source],
        sourcesContent = fileObj.sourcesContent[sources.indexOf(originSource)]
      setSourceCode({
        ...lookUpResult,
        sourcesContent
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
          <Col span={16}>
            {
              souceCode.sourcesContent !== "" ?  <SourceMaoItem souceCode={souceCode} /> : <></>
            }
          </Col>
          <Col span={8}>
          </Col>
        </Row>
      </Card>
      <SourceMapLoadModal visible={visible} form={form} onCreate={loadSourceMap} onClose={onClose} />
    </div>
  )
}

export default JsErrorDetailPage