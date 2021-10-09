import React, { FC, useState } from 'react'
import { Layout, Menu } from 'antd'
import logo from '../../assets/logo.png'
import './index.less'
import { Outlet } from 'react-router-dom'
import TopHeaderNav from '../../components/topHeaderNav/topHeaderNav'
import SiderMenu from './components/siderMenu'
const { Sider, Content } = Layout
const LayoutPage: FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout>
      <Sider trigger={null} collapsed={collapsed} theme="light">
        <div className="logo">
          <img src={logo} />
        </div>
        <SiderMenu />
      </Sider>
      <Layout className="site-layout">
        <TopHeaderNav toggle={toggle} collapsed={collapsed} />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
