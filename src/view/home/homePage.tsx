import React, { FC } from 'react'
import CreateProject from './components/createProject'
import { HealthStatus } from './components/healthStatus'
import { useHomePageInit } from './hook/useHomePageInit'
import './index.less'

const HomePage: FC = () => {
  const { list, visible, handleOpenModal, handleCloseModal, handleCreateProject, form } = useHomePageInit()
  return (
    <>
      <CreateProject visible={visible} onClose={handleCloseModal} onCreate={handleCreateProject} form={form} />
      <HealthStatus list={list} openModal={handleOpenModal} />
    </>
  )
}

export default HomePage
