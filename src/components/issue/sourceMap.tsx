import React, { FC } from 'react'
import { Form, Input, message, Tabs, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { ModalFrom } from '../modalForm/modalForm'
import { LoadSourceMap } from '../../request'
import { Issue } from '../../interface/issue.interface'
import sourceMap from 'source-map-js'
const { Dragger } = Upload
const { TabPane } = Tabs

const SourceMapLoadModal: FC<any> = ({ form, stackFrame, visible, onCreate, onClose }) => {
  const props = {
    multiple: false,
    maxCount: 1,
    action: '',
    beforeUpload(file) {
      if (file.name.substring(file.name.lastIndexOf('.') + 1) !== 'map') {
        message.error(`请上传.js.map 文件！`)
        return
      }
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      reader.onload = event => {
        const look_source = lookSource(event.target.result, stackFrame.line, stackFrame.column)
        if (look_source) {
          onCreate({
            ...look_source,
            index: stackFrame.index
          })
        }
      }
      return false
    }
  }

  const modelFormCreate = () => {
    form.validateFields().then(async (value: any) => {
      const source_map: any = await LoadSourceMap(value.url)
      if (source_map?.code == false) {
        message.error(`无法加载source-map文件！`)
        return
      }
      const look_source = lookSource(source_map, stackFrame.line, stackFrame.column)
      if (look_source) {
        onCreate({
          ...look_source,
          index: stackFrame.index
        })
      }
    })
  }

  const lookSource = (source_map, line: number, column: number) => {
    try {
      const consumer = new sourceMap.SourceMapConsumer(source_map)
      const lookUpRes: Issue.LookUpRes = consumer.originalPositionFor({
        line: line,
        column: column
      })

      const source = consumer.sourceContentFor(lookUpRes.source)
      return {
        source,
        column: lookUpRes.column,
        line: lookUpRes.line
      }
    } catch (e) {
      message.error(`未能解析出sourceMap！`)
      console.log(e)
      return false
    }
  }

  return (
    <ModalFrom onClose={onClose} visible={visible} onCreate={modelFormCreate} title="SouceMap映射">
      <Tabs>
        <TabPane tab="本地上传" key="1">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text"></p>
            <p className="ant-upload-hint">点击上传或把.map文件拖拽至此</p>
          </Dragger>
        </TabPane>
        <TabPane tab="远程加载" key="2">
          <Form
            {...{
              labelCol: { span: 0 },
              wrapperCol: { span: 24 }
            }}
            form={form}
            name="basic"
            initialValues={{
              url: stackFrame.url
            }}
          >
            {stackFrame.url}
            <Form.Item name="url" label="源码地址" rules={[{ required: true, message: '请输入源码地址!' }]}>
              <Input placeholder="请输入源码地址" />
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </ModalFrom>
  )
}
export default SourceMapLoadModal