import React from 'react'
import { Layout } from 'antd'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
const { Content } = Layout
import './index.less'
import PerformancePage from './view/performance.page'
import HttpPage from './view/http.page'
import ErrorPage from './view/error.page'
import UserPage from './view/use.page'
import UserBehaviorDetailPage from './view/use.behavior.detail.page'
import HomePage from './view/home.page'
import JsErrorPage from './view/js.error.page'
import TopHeader from './components/header'

const Routers = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/performance', name: 'PerformancePage', component: PerformancePage },
  { path: '/http', name: 'HttpPage', component: HttpPage },
  { path: '/error', name: 'ErrorPage', component: ErrorPage },
  { path: '/js-error', name: 'jsError', component: JsErrorPage },
  { path: '/user', name: 'UserPage', component: UserPage },
  { path: '/user-detail/:userId', name: 'UserBehaviorDetailPage', component: UserBehaviorDetailPage }
]

function App() {
  return (
    <>
      <Router>
        <Layout className="layout">
          <TopHeader />
          <Content style={{ margin: '20px 0px ', padding: '0 60px' }}>
            <Switch>
              {Routers.map((item, index) => {
                return <Route key={index} path={item.path} exact render={() => <item.component />} />
              })}
              <Redirect from={'*'} to={'/'} />
            </Switch>
          </Content>
        </Layout>
      </Router>
    </>
  )
}

export default App
