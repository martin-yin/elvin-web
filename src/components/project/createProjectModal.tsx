import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Select } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TeamIF } from '../../interface'
import { GetTeamList } from '../../request/admin'
import { useHomePageInit } from '../../view/home/hook/useHomePageInit'
import { ModalFrom } from '../modalForm/modalForm'

const { Option } = Select

const CreateProjectModal: FC = () => {
  const { form, onClose, createProject, visible } = useHomePageInit()
  const [teamList, setTeamList] = useState<TeamIF.TeamLit>([])
  const navigate = useNavigate()
  useEffect(() => {
    ;async () => {
      const { data, code } = await GetTeamList()
      if (code == 200) {
        setTeamList(data)
      }
    }
  }, [])

  return (
    <ModalFrom onClose={onClose} visible={visible} onCreate={createProject} title="创建项目">
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
                  navigate('/team')
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
