import React, { FC, lazy } from 'react'
import { Alert, ConfigProvider, Layout, Spin } from 'antd'
import { BrowserRouter, Router, useRoutes } from 'react-router-dom'
import './index.less'
import HomePage from './view/home/homePage'
import 'moment/locale/zh-cn'
import PerformancePage from './view/performance/performancePage'
import HttpPage from './view/http/httpPage'
import ResourcesPage from './view/resources/resourcesPage'
import IssuePage from './view/issue/issuePage'
import IssueDetailPage from './view/issue/issueDetailPage'
import UserPage from './view/user/userPage'
import LayoutPage from './view/layout/Layout'
import ProjectPage from './view/project/projectPage'
import TeamPage from './view/team/teamPage'
import LoginPage from './view/login/loginPage'

// const RenderRouter: FC = () => {
//   const element = useRoutes([
//     { path: '/', element: <HomePage /> },
//     { path: '/performance', element: <PerformancePage /> },
//     { path: '/http', element: <HttpPage /> },
//     { path: '/resource', element: <ResourcesPage /> },
//     { path: '/issue', element: <IssuePage /> },
//     { path: '/issue/detail/:error_id', element: <IssueDetailPage /> },
//     { path: '/user', element: <UserPage /> },
//     { path: '/user/detail/:sessionId/:userId', element: <IssueDetailPage /> },
//     { path: '/project', element: <ProjectPage /> },
//     { path: '/team', element: <TeamPage /> },
//     { path: '/project', element: <ProjectPage /> }
//   ])
//   return element
// }

const RenderRouter: FC = () => {
  const routeList = [
    {
      path: '/',
      element: <LayoutPage />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/performance', element: <PerformancePage /> },
        { path: '/http', element: <HttpPage /> },
        { path: '/resource', element: <ResourcesPage /> },
        { path: '/issue', element: <IssuePage /> },
        { path: '/issue/detail/:error_id', element: <IssueDetailPage /> },
        { path: '/user', element: <UserPage /> },
        { path: '/user/detail/:sessionId/:userId', element: <IssueDetailPage /> },
        { path: '/project', element: <ProjectPage /> },
        { path: '/team', element: <TeamPage /> },
        { path: '/project', element: <ProjectPage /> }
      ]
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
