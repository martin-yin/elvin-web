import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, message, Modal, Space, Table } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { ModalFrom } from '../../components/modalForm/modalForm'
import { Admin, Project, TeamAdmins, TeamLit, TeamProjects } from '../../interface/team.interface'
import { GetTeamList, CreateTeam } from '../../request'

const TeamPage: FC = () => {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const [teamList, setTeamList] = useState<TeamLit>()
  const initTeamList = useCallback(async () => {
    const { code, data } = await GetTeamList()
    if (code == 200) {
      setTeamList(data)
    }
  }, [])

  useEffect(() => {
    initTeamList()
  }, [initTeamList])

  const teamModal = () => {
    return (
      <div>
        <ModalFrom title="创建团队" visible={visible} onCreate={addTeam} onClose={cancelTeamModal}>
          <Form form={form} preserve={false} name="basic">
            <Form.Item name="name" rules={[{ required: true, message: '请输入项目名称' }]}>
              <Input placeholder="请输入项目名称" />
            </Form.Item>
          </Form>
        </ModalFrom>
      </div>
    )
  }

  const openTeamModal = () => {
    setVisible(true)
  }

  const addTeam = async () => {
    form
      .validateFields()
      .then(async (values: any) => {
        const data: any = await CreateTeam(values)
        if (data.code == 200) {
          form.resetFields()
          cancelTeamModal()
          initTeamList()
        } else {
          message.error(data.msg)
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  const cancelTeamModal = () => {
    setVisible(false)
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
      render: (team_admins: TeamAdmins) => (
        <>
          {team_admins.map((item: Admin, index: number) => {
            return <div key={index}>{item.nick_name}</div>
          })}
        </>
      )
    },
    {
      title: '项目列表',
      dataIndex: 'team_projects',
      key: 'team_projects',
      render: (team_projects: TeamProjects) => (
        <>
          {team_projects.map((item: Project, index: number) => {
            return <div key={index}>{item.project_name}</div>
          })}
        </>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>绑定管理员</a>
          <a>删除</a>
        </Space>
      )
    }
  ]
  return (
    <div>
      <Card>
        <Button icon={<PlusOutlined />} type="primary" style={{ marginBottom: '10px' }} onClick={() => openTeamModal()}>
          创建团队
        </Button>
        <Table dataSource={teamList} columns={columns} rowKey="message" />
        {teamModal()}
      </Card>
    </div>
  )
}

export default TeamPage
