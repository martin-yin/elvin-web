import React, { FC } from 'react'
import { Form, Input } from 'antd'
import { ModalFrom } from '../modalForm/modalForm'

const SourceMapLoadModal: FC<any> = ({ form, url, visible, onCreate, onClose }) => {
  return (
    <ModalFrom onClose={onClose} visible={visible} onCreate={onCreate} title="SouceMap映射">
      <Form
        {...{
          labelCol: { span: 6 },
          wrapperCol: { span: 14 }
        }}
        form={form}
        name="basic"
        initialValues={{ url: url, line: 0, column: 0 }}
      >
        <Form.Item name="url" label="源码地址" rules={[{ required: true, message: '请输入源码地址!' }]}>
          <Input placeholder="请输入源码地址" />
        </Form.Item>
        <Form.Item name="line" style={{ display: 'none' }}>
          <Input placeholder="请输入源码地址" />
        </Form.Item>
        <Form.Item name="column" style={{ display: 'none' }}>
          <Input placeholder="请输入源码地址" />
        </Form.Item>
      </Form>
    </ModalFrom>
  )
}
export default SourceMapLoadModal
