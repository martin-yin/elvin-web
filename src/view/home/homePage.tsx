import { PlusCircleOutlined } from '@ant-design/icons'
import { Card, Col, Form, message, Row } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'
import CreateProjectModal from '../../components/project/createProjectModal'
import ProjectItem from '../../components/project/projectItem'
import projectInteractor from '../../core/interactors/projectInteractor'
import { ProjectIF, TeamIF } from '../../interface'
import { CreateProject } from '../../request/admin'
import { useAppState } from '../../stores'
import './index.less'

const HomePage: FC = () => {
  const { projectList } = useAppState(state => state.appsotre)
  const [healthyList, setHealthyList] = useState<TeamIF.ProjectHealthyList>([])
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()

  const initProjectData = useCallback(async () => {
    const data = await projectInteractor.getProjectHealthyList()
    setHealthyList(data)
  }, [])

  useEffect(() => {
    initProjectData()
  }, [initProjectData, visible])

  const createProject = async () => {
    form.validateFields().then(async (value: any) => {
      const { code, msg } = await CreateProject(value)
      if (code == 200) {
        message.success(msg)
        onClose()
      } else {
        message.warn(msg)
      }
    })
  }

  const onClose = () => {
    form.resetFields()
    setVisible(false)
  }

  const renderAddProjectItem = () => {
    return (
      <Col span={8}>
        <Card>
          <div className="project-item">
            <div className="add-project">
              <div
                className="add-icon"
                onClick={() => {
                  setVisible(true)
                }}
              >
                <PlusCircleOutlined />
              </div>
            </div>
          </div>
        </Card>
      </Col>
    )
  }

  const renderProjectList = () => {
    if (projectList.length > 0) {
      return projectList.map((item: ProjectIF.Project, index: number) => {
        return <ProjectItem health={healthyList[index]} key={index} item={item} index={index} />
      })
    }
    return <></>
  }

  return (
    <>
      {/* <FilterHeader startTime={moment().format('YYYY-MM-DD')} endTime={moment().format('YYYY-MM-DD')} /> */}
      <CreateProjectModal visible={visible} form={form} onClose={onClose} onCreate={createProject} />
      <div className="project-list">
        <Row gutter={[16, 16]}>
          {renderProjectList()}
          {renderAddProjectItem()}
        </Row>
      </div>
    </>
  )
}

export default HomePage
