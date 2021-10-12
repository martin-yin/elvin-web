import 'moment/locale/zh-cn'
import React, { FC } from 'react'
import { BrowserRouter, RouteObject, useRoutes } from 'react-router-dom'
import HomePage from './view/home/homePage'
import HttpPage from './view/http/httpPage'
import IssueDetailPage from './view/jserror/issueDetailPage'
import JserrorPage from './view/jserror/issuePage'
import IssuePage from './view/jserror/issuePage'
import LayoutPage from './view/layout/layoutPage'
import LoginPage from './view/login/loginPage'
import PerformancePage from './view/performance/performancePage'
import ProjectPage from './view/project/projectPage'
import ResourcesPage from './view/resources/resourcesPage'
import TeamPage from './view/team/teamPage'
import UserActionPage from './view/User/useDetailPage'
import UserPage from './view/User/userPage'

const RenderRouter: FC = () => {
  const routeList: Array<RouteObject> = [
    {
      path: '/',
      element: <LayoutPage />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/performance', element: <PerformancePage /> },
        { path: '/http', element: <HttpPage /> },
        { path: '/static_err', element: <ResourcesPage /> },
        { path: '/jserror', element: <JserrorPage /> },
        { path: '/issue/detail/:error_id', element: <IssueDetailPage /> },
        { path: '/user', element: <UserPage /> },
        { path: '/user/detail/:session_id/:user_id', element: <UserActionPage /> },
        { path: '/project', element: <ProjectPage /> },
        { path: '/team', element: <TeamPage /> },
        { path: '/project', element: <ProjectPage /> }
      ]
    },
    {
      path: '/login',
      element: <LoginPage />
    }
  ]
  return useRoutes(routeList)
}

const App = () => {
  return (
    <BrowserRouter>
      <RenderRouter />
    </BrowserRouter>
  )
}

export default App
