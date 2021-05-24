import { Dropdown, Menu, Select, Space, Avatar } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import './index.less'
import logo from '../../assets/logo.png'
import { useDispatch } from 'react-redux'
import { useAppState } from '../../stores'
import { setActiveMenu, setMonitorId, setProjectList } from '../../stores/app.store'
import { GetProjectList } from '../../request/admin'

const menuList = [
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
  const { activeMenuIndex, projectList, monitorId } = useAppState(state => state.appsotre)
  const [defaultMonitorId, setDefaultMonitorId] = useState('')
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  history.listen(location => {
    setMenuInfo(location.pathname)
  })

  const setMenuInfo = (path: string) => {
    let index = 0
    if (path == '/') {
      index = 0
    } else if (path == '/survey') {
      index = 1
    } else if (path == '/user') {
      index = 2
    } else if (path == '/performance' || path == '/http') {
      index = 3
    } else if (path.includes('/user-detail')) {
      index = 2
    } else {
      index = 4
    }
    dispatch(setActiveMenu(index))
  }

  const initData = useCallback(async () => {
    setMenuInfo(location.pathname)
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

  const menuChildren = (children: any) => {
    return (
      <Menu>
        {children.map((item: any, key: any) => {
          return (
            <Menu.Item key={key}>
              <Link to={item.path}>
                <div className="concurrency-container">{item.title}</div>
              </Link>
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }

  const historyPush = (url: string) => {
    history.push(url)
  }

  const avatarMenu = (
    <Menu>
      <Menu.Item>修改信息</Menu.Item>
      <Menu.Item>
        <div onClick={() => historyPush('/team')}>团队管理</div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={() => historyPush('/login')}>重新登录</div>
      </Menu.Item>
    </Menu>
  )

  const projectSelectRender = (projectList: any) => {
    if (projectList.length == 0) {
      return <></>
    } else {
      return (
        <Select style={{ width: 220 }} defaultValue={defaultMonitorId} key={defaultMonitorId} onChange={setProjectId}>
          {projectList.map((item: any, index: number) => {
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
      return menuList.map((item: any, index: number) => {
        return (
          <Link key={index} to={item.path}>
            <div className={`menu-item menu-short ${activeMenuIndex === index ? ' active' : ''}`}>
              {item?.children ? (
                <Space>
                  <Dropdown overlay={menuChildren(item.children)} placement="bottomCenter">
                    <p>{item.title}</p>
                  </Dropdown>
                </Space>
              ) : (
                <>{item.title}</>
              )}
            </div>
          </Link>
        )
      })
    }
  }

  return (
    <Header>
      <div className="top-header flex">
        <div className="flex-grow-0 flex">
          <div className="header-logo">
            <a href="/">
              <img src={logo} alt="" />
            </a>
          </div>
          <div className="">{activeMenuIndex === 0 ? '' : projectSelectRender(projectList)}</div>
        </div>
        <div className="flex-grow-1">
          <div className="menu-container">{activeMenuIndex === 0 ? '' : menuRender(menuList)}</div>
        </div>
        <div className="flex-grow-0" style={{ marginLeft: '20px' }}>
          <Dropdown overlay={avatarMenu} placement="bottomCenter">
            <div>
              <Space>
                <Avatar size={36} src="https://qq.yh31.com/tp/zjbq/202011171044101948.jpg" />
              </Space>
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}

export default TopHeaderNav
