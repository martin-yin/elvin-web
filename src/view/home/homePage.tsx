import React, { FC, useState } from 'react'
import ProjectList from '../../components/project/projectItem'
import { useAppState } from '../../stores'
import { Button, Card, Col, Form, Row } from 'antd'
import './index.less'
import CreateProjectModal from '../../components/project/createProjectModal'
import { AddTeamProject } from '../../request'
import ProjectItem from '../../components/project/projectItem'
import { PlusCircleOutlined } from '@ant-design/icons'
const HomePage: FC = () => {
  const { projectList } = useAppState(state => state.appsotre)
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()

  const createProject = async () => {
    const data = await AddTeamProject(form.getFieldsValue())
    if (data.code == 0) {
      onClose()
    }
  }

  const onClose = () => {
    form.resetFields()
    setVisible(false)
  }

  return (
    <>
      <CreateProjectModal visible={visible} form={form} onClose={onClose} onCreate={createProject} />
      <div className="project-list">
        <Row gutter={[16, 16]}>
          {projectList.length > 0 ? (
            projectList.map((item: any, index: number) => {
              return <ProjectItem key={index} item={item} index={index} />
            })
          ) : (
            <></>
          )}
          <Col span={8}>
            <Card>
              <div
                className="project-item"
                onClick={() => {
                  setVisible(true)
                }}
              >
                <div className="add-project">
                  <div className="add-icon">
                    <PlusCircleOutlined />
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default HomePage
