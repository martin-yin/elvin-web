import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { AddTeamProject, GetTeamList } from '../../request'
const { Option } = Select

const CreateProject: FC = () => {
  const [teamList, setTeamList] = useState([])

  const initTeamListData = useCallback(async () => {
    const result = await GetTeamList()
    setTeamList(result.data)
  }, [])

  useEffect(() => {
    initTeamListData()
  }, [initTeamListData])

  const createProject = async (form: any) => {
    await AddTeamProject({
      monitor_id: form.monitor_id,
      project_name: form.project_name,
      team_id: form.team_id
    })
    // console.log(data, 'data')
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  }

  return (
    <div>
      <Form
        {...formItemLayout}
        name="basic"
        initialValues={{ project_name: '', monitor_id: '', team_id: '' }}
        onFinish={createProject}
      >
        <Form.Item name="project_name" label="项目名称" rules={[{ required: true, message: '请输入项目名称!' }]}>
          <Input placeholder="请输入项目名称" />
        </Form.Item>
        <Form.Item name="monitor_id" label="请输入" rules={[{ required: true, message: '请输' }]}>
          <Input placeholder="请输入" />
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

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            创建项目
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default CreateProject
