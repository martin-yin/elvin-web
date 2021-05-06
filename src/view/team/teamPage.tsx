import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Modal, Space, Table } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { GetTeamList, CreateTeam } from '../../request'

const TeamPage: FC = () => {
  const [isVisible, setisVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = React.useState(false)
  const [form] = Form.useForm()
  const [teamList, setTeamList] = useState([])
  const initTeamList = useCallback(async () => {
    const result = await GetTeamList()
    setTeamList(result.data)
  }, [])

  useEffect(() => {
    initTeamList()
  }, [initTeamList])

  const teamModal = () => {
    return (
      <div>
        <Modal
          title="创建团队"
          visible={isVisible}
          onOk={addTeam}
          confirmLoading={confirmLoading}
          onCancel={cancelTeamModal}
        >
          <Form form={form} preserve={false} name="basic" initialValues={{ remember: true }}>
            <Form.Item name="name" rules={[{ required: true, message: '请输入项目名称' }]}>
              <Input placeholder="请输入项目名称" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }

  const openTeamModal = () => {
    setisVisible(true)
  }

  const addTeam = async () => {
    setConfirmLoading(true)
    form
      .validateFields()
      .then(async (values: any) => {
        const data = await CreateTeam(values)
        if (data.code == 0) {
          setConfirmLoading(false)
          form.resetFields()
          cancelTeamModal()
          initTeamList()
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  const cancelTeamModal = () => {
    setisVisible(false)
  }
  const columns = [
    {
      title: '团队名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '团队创建人',
      dataIndex: 'nick_name',
      key: 'nick_name'
    },
    {
      title: '团队成员',
      dataIndex: 'team_admins',
      key: 'team_admin',
      render: (team_admins: any) => (
        <>
          {team_admins.map((item: any, index: number) => {
            return <div key={index}>{item.nick_name}</div>
          })}
        </>
      )
    },
    {
      title: '项目列表',
      dataIndex: 'team_projects',
      key: 'team_projects',
      render: (team_projects: any) => (
        <>
          {team_projects.map((item: any, index: number) => {
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
