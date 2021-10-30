import { useEffect } from 'react'
import { useAppState } from '../../stores'
import { setMenuKeys } from '../../stores/app.store'
import { useHookTools } from '../../utils/useHookTools'

export const userSiderMenuInit = () => {
  const { storeDispatch } = useHookTools()
  const { menuKeys } = useAppState(state => state.appsotre)
  useEffect(() => {
    // const res = findKeyByMenuList(menuList, location.pathname)
    // if (Array.isArray(res)) {
    //   storeDispatch(
    //     setMenuKeys({
    //       selectKeys: res[0],
    //       openKeys: res[1]
    //     })
    //   )
    // } else {
    //   if (res.includes.indexOf(location.pathname)) {
    //   }
    //   storeDispatch(
    //     setMenuKeys({
    //       selectKeys: Array.of(res),
    //       openKeys: []
    //     })
    //   )
    // }
  }, [])
  const menuClick = item => {
    if (Array.isArray(item.keyPath)) {
      storeDispatch(
        setMenuKeys({
          selectKeys: Array.of(item.keyPath[0]),
          openKeys: Array.of(item.keyPath[1])
        })
      )
    }
  }

  const onOpenChange = openKeys => {
    storeDispatch(
      setMenuKeys({
        ...menuKeys,
        openKeys
      })
    )
  }

  return { menuClick, onOpenChange, menuKeys }
}
