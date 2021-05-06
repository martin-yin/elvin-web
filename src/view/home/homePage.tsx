import React, { FC } from 'react'
import ProjectList from '../../components/project/projectList'
import { useAppState } from '../../stores'
import { Button, Empty } from 'antd'

import './index.less'
import { useHistory } from 'react-router-dom'
const HomePage: FC = () => {
  const { projectList } = useAppState(state => state.appsotre)
  const history = useHistory()

  return (
    <>
      {projectList.length > 0 ? (
        <ProjectList list={projectList} />
      ) : (
        <>
          <Empty
            description={
              <div>
                <p>暂无项目</p>
                <Button
                  type="primary"
                  onClick={() => {
                    history.push('/project')
                  }}
                >
                  创建新的项目
                </Button>
              </div>
            }
          />
        </>
      )}
    </>
  )
}

export default HomePage
