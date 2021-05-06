import React, { FC } from 'react'
import ProjectList from '../../components/project/projectList'
import { useAppState } from '../../stores'
import { Empty } from 'antd'

import './index.less'
const HomePage: FC = () => {
  const { projectList } = useAppState(state => state.appsotre)

  return (
    <>
      {projectList.length > 0 ? (
        <ProjectList list={projectList} />
      ) : (
        <>
          <Empty />
        </>
      )}
    </>
  )
}

export default HomePage
