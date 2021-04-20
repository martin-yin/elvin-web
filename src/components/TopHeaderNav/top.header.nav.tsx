import { Select } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import './index.less'
import logo from '../../assets/logo.png'
import { useDispatch } from 'react-redux'
import { useAppState } from '../../stores'
import { setActiveMenu, setActiePorjectId, setProjectList } from '../../stores/app.store'
import { GetProject } from '../../request'

const { Option } = Select
const TopHeaderNav: FC = () => {
  const { activeMenuIndex, projectList } = useAppState(state => state.appsotre)
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
      path: '/performance'
    },
    {
      title: 'API接口',
      path: '/http'
    },
    {
      title: 'JS错误',
      path: '/js-error'
    },
    {
      title: '资源错误',
      path: '/error'
    }
  ]

  history.listen(location => {
    setMenuInfo(location.pathname)
  })

  const setMenuInfo = (path: string) => {
    menuList.map((item, index) => {
      if (item.path === path) {
        dispatch(setActiveMenu(index))
      }
    })
  }

  const initData = useCallback(async () => {
    setMenuInfo(location.pathname)
    const { data, code } = await GetProject()
    if (code === 0) {
      localStorage.setItem('last_app_id', data[0].id)
      dispatch(setProjectList(data))
    }
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  const setProjectId = (value: string) => {
    localStorage.setItem('last_app_id', value)
    dispatch(setActiePorjectId(value))
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
              <>
                <Select defaultValue={'1'} style={{ width: 120 }} onChange={setProjectId}>
                  {projectList.map((item: any, index) => {
                    return (
                      <Option value={item.id} key={index}>
                        {item.project_name}
                      </Option>
                    )
                  })}
                </Select>
              </>
            )}
          </div>
        </div>
        <div className="flex-grow-1">
          <div className="menu-container">
            {menuList.map((item: any, index) => {
              return (
                <Link key={index} to={item.path}>
                  <div className={`menu-item menu-short ${activeMenuIndex === index ? ' active' : ''}`}>
                    {item.title}
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
