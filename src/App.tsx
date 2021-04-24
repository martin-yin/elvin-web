import React, { lazy } from 'react'
import { ConfigProvider, Layout } from 'antd'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
const { Content } = Layout
import './index.less'
import './assets/icofont.min.css'
import HomePage from './view/HomePage/home.page'
import TopHeaderNav from './components/TopHeaderNav/top.header.nav'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'
import LoginPage from './view/Login/login.page'
import { Suspense } from 'react'

const Routers = [
  { path: '/', name: 'HomePage', component: HomePage },
  {
    path: '/survey',
    name: 'SurveyPage',
    component: lazy(() => import(/* webpackChunkName: "survey'"*/ './view/SurveyPage/survey.page'))
  },
  {
    path: '/performance',
    name: 'PerformancePage',
    component: lazy(() => import(/* webpackChunkName: "performance'"*/ './view/PerformancePage/performance.page'))
  },
  {
    path: '/http',
    name: 'HttpPage',
    component: lazy(() => import(/* webpackChunkName: "http'"*/ './view/HttpPage/http.page'))
  },
  {
    path: '/resource-error',
    name: 'ErrorPage',
    component: lazy(() => import(/* webpackChunkName: "error'"*/ './view/ErrorPage/error.page'))
  },
  {
    path: '/js-error',
    name: 'jsError',
    component: lazy(() => import(/* webpackChunkName: "js-error'"*/ './view/JsErrorPage/js.error.page'))
  },
  {
    path: '/user',
    name: 'UserPage',
    component: lazy(() => import(/* webpackChunkName: "use'"*/ './view/User/use.page'))
  },
  {
    path: '/user-detail/:userId',
    name: 'UserBehaviorDetailPage',
    component: lazy(() => import(/* webpackChunkName: "user-action-detail'"*/ './view/User/use.action.detail.page'))
  }
]

function App() {
  return (
    <>
      <ConfigProvider locale={locale}>
        <Router>
          <Layout className="layout">
            <TopHeaderNav />
            <Switch>
              <Suspense fallback={<div>Loading</div>}>
                {Routers.map((item, index) => {
                  return (
                    <Route
                      key={index}
                      path={item.path}
                      exact
                      render={() => (
                        <Content className="site-layout-content">
                          <item.component />
                        </Content>
                      )}
                    />
                  )
                })}
              </Suspense>
              <Route path="/login" component={LoginPage} />
              <Redirect from={'*'} to={'/'} />
            </Switch>
          </Layout>
        </Router>
      </ConfigProvider>
    </>
  )
}

export default App
