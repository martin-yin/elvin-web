import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, message, Space, Table, Tag } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { ModalFrom } from '../../components/modalForm/modalForm'
import { adminInteractor } from '../../core/interactors'
import { TeamIF } from '../../interface'
import { delTeam } from '../../request'

const TeamPage: FC = () => {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const [teams, setTeams] = useState<TeamIF.Teams>()
  const initTeamList = useCallback(async () => {
    const data = await adminInteractor.getTeams()
    setTeams(data)
  }, [])

  useEffect(() => {
    initTeamList()
  }, [initTeamList])

  const addTeam = async () => {
    form.validateFields().then(async (values: { name: string }) => {
      const data = await adminInteractor.createTeam(values)
      if (data) {
        form.resetFields()
        setVisible(false)
        initTeamList()
      }
    })
  }

  const del = async id => {
    const { code } = await delTeam(id)
    if (code == 200) {
      message.success('删除成功！')
    }
  }

  const columns = [
    {
      title: '团队名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '团队成员',
      dataIndex: 'team_admins',
      key: 'team_admin',
      render: (team_admins: TeamIF.TeamAdmins) => (
        <>
          {team_admins.map((item: TeamIF.Admin, index: number) => {
            return <div key={index}>{item.nick_name}</div>
          })}
        </>
      )
    },
    {
      title: '项目列表',
      dataIndex: 'team_projects',
      key: 'team_projects',
      render: (team_projects: TeamIF.TeamProjects) => (
        <>
          {team_projects.map((item: TeamIF.Project, index: number) => {
            return (
              <Tag color="#87d068" key={index}>
                {item.project_name}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: record => (
        <Space>
          {/* <Tag color="#2db7f5">添加成员</Tag> */}
          <Tag color="#f50" onClick={() => del(record.id)}>
            删除团队
          </Tag>
        </Space>
      )
    }
  ]
  return (
    <div>
      <Card>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          style={{ marginBottom: '10px' }}
          onClick={() => setVisible(true)}
        >
          创建团队
        </Button>
        <Table dataSource={teams} columns={columns} rowKey="message" />
        <ModalFrom title="创建团队" visible={visible} onCreate={addTeam} onClose={() => setVisible(false)}>
          <Form form={form} preserve={false} name="basic">
            <Form.Item name="name" rules={[{ required: true, message: '请输入项目名称' }]}>
              <Input placeholder="请输入项目名称" />
            </Form.Item>
          </Form>
        </ModalFrom>
      </Card>
    </div>
  )
}

export default TeamPage
