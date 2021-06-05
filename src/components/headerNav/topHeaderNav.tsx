import { Dropdown, Menu, Select, Avatar } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import './index.less'
import { useDispatch } from 'react-redux'
import { useAppState } from '../../stores'
import { setActiveMenu, setMonitorId, setProjectList } from '../../stores/app.store'
import { GetProjectList } from '../../request/admin'
import SubMenu from 'antd/lib/menu/SubMenu'
import logo from '../../assets/logo.png'
import { MenuList, ProjectIF } from '../../interface'
const menuList: MenuList = [
  {
    title: '首页',
    path: '/'
  },
  {
    title: '概况',
    path: '/survey'
  },
  {
    title: '用户',
    path: '/user'
  },
  {
    title: '性能',
    children: [
      {
        title: '页面性能',
        path: '/performance'
      },
      {
        title: 'API接口',
        path: '/http'
      }
    ]
  },
  {
    title: '异常',
    children: [
      {
        title: 'JS异常',
        path: '/issues'
      },
      {
        title: '资源异常',
        path: '/resource'
      }
    ]
  }
]

const { Option } = Select
const TopHeaderNav: FC = () => {
  const { activeMenu, projectList, monitorId } = useAppState(state => state.appsotre)
  const [defaultMonitorId, setDefaultMonitorId] = useState('')
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  history.listen(location => {
    setMenu(location.pathname)
  })

  const setMenu = (path: any) => {
    dispatch(setActiveMenu(path))
  }

  const initData = useCallback(async () => {
    setMenu(location.pathname)
    const { data, code } = await GetProjectList()
    if (code === 200) {
      if (data.length > 0) {
        const monitor_id = localStorage.getItem('monitor_id')
        if (monitor_id) {
          setDefaultMonitorId(monitor_id)
        } else {
          localStorage.setItem('monitor_id', data[0].monitor_id)
          setDefaultMonitorId(data[0].monitor_id)
        }
        dispatch(setProjectList(data))
      }
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
    localStorage.setItem('monitor_id', value)
    dispatch(setMonitorId(value))
    history.push('/survey')
  }

  const historyPush = (url: string) => {
    history.push(url)
  }

  const avatarMenu = (
    <Menu>
      <Menu.Item key="user">修改信息</Menu.Item>
      <Menu.Item key="team">
        <div onClick={() => historyPush('/team')}>团队管理</div>
      </Menu.Item>
      <Menu.Item key="login">
        <div onClick={() => historyPush('/login')}>重新登录</div>
      </Menu.Item>
    </Menu>
  )

  const projectSelectRender = (projectList: ProjectIF.ProjectList) => {
    if (projectList.length == 0) {
      return <></>
    } else {
      return (
        <Select style={{ width: 220 }} defaultValue={defaultMonitorId} key={defaultMonitorId} onChange={setProjectId}>
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

  const handleClick = (e: any) => {
    setMenu(e.key)
  }

  // 菜单渲染
  const menuRender = (menuList: any) => {
    if (projectList.length == 0) {
      return <></>
    } else {
      return (
        <Menu mode="horizontal" onClick={handleClick} selectedKeys={[activeMenu]}>
          {menuList.map((item: any) => {
            return (
              <>
                {item?.children ? (
                  <SubMenu key={`children_${item.title}`} title={item.title}>
                    {item.children.map((item: any) => {
                      return (
                        <Menu.Item key={`children_${item.title}`}>
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
        <div className="flex-grow-1 flex">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="">{activeMenu === '' ? '' : projectSelectRender(projectList)}</div>
        </div>
        <div className="flex-grow-0">
          <div className="flex">
            {activeMenu === '' ? '' : menuRender(menuList)}
            <Dropdown overlay={avatarMenu} placement="bottomCenter">
              <div>
                <Avatar size={36} src="https://qq.yh31.com/tp/zjbq/202011171044101948.jpg" />
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </Header>
  )
}

export default TopHeaderNav
