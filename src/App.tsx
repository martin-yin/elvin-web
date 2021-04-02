import React from 'react'
import { Layout, Menu, Tabs, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { HashRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'

const { Header, Content } = Layout
import './index.less'

import ReportPage from './view/report/report.page'
import HttpPage from './view/report/http.page'
import ErrorPage from './view/report/error.page'

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="http">API</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="error">资源错误</Link>
    </Menu.Item>
  </Menu>
)

const Routers = [
  { path: '/', name: 'ReportPage', component: ReportPage },
  { path: '/http', name: 'HttpPage', component: HttpPage },
  { path: '/error', name: 'ErrorPage', component: ErrorPage }
]

function App() {
  return (
    <>
      <Layout className="layout">
        <Router>
          <Header>
            <div className="logo" />
            <div className="menu-container">
              <span className="menu-right menu-short">
                <Link to="/">首页</Link>
              </span>
              <span className="menu-right menu-short">用户</span>
              <span className="menu-right menu-short">
                <Link to="/">性能</Link>
              </span>
              <span className="menu-right menu-short">
                <Link to="/http">APi请求</Link>
              </span>
              <span className="menu-right menu-short">
                <Link to="/error">资源错误</Link>
              </span>
            </div>
          </Header>
        </Router>
        <Content style={{ margin: '50px 0px ', padding: '0 50px' }}>
          <Router>
            <Switch>
              {Routers.map((item, index) => {
                return <Route key={index} path={item.path} exact render={() => <item.component />} />
              })}
              <Redirect from={'*'} to={'/'} />
            </Switch>
          </Router>
        </Content>
      </Layout>
    </>
  )
}

export default App
