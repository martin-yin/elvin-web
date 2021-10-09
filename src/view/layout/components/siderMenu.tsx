import React, { FC, useEffect, useState } from 'react'
import { DashboardOutlined, UsergroupDeleteOutlined, ThunderboltOutlined, CodeOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
const { SubMenu } = Menu
const MenuList = [
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
    key: 'sub1',
    title: '性能',
    icon: <ThunderboltOutlined />,
    children: [
      {
        key: 'performance',
        path: '/performance',
        title: '页面性能'
      },
      {
        key: 'http',
        path: '/http',
        title: 'API接口'
      }
    ]
  },
  {
    key: 'sub2',
    title: '异常',
    icon: <CodeOutlined />,
    children: [
      {
        key: 'issue',
        path: '/issue',
        title: 'JS异常'
      },
      {
        key: 'resource',
        path: '/resource',
        title: '资源异常'
      }
    ]
  }
]

function findKeyByMenuList(path) {
  const item = MenuList.find(item => {
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
    console.log(menuKeys.openKeys)
  }, [])

  const menuClick = ({ item, key, keyPath }) => {
    if (Array.isArray(keyPath)) {
      setMenuKeys({
        selectKeys: Array.of(keyPath[0]),
        openKeys: Array.of(keyPath[1])
      })
    } else {
      const res = findKeyByMenuList(keyPath)
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
      {MenuList.map((item: any) => {
        return (
          <>
            {item?.children ? (
              <SubMenu key={item.key} icon={item.icon} title={item.title}>
                {item.children.map(child => {
                  return (
                    <Menu.Item key={child.path}>
                      <Link to={child.path}>{child.title}</Link>
                    </Menu.Item>
                  )
                })}
              </SubMenu>
            ) : (
              <Menu.Item key={item.path} icon={item.icon}>
                <Link to={item.path}>{item.title}</Link>
              </Menu.Item>
            )}
          </>
        )
      })}
    </Menu>
  )
}

export default SiderMenu
