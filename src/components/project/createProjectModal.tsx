import React, { FC, useCallback, useEffect, useState } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import { GetTeamList } from '../../request'
const { Option } = Select

const CreateProjectModal: FC<any> = ({ form, visible, onCreate, onClose }) => {
  const [teamList, setTeamList] = useState([])

  const initTeamListData = useCallback(async () => {
    const result = await GetTeamList()
    setTeamList(result.data)
  }, [])

  useEffect(() => {
    initTeamListData()
  }, [initTeamListData])

  return (
    <div>
      <Modal
        forceRender={true}
        maskClosable={false}
        destroyOnClose={true}
        getContainer={false}
        visible={visible}
        onOk={onCreate}
        onCancel={onClose}
        title="创建项目"
      >
        <Form
          {...{
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
          }}
          form={form}
          name="basic"
          initialValues={{ project_name: '', monitor_id: '', team_id: '' }}
        >
          <Form.Item
            name="project_name"
            label="项目名称"
            hasFeedback
            rules={[{ required: true, message: '请输入项目名称!' }]}
          >
            <Input placeholder="请输入项目名称" />
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
        </Form>
      </Modal>
    </div>
  )
}
export default CreateProjectModal
