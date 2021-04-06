import React from 'react'
import { Layout, Menu } from 'antd'
import { HashRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'

const { Header, Content } = Layout
import './index.less'

import PerformancePage from './view/report/performance.page'
import HttpPage from './view/report/http.page'
import ErrorPage from './view/report/error.page'
import UserPage from './view/report/use.page'
import UserBehaviorDetailPage from './view/report/use.behavior.detail.page'
import HomePage from './view/report/home.page'

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
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/performance', name: 'PerformancePage', component: PerformancePage },
  { path: '/http', name: 'HttpPage', component: HttpPage },
  { path: '/error', name: 'ErrorPage', component: ErrorPage },
  { path: '/user', name: 'UserPage', component: UserPage },
  { path: '/user-detail/:userId', name: 'UserBehaviorDetailPage', component: UserBehaviorDetailPage }
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
              <span className="menu-right menu-short">
                <Link to="/user">用户</Link>
              </span>
              <span className="menu-right menu-short">
                <Link to="/performance">性能</Link>
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
        <Content style={{ margin: '20px 0px ', padding: '0 60px' }}>
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
