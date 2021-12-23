import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Select, FormInstance } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalFrom } from '../../../components/modalForm/modalForm'
import { adminInteractor } from '../../../core/interactors'
import { TeamIF } from '../../../interface'

const { Option } = Select

interface CreateProjectProps {
  visible: boolean
  onClose: () => void
  onCreate: () => void
  form: FormInstance
}

const CreateProject: FC<CreateProjectProps> = ({ visible, onClose, onCreate, form }) => {
  const [teams, setTeams] = useState<TeamIF.Teams>([])
  const navigate = useNavigate()
  useEffect(() => {
    ;(async () => {
      const data = await adminInteractor.getTeams()
      setTeams(data)
    })()
  }, [])

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
                  {teams.length == 0 ? (
                    <></>
                  ) : (
                    teams.map((item, key: number) => {
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
                  navigate('/system/team')
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
export default CreateProject
