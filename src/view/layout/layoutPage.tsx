import { Layout } from 'antd'
import React, { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../../assets/logo.png'
import NavMenu from './components/navMenu'
import SiderMenu from './components/siderMenu'
import './index.less'
const { Sider, Content } = Layout
const LayoutPage: FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout>
      <Sider collapsed={collapsed} theme="light">
        <div className="logo">
          <img src={logo} />
        </div>
        <SiderMenu />
      </Sider>
      <Layout className="site-layout">
        <NavMenu toggle={toggle} collapsed={collapsed} />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
