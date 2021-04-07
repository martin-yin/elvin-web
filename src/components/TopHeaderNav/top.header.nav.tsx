import { Header } from 'antd/lib/layout/layout'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './index.less'
const TopHeaderNav: FC = () => {
  const [activeMenu, setActiveMenu] = useState('/')
  const history = useHistory()
  history.listen(location => {
    setActiveMenu(location.pathname)
  })

  const initData = useCallback(async () => {
    setActiveMenu('/')
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  return (
    <Header>
      <div className="logo" />
      <div className="menu-container">
        <Link to="/">
          <span className={`menu-right menu-short ${activeMenu === '/' ? 'active' : ''}`}>首页</span>
        </Link>
        <Link to="/user">
          <span className={`menu-right menu-short ${activeMenu === '/user' ? 'active' : ''}`}>用户</span>
        </Link>
        <Link to="/performance">
          <span className={`menu-right menu-short ${activeMenu === '/performance' ? 'active' : ''}`}>性能</span>
        </Link>
        <Link to="/http">
          <span className={`menu-right menu-short ${activeMenu === '/http' ? 'active' : ''}`}>APi请求</span>
        </Link>
        <Link to="/js-error">
          <span className={`menu-right menu-short ${activeMenu === '/js-error' ? 'active' : ''}`}>JS错误</span>
        </Link>
        <Link to="/error">
          <span className={`menu-right menu-short ${activeMenu === '/error' ? 'active' : ''}`}>资源错误</span>
        </Link>
      </div>
    </Header>
  )
}

export default TopHeaderNav
