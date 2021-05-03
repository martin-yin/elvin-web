import { Dropdown, Menu, Select, Space } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import './index.less'
import logo from '../../assets/logo.png'
import { useDispatch } from 'react-redux'
import { useAppState } from '../../stores'
import { setActiveMenu, setMonitorId, setProjectList } from '../../stores/app.store'
import { GetProject } from '../../request'

const { Option } = Select
const TopHeaderNav: FC = () => {
  const { activeMenuIndex, projectList, monitorId } = useAppState(state => state.appsotre)
  const [defaultMonitorId, setDefaultMonitorId] = useState('')
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

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
      title: '资源错误',
      children: [
        {
          title: 'JS错误',
          path: '/js-error'
        },
        {
          title: '资源异常',
          path: '/resource-error'
        }
      ]
    }
  ]

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
    const { data, code } = await GetProject()
    if (code === 0) {
      const monitor_id = localStorage.getItem('monitor_id')
      if (monitor_id) {
        setDefaultMonitorId(monitor_id)
      } else {
        localStorage.setItem('monitor_id', data[0].monitor_id)
        setDefaultMonitorId(data[0].monitor_id)
      }
      dispatch(setProjectList(data))
    }
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

  return (
    <Header>
      <div className="top-header flex">
        <div className="flex-grow-0 flex">
          <div className="header-logo">
            <img src={logo} alt="" />
          </div>
          <div className="">
            {activeMenuIndex === 0 ? (
              ''
            ) : (
              <Select
                style={{ width: 220 }}
                defaultValue={defaultMonitorId}
                key={defaultMonitorId}
                onChange={setProjectId}
              >
                {projectList.map((item: any, index) => {
                  return (
                    <Option value={item.monitor_id} key={index}>
                      {item.project_name}
                    </Option>
                  )
                })}
              </Select>
            )}
          </div>
        </div>
        <div className="flex-grow-1">
          <div className="menu-container">
            {menuList.map((item: any, index) => {
              return (
                <Link key={index} to={item.path}>
                  <div className={`menu-item menu-short ${activeMenuIndex === index ? ' active' : ''}`}>
                    {item?.children ? (
                      <Space>
                        <Dropdown overlay={menuChildren(item.children)}>
                          <p>{item.title}</p>
                        </Dropdown>
                      </Space>
                    ) : (
                      <>{item.title}</>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </Header>
  )
}

export default TopHeaderNav
