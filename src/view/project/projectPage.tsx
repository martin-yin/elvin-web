import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button, Card, Form, Input, Select } from 'antd'

import { useHistory } from 'react-router-dom'
import { AddTeamProject, GetTeamList } from '../../request/admin'
const { Option } = Select

const ProjectPage: FC = () => {
  const [teamList, setTeamList] = useState([])
  const history = useHistory()
  const initTeamListData = useCallback(async () => {
    const result = await GetTeamList()
    setTeamList([])
  }, [])

  useEffect(() => {
    initTeamListData()
  }, [initTeamListData])

  const createProject = async (form: any) => {
    const data = await AddTeamProject({
      monitor_id: form.monitor_id,
      project_name: form.project_name,
      team_id: form.team_id
    })
    if (data.code == 0) {
      history.push('/')
    }
    // console.log(data, 'data')
  }

  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 4 }
  }

  const tailLayout = {
    wrapperCol: { offset: 2, span: 4 }
  }

  return (
    <div>
      <Card style={{ width: '100%' }}>
        <Form
          {...formItemLayout}
          name="basic"
          initialValues={{ project_name: '', monitor_id: '', team_id: '' }}
          onFinish={createProject}
        >
          <Form.Item name="project_name" label="项目名称" rules={[{ required: true, message: '请输入项目名称!' }]}>
            <Input placeholder="请输入项目名称" />
          </Form.Item>
          <Form.Item name="monitor_id" label="monitorId" rules={[{ required: true, message: '请输 monitor_id' }]}>
            <Input placeholder="请输 monitor_id" />
          </Form.Item>
          <Form.Item name="team_id" label="团队" hasFeedback rules={[{ required: true, message: '请选择团队' }]}>
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
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              创建项目
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default ProjectPage
