import 'moment/locale/zh-cn'
import React, { ComponentType, FC, lazy, Suspense } from 'react'
import { BrowserRouter, RouteObject, RouteProps, useRoutes } from 'react-router-dom'
import HttpPage from './view/http/httpPage'
import HttperrorPage from './view/httperror/httperrorPage'
import IssueDetailPage from './view/jserror/issueDetailPage'
import JserrorPage from './view/jserror/issuePage'
import LayoutPage from './view/layout/layoutPage'
import LoginPage from './view/login/loginPage'
import PerformancePage from './view/performance/performancePage'
import ProjectPage from './view/project/projectPage'
import ResourcesPage from './view/resources/resourcesPage'
import TeamPage from './view/team/teamPage'
import UserActionPage from './view/user/useDetailPage'
import UserPage from './view/user/userPage'
type RouteWrapperProps = {
  element: React.LazyExoticComponent<ComponentType<any>>
}

const RouteWrapper: React.FC<RouteWrapperProps> = props => {
  const { element: ElementComponent } = props
  return <ElementComponent />
}
const RenderRouter: FC = () => {
  const routeList: Array<RouteObject> = [
    {
      path: '/',
      element: <LayoutPage />,
      children: [
        { path: '/', element: <RouteWrapper element={lazy(() => import('./view/home/homePage'))} /> },
        { path: '/performance', element: <PerformancePage /> },
        { path: '/http', element: <HttpPage /> },
        { path: '/static_err', element: <ResourcesPage /> },
        { path: '/jserror', element: <JserrorPage /> },
        { path: '/issue/detail/:error_id', element: <IssueDetailPage /> },
        { path: '/user', element: <UserPage /> },
        { path: '/user/detail/:session_id/:user_id', element: <UserActionPage /> },
        { path: '/project', element: <ProjectPage /> },
        { path: '/team', element: <TeamPage /> },
        { path: '/project', element: <ProjectPage /> },
        { path: '/httperror', element: <HttperrorPage /> }
      ]
    },
    {
      path: '/login',
      element: <LoginPage />
    }
  ]
  return useRoutes(routeList)
}

class ErrorComponent extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    console.log(error, 'error')
    console.log(info, 'info')
    this.setState({ hasError: true })
  }

  render() {
    return this.state.hasError ? '哥我来了' : this.props.children
  }
}

const App = () => {
  return (
    <BrowserRouter>
      <ErrorComponent>
        <RenderRouter />
      </ErrorComponent>
    </BrowserRouter>
  )
}

export default App
