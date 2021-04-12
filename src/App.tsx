import React from 'react'
import { ConfigProvider, Layout } from 'antd'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
const { Content } = Layout
import './index.less'
import './assets/icofont.min.css'
import PerformancePage from './view/PerformancePage/performance.page'
import HttpPage from './view/HttpPage/http.page'
import ErrorPage from './view/ErrorPage/error.page'
import UserPage from './view/User/use.page'
import HomePage from './view/HomePage/home.page'
import JsErrorPage from './view/JsErrorPage/js.error.page'
import TopHeaderNav from './components/TopHeaderNav/top.header.nav'
import UserActionDetailPage from './view/User/use.action.detail.page'
import ErrorBoundary from './ErrorBoundary'

import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'

const Routers = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/performance', name: 'PerformancePage', component: PerformancePage },
  { path: '/http', name: 'HttpPage', component: HttpPage },
  { path: '/error', name: 'ErrorPage', component: ErrorPage },
  { path: '/js-error', name: 'jsError', component: JsErrorPage },
  { path: '/user', name: 'UserPage', component: UserPage },
  { path: '/user-detail/:userId', name: 'UserBehaviorDetailPage', component: UserActionDetailPage }
]

function App() {
  return (
    <>
      <ConfigProvider locale={locale}>
        <Router>
          <Layout className="layout">
            <TopHeaderNav />
            <ErrorBoundary>
              <Content className="site-layout-content">
                <Switch>
                  {Routers.map((item, index) => {
                    return <Route key={index} path={item.path} exact render={() => <item.component />} />
                  })}
                  <Redirect from={'*'} to={'/'} />
                </Switch>
              </Content>
            </ErrorBoundary>
          </Layout>
        </Router>
      </ConfigProvider>
    </>
  )
}

export default App
