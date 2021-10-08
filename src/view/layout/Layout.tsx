import React, { FC, useState } from 'react'
import { Layout, Menu } from 'antd'
import { DashboardOutlined, UsergroupDeleteOutlined, ThunderboltOutlined, CodeOutlined } from '@ant-design/icons'
const { SubMenu } = Menu
import logo from '../../assets/logo.png'
import './index.less'
import { Link, Outlet } from 'react-router-dom'
import TopHeaderNav from '../../components/headerNav/topHeaderNav'
const { Sider, Content } = Layout
const LayoutPage: FC = props => {
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
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UsergroupDeleteOutlined />}>
            <Link to="/user">用户</Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<ThunderboltOutlined />} title="性能">
            <Menu.Item key="3">
              <Link to="/performance">页面性能</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/http">API接口</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<CodeOutlined />} title="异常">
            <Menu.Item key="5">
              <Link to="/issue">JS异常</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/resource">资源异常</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <TopHeaderNav toggle={toggle} collapsed={collapsed} />
        <Content
          style={{
            padding: 24
          }}
        >
          {/* {props.children} */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
