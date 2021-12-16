import React, { useEffect } from 'react'
import { Form, Input, message, Tabs, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { LoadSourceMap } from '../../../request'
import sourceMap from 'source-map-js'
import { ModalFrom } from '../../../components/modalForm/modalForm'
import type { RcFile } from 'antd/lib/upload'
import { JsErrIF } from '../../../interface/jsErr.interface'
import { AxiosResponse } from 'axios'
import { useJsErrContext } from '../hook/useJsErrDetail'
const { Dragger } = Upload
const { TabPane } = Tabs

const SourceMapLoadModal = React.memo<{ visible: boolean }>(({ visible = false }) => {
  const [form] = Form.useForm()
  const [jsErrContext, setJsErrContext] = useJsErrContext()
  const { handleSetOriginSource, stackFrame } = jsErrContext
  const props = (function setUploadProps() {
    return {
      multiple: false,
      maxCount: 1,
      action: '',
      beforeUpload(file: RcFile) {
        if (file.name.substring(file.name.lastIndexOf('.') + 1) !== 'map') {
          message.error(`请上传.js.map 文件！`)
          return
        }
        const reader = new FileReader()
        reader.readAsText(file, 'UTF-8')
        reader.onload = event => {
          const originSource = lookSource(event.target.result, stackFrame.line, stackFrame.column)
          if (originSource) {
            handleSetOriginSource(
              {
                ...originSource,
                index: stackFrame.index
              },
              jsErrContext
            )
          }
        }
        return false
      }
    }
  })()

  const handleModelFormCreate = () => {
    form.validateFields().then(async (value: { url: string }) => {
      const sourceMapCodeResponse: AxiosResponse<{
        data: any
      }> = await LoadSourceMap(value.url)
      if (sourceMapCodeResponse.status !== 200) {
        message.error(`无法加载source-map文件！`)
        return
      }
      const originSource = lookSource(sourceMapCodeResponse.data, stackFrame.line, stackFrame.column)
      if (originSource) {
        handleSetOriginSource(
          {
            ...originSource,
            index: stackFrame.index
          },
          jsErrContext
        )
      }
    })
  }

  useEffect(() => {
    form.setFieldsValue({
      url: stackFrame?.url
    })
  }, [stackFrame?.url])

  const lookSource = (sourceMapCode, line: number, column: number) => {
    try {
      const consumer = new sourceMap.SourceMapConsumer(sourceMapCode)
      const lookUpRes: JsErrIF.LookUpRes = consumer.originalPositionFor({
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
      console.log(e, 'sourcemap error')
      message.error(`未能解析出sourceMap！`)
      return false
    }
  }

  return (
    <ModalFrom
      onClose={() => {
        setJsErrContext({
          ...jsErrContext,
          visible: false
        })
      }}
      visible={visible}
      onCreate={handleModelFormCreate}
      title="SouceMap映射"
    >
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
          >
            <Form.Item name="url" label="源码地址" rules={[{ required: true, message: '请输入源码地址!' }]}>
              <Input placeholder="请输入源码地址" />
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </ModalFrom>
  )
})

export default SourceMapLoadModal
