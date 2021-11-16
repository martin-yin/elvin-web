import React, { ComponentType, FC, lazy } from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import LayoutPage, { OutletLayout } from '../layout/layoutPage'
import HttpPage from '../view/http/httpPage'
import HttperrorPage from '../view/httperror/httperrorPage'
import JserrPage from '../view/jsErr/jsErrPage'
import LoginPage from '../view/login/loginPage'
import PerformancePage from '../view/performance/performancePage'
import StaticErrPage from '../view/staticErr/staticErrPage'

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
            { path: 'project', element: <RouteWrapper element={lazy(() => import('../view/project/projectPage'))} /> },
            { path: 'team', element: <RouteWrapper element={lazy(() => import('../view/team/teamPage'))} /> }
          ]
        },
        {
          path: 'user',
          element: <OutletLayout />,
          children: [
            { path: '', element: <RouteWrapper element={lazy(() => import('../view/user/userPage'))} /> },
            {
              path: 'detail/:session_id/:user_id',
              element: <RouteWrapper element={lazy(() => import('../view/user/useDetailPage'))} />
            }
          ]
        },
        {
          path: '/jsErr',
          element: <OutletLayout />,
          children: [
            {
              path: '',
              element: <RouteWrapper element={lazy(() => import('../view/jsErr/jsErrPage'))} />
            },
            {
              path: 'detail/:error_id',
              element: <RouteWrapper element={lazy(() => import('../view/jsErr/jsErrDetailPage'))} />
            }
          ]
        },
        { path: '/performance', element: <PerformancePage /> },
        { path: '/http', element: <HttpPage /> },
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
