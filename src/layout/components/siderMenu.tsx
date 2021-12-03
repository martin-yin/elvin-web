import { CodeOutlined, DashboardOutlined, ThunderboltOutlined, UsergroupDeleteOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { userSiderMenuInit } from '../hooks/siderMenuInit'
const { SubMenu } = Menu

interface MenuItem {
  key: string
  path?: string
  title: string
  icon: JSX.Element
  includes?: Array<string>
  children?: Array<Omit<MenuItem, 'icon'>>
  isShow?: boolean
}

const menus: Array<MenuItem> = [
  {
    key: '/',
    path: '/dashboard',
    title: '首页',
    icon: <DashboardOutlined />,
    includes: ['project']
  },
  {
    key: 'user',
    path: '/user',
    title: '用户',
    icon: <UsergroupDeleteOutlined />
  },
  {
    key: 'http',
    path: '/http',
    title: '请求分析',
    icon: <UsergroupDeleteOutlined />
  },
  {
    key: 'sub1',
    title: '性能分析',
    icon: <ThunderboltOutlined />,
    children: [
      {
        key: 'performance',
        path: '/performance',
        title: '页面加载',
        isShow: true
      }
    ]
  },
  {
    key: 'sub2',
    title: '异常分析',
    icon: <CodeOutlined />,
    children: [
      {
        key: 'jsErr',
        path: '/jsErr',
        title: 'JS异常',
        isShow: true
      },
      {
        key: 'httpErr',
        path: '/httpErr',
        title: '请求异常',
        isShow: true
      },
      {
        key: 'staticErr',
        path: '/staticErr',
        title: '静态资源异常',
        isShow: true
      }
    ]
  }
]

const SiderMenu: FC = () => {
  const { menuClick, onOpenChange, menuKeys } = userSiderMenuInit()

  const renderMenu = item => {
    const renderMenuItem = item => {
      return (
        <Menu.Item key={item.path} icon={item.icon}>
          <Link to={item.path}>{item.title}</Link>
        </Menu.Item>
      )
    }

    const renderSubMenu = item => {
      return (
        <SubMenu key={item.key} icon={item.icon} title={item.title}>
          {item.children.map(child => {
            if (child.isShow) {
              return (
                <Menu.Item key={child.path}>
                  <Link to={child.path}>{child.title}</Link>
                </Menu.Item>
              )
            }
          })}
        </SubMenu>
      )
    }
    return item?.children ? renderSubMenu(item) : renderMenuItem(item)
  }

  return (
    <Menu
      mode="inline"
      onOpenChange={onOpenChange}
      defaultOpenKeys={menuKeys.openKeys}
      openKeys={menuKeys.openKeys}
      defaultSelectedKeys={menuKeys.selectKeys}
      selectedKeys={menuKeys.selectKeys}
      onClick={menuClick}
    >
      {menus.map(item => {
        return renderMenu(item)
      })}
    </Menu>
  )
}

export default SiderMenu
