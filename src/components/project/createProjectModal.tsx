import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd'

import { useHistory } from 'react-router-dom'
import { ModalFrom } from '../modalForm/modalForm'
import { PlusOutlined } from '@ant-design/icons'
import { GetTeamList } from '../../request/admin'
const { Option } = Select

const CreateProjectModal: FC<any> = ({ form, visible, onCreate, onClose }) => {
  const [teamList, setTeamList] = useState([])
  const history = useHistory()
  const initTeamListData = useCallback(async () => {
    const result: any = await GetTeamList()
    if (result.code == 200) {
      setTeamList(result.data)
    }
  }, [])

  useEffect(() => {
    initTeamListData()
  }, [initTeamListData])

  return (
    <ModalFrom onClose={onClose} visible={visible} onCreate={onCreate} title="创建项目">
      <Form
        {...{
          labelCol: { span: 6 },
          wrapperCol: { span: 14 }
        }}
        form={form}
        name="basic"
        initialValues={{ project_name: '', monitor_id: '', team_id: '' }}
      >
        <Form.Item name="project_name" label="项目名称" rules={[{ required: true, message: '请输入项目名称!' }]}>
          <Input placeholder="请输入项目名称" />
        </Form.Item>
        <Form.Item label="团队" rules={[{ required: true, message: '请选择团队' }]}>
          <Row gutter={12}>
            <Col span={16}>
              <Form.Item name="team_id" rules={[{ required: true, message: '请选择团队' }]}>
                <Select placeholder="请选择团队">
                  {teamList.length == 0 ? (
                    <></>
                  ) : (
                    teamList.map((item: any, key: number) => {
                      return (
                        <Option value={item.id} key={key}>
                          {item.name}
                        </Option>
                      )
                    })
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Button
                type="dashed"
                onClick={() => {
                  history.push('/team')
                }}
                block
                icon={<PlusOutlined />}
              >
                添加团队
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </ModalFrom>
  )
}
export default CreateProjectModal
