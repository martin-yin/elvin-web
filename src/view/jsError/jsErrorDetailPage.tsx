import React, { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorStackParser from 'error-stack-parser'
import { GetJsErrorDetail, LoadSourceMap } from '../../request'
import { Button, Card, Col, Form, Row } from 'antd'
import SourceMapLoadModal from '../../components/jsError/sourceMap'
import sourceMap from 'source-map-js'
import "./index.less"
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
      console.log(value)
      const data: any = await LoadSourceMap(value.url)
      const fileContent = data,
        fileObj = fileContent,
        sources = fileObj.sources
      sources.map((item: any) => {
        sourcesPathMap[fixPath(item)] = item
      })

      const consumer = await new sourceMap.SourceMapConsumer(fileContent)
      const lookup = {
        line: 1,
        column: 7653
      }
      const lookUpResult: any = consumer.originalPositionFor(lookup)

      const originSource = sourcesPathMap[lookUpResult.source],
        sourcesContent = fileObj.sourcesContent[sources.indexOf(originSource)]
      setSourceCode({
        ...lookUpResult,
        sourcesContent
      })

      renderPreCode({
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
                console.log(stackTrack)
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
      </Card>
      <div id="errdetail">
        <div id="errHeader">
        </div>
        <pre id="errCode" style={{display: "none"}}></pre>
      </div>
      <SourceMapLoadModal visible={visible} form={form} onCreate={loadSourceMap} onClose={onClose} />
    </div>
  )
}

export default JsErrorDetailPage

function renderPreCode(data: any) {
  const $errCode: any = document.getElementById('errCode')
  const errdetail: any = document.getElementById('errdetail')

  console.log(data);
  $errCode.innerHTML = data.sourcesContent
  const lines = $errCode.innerText.split('\n')
  const line = data.line,
    len = lines.length - 1
  const start = line - 3 >= 0 ? line - 3 : 0,
    end = start + 5 >= len ? len : start + 5 // 最多展示6行

  const newLines = []
  for (let i = start; i <= end; i++) {
    newLines.push(
      '<div class="code-line ' +
        (i + 1 == line ? 'heightlight' : '') +
        '" title="' +
        (i + 1 == line ? encodeHTML(data.msg) : '') +
        '">' +
        (i + 1) +
        '.    ' +
        encodeHTML(lines[i]) +
        '</div>'
    )
  }

  errdetail.innerHTML +=
    '<div class="errdetail"><div class="errheader">' +
    data.source +
    ' at line ' +
    data.line +
    ':' +
    data.column +
    '</div>' +
    '<pre class="errCode">' +
    newLines.join('') +
    '</pre></div>'
}
function encodeHTML(str: any) {
  if (!str || str.length == 0) return ''
  return str.replace(/&/g, '&#38;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\'/g, '&#39;')
}
