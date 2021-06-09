import React, { lazy } from 'react'
import { ConfigProvider, Layout } from 'antd'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
const { Content } = Layout
import './index.less'
import HomePage from './view/home/homePage'
import TopHeaderNav from './components/headerNav/topHeaderNav'
import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'
import { Suspense } from 'react'

const Routers = [
  { path: '/', name: 'HomePage', component: HomePage },
  {
    path: '/survey',
    name: 'SurveyPage',
    component: lazy(() => import(/* webpackChunkName: "survey"*/ './view/survey/survey.page'))
  },
  {
    path: '/performance',
    name: 'PerformancePage',
    component: lazy(() => import(/* webpackChunkName: "performance"*/ './view/performance/performancePage'))
  },
  {
    path: '/http',
    name: 'HttpPage',
    component: lazy(() => import(/* webpackChunkName: "http"*/ './view/http/httpPage'))
  },
  {
    path: '/resource',
    name: 'resource',
    component: lazy(() => import(/* webpackChunkName: "error"*/ './view/resources/resourcesPage'))
  },
  {
    path: '/issues',
    name: 'issues',
    component: lazy(() => import(/* webpackChunkName: "issue"*/ './view/issue/issuePage'))
  },
  {
    path: '/issue-detail/:error_id',
    name: 'issue-detail',
    component: lazy(() => import(/* webpackChunkName: "issue-detail"*/ './view/issue/issueDetailPage'))
  },
  {
    path: '/user',
    name: 'UserPage',
    component: lazy(() => import(/* webpackChunkName: "use"*/ './view/user/userPage'))
  },
  {
    path: '/user-detail/:eventId/:userId',
    name: 'UserDetailPage',
    component: lazy(() => import(/* webpackChunkName: "user-detail"*/ './view/user/useDetailPage'))
  },
  {
    path: '/team',
    name: 'Team',
    component: lazy(() => import(/* webpackChunkName: "team"*/ './view/team/teamPage'))
  },
  {
    path: '/project',
    name: 'Project',
    component: lazy(() => import(/* webpackChunkName: "team"*/ './view/project/projectPage'))
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
                  component={lazy(() => import(/* webpackChunkName: "login-page"*/ './view/login/loginPage'))}
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
