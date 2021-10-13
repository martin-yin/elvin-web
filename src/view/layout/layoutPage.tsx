import { Layout } from 'antd'
import React, { FC, Suspense, useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../../assets/logo.png'
import projectInteractor from '../../core/interactors/projectInteractor'
import store, { useAppDispatch, useAppState } from '../../stores'
import { setMonitorIdAndProject } from '../../stores/app.store'
import NavMenu from './components/navMenu'
import SiderMenu from './components/siderMenu'
import './index.less'
const { Sider, Content } = Layout
const LayoutPage: FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const toggle = () => {
    setCollapsed(!collapsed)
  }
  const { projectList, monitorId } = useAppState(state => state.appsotre)
  const storeDispatch = useAppDispatch()
  const initProjectList = useCallback(async () => {
    if (projectList.length === 0) {
      const { monitor_id, projects } = await projectInteractor.getProjects()
      storeDispatch(
        setMonitorIdAndProject({
          monitor_id,
          projectList: projects
        })
      )
    }
  }, [])

  useEffect(() => {
    initProjectList()
  }, [])
  // throw new Error('这个是异常')
  return (
    <Layout>
      <Sider collapsed={collapsed} theme="light">
        <div className="logo">
          <img src={logo} />
        </div>
        <SiderMenu />
      </Sider>
      <Layout className="site-layout">
        <NavMenu toggle={toggle} collapsed={collapsed} projectList={projectList} monitorId={monitorId} />
        <Content>
          <Suspense fallback={<>加载中</>}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
