import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu, Select } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ProjectIF } from '../../../interface'
import { GetProjectList } from '../../../request/admin'
import { useAppState } from '../../../stores'
import { setMonitorId, setProjectList } from '../../../stores/app.store'
import './index.less'

const { Option } = Select

const NavMenu: FC<any> = ({ collapsed, toggle }) => {
  const { activeMenu, projectList, monitorId } = useAppState(state => state.appsotre)
  const [defaultMonitorId, setDefaultMonitorId] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initData = useCallback(async () => {
    const { data, code } = await GetProjectList()
    if (code === 200) {
      const monitor_id = localStorage.getItem('monitor_id') ? localStorage.getItem('monitor_id') : data[0]?.monitor_id
      setDefaultMonitorId(monitor_id)
      dispatch(setProjectList(data))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  useEffect(() => {
    setDefaultMonitorId(monitorId)
  }, [monitorId])

  const setProjectId = (value: string) => {
    dispatch(setMonitorId(value))
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

  const projectSelectRender = (projectList: ProjectIF.ProjectList) => {
    if (projectList.length == 0) {
      return <></>
    } else {
      return (
        <Select
          style={{ width: 140, marginRight: '20px' }}
          defaultValue={defaultMonitorId}
          key={defaultMonitorId}
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
          <div className="">{activeMenu === '/' ? '' : projectSelectRender(projectList)}</div>
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
