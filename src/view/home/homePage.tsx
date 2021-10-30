import { Form, Row } from 'antd'
import React, { FC } from 'react'
import CreateProjectModal from '../../components/project/createProjectModal'
import { useHomePageInit } from './hook/useHomePageInit'
import './index.less'

const HomePage: FC = () => {
  console.log('父组件渲染！')

  return (
    <>
      <CreateProjectModal />
      <div className="project-list">{/* <Row gutter={[16, 16]}>{renderProjects()}</Row> */}</div>
    </>
  )
}

export default HomePage
