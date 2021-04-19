import { Select } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React, { FC, useCallback, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import './index.less'
import logo from '../../assets/logo.png'
import { useDispatch } from 'react-redux'
import { useAppState } from '../../stores'
import { setActiveMenu, setActiePorjectId } from '../../stores/app.store'

const { Option } = Select
const TopHeaderNav: FC = () => {
  const { activeMenuIndex } = useAppState(state => state.appsotre)
  const history = useHistory()

  const location = useLocation()
  const dispatch = useDispatch()

  const menuList = [
    {
      title: '首页',
      path: '/'
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

  const setActiePorject = (id: number) => {
    setActiePorjectId(id)
  }

  const setMenuInfo = (path: string) => {
    menuList.map((item, index) => {
      if (item.path === path) {
        dispatch(setActiveMenu(index))
      }
    })
  }

  const initData = useCallback(async () => {
    setMenuInfo(location.pathname)
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

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
                <Select defaultValue="🐕" style={{ width: 120 }} onChange={setActiePorjectId}>
                  <Option value={0}>🐕鸡巴前端项目</Option>
                  <Option value={1}>🤖鸡巴前端项目</Option>
                  <Option value={2}>💩鸡巴前端项目</Option>
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
