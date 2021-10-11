import { CodeOutlined, DashboardOutlined, ThunderboltOutlined, UsergroupDeleteOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
const { SubMenu } = Menu

const menuList = [
  {
    key: '/',
    path: '/',
    title: '首页',
    icon: <DashboardOutlined />
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
        title: '页面加载'
      },
      {
        key: 'static',
        path: '/static',
        title: '静态资源性能'
      }
    ]
  },
  {
    key: 'sub2',
    title: '异常分析',
    icon: <CodeOutlined />,
    children: [
      {
        key: 'jserror',
        path: '/jserror',
        title: 'JS异常'
      },
      {
        key: 'httperror',
        path: '/httperror',
        title: '请求异常'
      },
      {
        key: 'static_err',
        path: '/static_err',
        title: '静态资源异常'
      }
    ]
  }
]

const findKeyByMenuList = (path: string) => {
  const item = menuList.find(item => {
    if (item?.children) {
      return item.children.find(child => child.path == path)
    }
    if (item.path == path) {
      return item
    }
  })
  if (item?.children) {
    const chilld = item.children.find(child => child.path == path)
    return [[chilld.path], [item.key]]
  } else {
    return item.path
  }
}

const SiderMenu: FC = () => {
  const location = useLocation()
  const [menuKeys, setMenuKeys] = useState({
    selectKeys: [],
    openKeys: []
  })
  useEffect(() => {
    const res = findKeyByMenuList(location.pathname)
    if (Array.isArray(res)) {
      setMenuKeys({
        selectKeys: res[0],
        openKeys: res[1]
      })
    } else {
      setMenuKeys({
        selectKeys: Array.of(res),
        openKeys: []
      })
    }
  }, [])

  const menuClick = item => {
    if (Array.isArray(item.keyPath)) {
      setMenuKeys({
        selectKeys: Array.of(item.keyPath[0]),
        openKeys: Array.of(item.keyPath[1])
      })
    } else {
      const res = findKeyByMenuList(item.keyPath)
      setMenuKeys({
        selectKeys: Array.of(res),
        openKeys: []
      })
    }
  }

  const onOpenChange = openKeys => {
    setMenuKeys({
      ...menuKeys,
      openKeys
    })
  }

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
            return (
              <Menu.Item key={child.path}>
                <Link to={child.path}>{child.title}</Link>
              </Menu.Item>
            )
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
      {menuList.map((item: any) => {
        return renderMenu(item)
      })}
    </Menu>
  )
}

export default SiderMenu
