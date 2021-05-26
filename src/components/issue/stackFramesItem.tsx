import { Button, Col, Row } from 'antd'
import React, { FC } from 'react'
import SourceMaoItem from './sourceMapItem'

const StackFramesItem: FC<any> = ({ item, form, setStackFrame, index, setVisible }) => {
  return (
    <Row gutter={[8, 8]}>
      {item.origin_source ? (
        <>
          <Col span={16}>
            <SourceMaoItem item={item} />
          </Col>
        </>
      ) : (
        <>
          <Col span={16}>
            <pre className="textOverhidden">{item.source}</pre>
          </Col>
        </>
      )}

      <Col span={8}>
        <Button
          size={'small'}
          type="primary"
          style={{ marginTop: '20px' }}
          onClick={() => {
            form.setFieldsValue({
              url: item.fileName + '.map'
            })
            setVisible(true)
            setStackFrame({
              url: item.fileName + '.map',
              line: item.lineNumber,
              column: item.columnNumber,
              index: index
            })
          }}
        >
          映射源码
        </Button>
      </Col>
    </Row>
  )
}
export default StackFramesItem
