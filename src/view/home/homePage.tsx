import React, { FC, useCallback, useEffect, useState } from 'react'
import { useAppState } from '../../stores'
import { Card, Col, Form, message, Row } from 'antd'
import './index.less'
import CreateProjectModal from '../../components/project/createProjectModal'
import { AddTeamProject, GetProject } from '../../request'
import ProjectItem from '../../components/project/projectItem'
import { PlusCircleOutlined } from '@ant-design/icons'
import { setProjectList } from '../../stores/app.store'
import { useDispatch } from 'react-redux'
const HomePage: FC = () => {
  const { projectList } = useAppState(state => state.appsotre)
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const initProjectData = useCallback(async () => {
    const { data, code } = await GetProject()
    if (code === 200) {
      dispatch(setProjectList(data))
    }
  }, [])

  useEffect(() => {
    initProjectData()
  }, [visible])

  const createProject = async () => {
    form.validateFields().then(async (value: any) => {
      const { code, msg } = await AddTeamProject(value)
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
    )
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
          {renderAddProjectItem()}
        </Row>
      </div>
    </>
  )
}

export default HomePage
