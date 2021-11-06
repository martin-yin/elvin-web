import React, { FC } from 'react'
import CreateProject from './components/createProject'
import { HealthStatus } from './components/healthStatus'
import { useHomePageInit } from './hook/useHomePageInit'
import './index.less'

const HomePage: FC = () => {
  const { list, visible } = useHomePageInit()

  return (
    <>
      <CreateProject visible={visible} />
      <HealthStatus list={list} />
    </>
  )
}

export default HomePage
