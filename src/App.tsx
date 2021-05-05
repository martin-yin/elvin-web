import React, { lazy } from 'react'
import { ConfigProvider, Layout } from 'antd'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
const { Content } = Layout
import './index.less'
import HomePage from './view/homePage/home.page'
import TopHeaderNav from './components/headerNav/topHeaderNav'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'
import { Suspense } from 'react'

const Routers = [
  { path: '/', name: 'HomePage', component: HomePage },
  {
    path: '/survey',
    name: 'SurveyPage',
    component: lazy(() => import(/* webpackChunkName: "survey"*/ './view/surveyPage/survey.page'))
  },
  {
    path: '/performance',
    name: 'PerformancePage',
    component: lazy(() => import(/* webpackChunkName: "performance"*/ './view/performancePage/performance.page'))
  },
  {
    path: '/http',
    name: 'HttpPage',
    component: lazy(() => import(/* webpackChunkName: "http"*/ './view/httpPage/http.page'))
  },
  {
    path: '/resource-error',
    name: 'ErrorPage',
    component: lazy(() => import(/* webpackChunkName: "error"*/ './view/resourcesErrorPage/error.page'))
  },
  {
    path: '/js-error',
    name: 'jsError',
    component: lazy(() => import(/* webpackChunkName: "js-error"*/ './view/jsErrorPage/js.error.page'))
  },
  {
    path: '/user',
    name: 'UserPage',
    component: lazy(() => import(/* webpackChunkName: "use"*/ './view/user/userPage'))
  },
  {
    path: '/user-detail/:userId',
    name: 'UserBehaviorDetailPage',
    component: lazy(() => import(/* webpackChunkName: "user-action-detail"*/ './view/user/useActionDetailPage'))
  },
  {
    path: '/team',
    name: 'team',
    component: lazy(() => import(/* webpackChunkName: "team"*/ './view/team/teamPage'))
  }
]

function App() {
  return (
    <>
      <ConfigProvider locale={locale}>
        <Router>
          <Layout className="layout">
            <Switch>
              <Suspense fallback={<div>Loading</div>}>
                {Routers.map((item, index) => {
                  return (
                    <Route
                      key={index}
                      path={item.path}
                      exact
                      render={() => (
                        <div>
                          <TopHeaderNav />
                          <Content className="site-layout-content">
                            <item.component />
                          </Content>
                        </div>
                      )}
                    />
                  )
                })}
                <Route
                  path="/login"
                  component={lazy(() => import(/* webpackChunkName: "login-page"*/ './view/login/login.page'))}
                />
              </Suspense>
              <Redirect from={'*'} to={'/'} />
            </Switch>
          </Layout>
        </Router>
      </ConfigProvider>
    </>
  )
}

export default App
