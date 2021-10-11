import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu, Select } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React, { FC, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import projectInteractor from '../../../core/interactors/projectInteractor'
import { ProjectIF } from '../../../interface'
import { useAppDispatch, useAppState } from '../../../stores'
import { setMonitorId, setMonitorIdAndProject } from '../../../stores/app.store'
import './index.less'
const { Option } = Select

const NavMenu: FC<{
  collapsed: boolean
  toggle: () => void
}> = ({ collapsed, toggle }) => {
  const { projectList, monitorId } = useAppState(state => state.appsotre)
  const navigate = useNavigate()
  const storeDispatch = useAppDispatch()
  const initData = useCallback(async () => {
    const { monitor_id, projectList } = await projectInteractor.getProjects()
    storeDispatch(
      setMonitorIdAndProject({
        monitor_id,
        projectList
      })
    )
  }, [])

  useEffect(() => {
    initData()
  }, [])

  const setProjectId = (value: string) => {
    storeDispatch(setMonitorId(value))
    navigate('/user')
  }

  const avatarMenu = (
    <Menu>
      <Menu.Item key="user">修改信息</Menu.Item>
      <Menu.Item key="team">
        <div>团队管理</div>
      </Menu.Item>
      <Menu.Item key="login">
        <div
          onClick={() => {
            localStorage.setItem('token', '')
          }}
        >
          重新登录
        </div>
      </Menu.Item>
    </Menu>
  )

  const selectRender = (projectList: ProjectIF.ProjectList) => {
    if (projectList.length > 0) {
      return (
        <Select
          style={{ width: 140, marginRight: '20px' }}
          defaultValue={monitorId}
          key={monitorId}
          onChange={setProjectId}
        >
          {projectList.map((item: ProjectIF.Project, index: number) => {
            return (
              <Option value={item.monitor_id} key={index}>
                {item.project_name}
              </Option>
            )
          })}
        </Select>
      )
    }
    return <></>
  }

  return (
    <Header>
      <div className="flex">
        <div className="flex-grow-1">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle
          })}
        </div>
        <div className="flex-grow-0 flex">
          <div>{selectRender(projectList)}</div>
          <Dropdown overlay={avatarMenu} placement="bottomCenter">
            <div>
              <Avatar size={36} src="https://qq.yh31.com/tp/zjbq/202011171044101948.jpg" />
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}

export default NavMenu
