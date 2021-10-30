import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu, Select } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React, { FC } from 'react'
import { ProjectIF } from '../../interface'
import { useAppState } from '../../stores'
import { useNavMenuInit } from '../hooks/navMenuInit'

import '../index.less'
const { Option } = Select

const ProjectsRender: FC = () => {
  const { projects, monitorId } = useAppState(state => state.appsotre)
  const setActiveMonitorId = useNavMenuInit(projects)

  return (
    <div>
      <Select
        style={{ width: 140, marginRight: '20px' }}
        defaultValue={monitorId}
        key={monitorId}
        onChange={setActiveMonitorId}
      >
        {projects.map((item: ProjectIF.Project, index: number) => {
          return (
            <Option value={item.monitor_id} key={index}>
              {item.project_name}
            </Option>
          )
        })}
      </Select>
    </div>
  )
}

const NavMenu: FC<{
  collapsed: boolean
  toggle: () => void
}> = ({ collapsed, toggle }) => {
  const avatarMenu = (
    <Menu>
      <Menu.Item key="user">修改信息</Menu.Item>
      <Menu.Item key="team">
        <div>团队管理</div>
      </Menu.Item>
      <Menu.Item key="login">
        <div>重新登录</div>
      </Menu.Item>
    </Menu>
  )

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
          <ProjectsRender />
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
