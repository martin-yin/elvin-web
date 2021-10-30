import React, { ComponentType, FC, lazy } from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import LayoutPage, { OutletLayout } from '../layout/layoutPage'
import HttpPage from '../view/http/httpPage'
import HttperrorPage from '../view/httperror/httperrorPage'
import JserrorPage from '../view/jserror/issuePage'
import LoginPage from '../view/login/loginPage'
import PerformancePage from '../view/performance/performancePage'
import ProjectPage from '../view/project/projectPage'
import StaticErrPage from '../view/resources/resourcesPage'
import TeamPage from '../view/team/teamPage'
import UserActionPage from '../view/user/useDetailPage'
import UserPage from '../view/user/userPage'

type RouteWrapperProps = {
  element: React.LazyExoticComponent<ComponentType<any>>
}

const RouteWrapper: React.FC<RouteWrapperProps> = props => {
  const { element: ElementComponent } = props
  return <ElementComponent />
}

export const RenderRouter: FC = () => {
  const routeList: Array<RouteObject> = [
    {
      path: '/',
      element: <LayoutPage />,
      children: [
        {
          path: 'dashboard',
          element: <OutletLayout />,
          children: [
            { path: '', element: <RouteWrapper element={lazy(() => import('../view/home/homePage'))} /> },
            { path: 'project', element: <ProjectPage /> },
            { path: 'team', element: <TeamPage /> }
          ]
        },
        {
          path: 'user',
          element: <OutletLayout />,
          children: [
            { path: '', element: <UserPage /> },
            { path: 'detail/:session_id/:user_id', element: <UserActionPage /> }
          ]
        },
        { path: '/performance', element: <PerformancePage /> },
        { path: '/http', element: <HttpPage /> },
        {
          path: '/jsErr',
          element: <JserrorPage />
          // children: [{ path: '/issue/detail/:error_id', element: <IssueDetailPage /> }]
        },
        { path: '/httpErr', element: <HttperrorPage /> },
        { path: '/staticErr', element: <StaticErrPage /> }
      ]
    },
    {
      path: '/login',
      element: <LoginPage />
    }
  ]
  return useRoutes(routeList)
}
