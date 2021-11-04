import React, { FC } from 'react'
import CreateProject from './components/createProject'
import { HealthStatus } from './components/healthStatus'
import { useHomePageInit } from './hook/useHomePageInit'
import './index.less'

const HomePage: FC = () => {
  const { list } = useHomePageInit()

  return (
    <>
      <CreateProject />
      <HealthStatus list={list} />
    </>
  )
}

export default HomePage
