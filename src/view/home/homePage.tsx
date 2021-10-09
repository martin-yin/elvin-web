import { PlusCircleOutlined } from '@ant-design/icons'
import { Card, Col, Form, message, Row } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CreateProjectModal from '../../components/project/createProjectModal'
import ProjectItem from '../../components/project/projectItem'
import { ProjectIF, TeamIF } from '../../interface'
import { CreateProject, GetProjectHealthy, GetProjectList } from '../../request/admin'
import { useAppState } from '../../stores'
import { setProjectList } from '../../stores/app.store'
import './index.less'

const HomePage: FC = () => {
  const { projectList } = useAppState(state => state.appsotre)
  const [healthyList, setHealthyList] = useState<TeamIF.ProjectHealthyList>([])
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const initProjectData = useCallback(async () => {
    const { data, code } = await GetProjectList()
    if (code === 200) {
      dispatch(setProjectList(data))
      const monitorIds: Array<string> = []
      data.map(project => {
        monitorIds.push(project.monitor_id)
      })
      await projectHealthy(monitorIds.join(','))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const projectHealthy = async (monitorIds: string) => {
    const data = await GetProjectHealthy({ monitor_id: monitorIds })
    setHealthyList(data.data)
  }

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

  return (
    <>
      <CreateProjectModal visible={visible} form={form} onClose={onClose} onCreate={createProject} />
      <div className="project-list">
        <Row gutter={[16, 16]}>
          {projectList.length > 0 ? (
            projectList.map((item: ProjectIF.Project, index: number) => {
              return <ProjectItem health={healthyList[index]} key={index} item={item} index={index} />
            })
          ) : (
            <></>
          )}
          {renderAddProjectItem()}
        </Row>
      </div>
    </>
  )
}

export default HomePage
