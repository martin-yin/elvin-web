import { Dropdown, Menu, Select, Avatar } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './index.less'
import { useDispatch } from 'react-redux'
import { useAppState } from '../../stores'
import { setActiveMenu, setMonitorId, setProjectList } from '../../stores/app.store'
import { GetProjectList } from '../../request/admin'
import SubMenu from 'antd/lib/menu/SubMenu'
import logo from '../../assets/logo.png'
import { ProjectIF } from '../../interface'
const { Option } = Select

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

const TopHeaderNav: FC<any> = ({ collapsed, toggle }) => {
  const { activeMenu, projectList, monitorId } = useAppState(state => state.appsotre)
  const [defaultMonitorId, setDefaultMonitorId] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const setMenu = (path: string) => {
    dispatch(setActiveMenu('/' + path.split('/')[1]))
  }

  const initData = useCallback(async () => {
    setMenu(location.pathname)
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

  // 菜单渲染
  const menuRender = (menuList: any) => {
    if (projectList.length == 0) {
      return <></>
    } else {
      return (
        <Menu mode="horizontal" onClick={(e: any) => setMenu(e.key)} selectedKeys={[activeMenu]}>
          {menuList.map((item: any) => {
            return (
              <>
                {item?.children ? (
                  <SubMenu key={`${item.title}`} title={item.title}>
                    {item.children.map((item: any) => {
                      return (
                        <Menu.Item key={`${item.path}`}>
                          <Link to={item.path}>{item.title}</Link>
                        </Menu.Item>
                      )
                    })}
                  </SubMenu>
                ) : (
                  <Menu.Item key={item.path}>
                    <Link key={item.title} to={item.path}>
                      {item.title}
                    </Link>
                  </Menu.Item>
                )}
              </>
            )
          })}
        </Menu>
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

export default TopHeaderNav
