import { Button, Col, Row } from 'antd'
import React, { FC } from 'react'
import { encodeHTML, preLineStartEnd } from '../../../utils'
import { useJsErrContext } from '../hook/useJsErrDetail'

const SourceMapCode: FC<any> = ({ item }) => {
  const { line, column } = item.originSource

  // 拼接处 pre 展示代码
  const preCode = () => {
    const { start, end, sourceLine } = preLineStartEnd(item.originSource)
    const codes = []
    for (let i = start; i <= end; i++) {
      const content = i + 1 + '.    ' + encodeHTML(sourceLine[i])
      codes.push(
        <div
          key={i}
          className={`code-line ${i + 1 == line ? 'heightlight' : ''}`}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      )
    }
    return codes
  }

  return (
    <div className="errdetail">
      <div className="errheader">
        {item.source} at line {line} : {column}
      </div>
      <pre className="errCode">{preCode()}</pre>
    </div>
  )
}

const StackFrameItem: FC<any> = ({ item, index }) => {
  const [jsErrContext] = useJsErrContext()
  const { handleOpenSourceMapModal } = jsErrContext

  return (
    <Row gutter={[8, 8]}>
      {item.originSource ? (
        <Col span={16}>
          <SourceMapCode item={item} />
        </Col>
      ) : (
        <Col span={16}>
          <pre className="textOverhidden">{item.source}</pre>
        </Col>
      )}
      <Col span={8}>
        <Button
          size={'small'}
          type="primary"
          style={{ marginTop: '20px' }}
          onClick={() => {
            handleOpenSourceMapModal(item, index, jsErrContext)
          }}
        >
          映射源码
        </Button>
      </Col>
    </Row>
  )
}

export default StackFrameItem
