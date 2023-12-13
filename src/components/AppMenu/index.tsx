/*
 * @Author: hqk
 * @Date: 2023-03-24 15:13:28
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-12 12:30:23
 * @Description:
 */
import { useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { Icon } from '@iconify-icon/react'
import { useMemoizedFn } from 'ahooks'
import { Menu } from 'antd'
import type { MenuProps } from 'antd/es/menu'
import React, { ReactNode, forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppMenuWrapper } from './style'

interface IProps {
  children?: ReactNode
  mode: 'inline' | 'vertical'
  theme: 'light' | 'dark'
  collapsed: boolean
}

interface IHandler {
  setKey: (key: string) => void
}

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const AppMenu = forwardRef<IHandler, IProps>((props, ref) => {
  const [items, setItems] = useState<MenuItem[]>([])
  const { mode, theme } = props
  const navigate = useNavigate()
  const [openKeys, setOpenKeys] = useState(['/admin'])
  const [tempOpenKeys, setTempOpenKeys] = useState<string[]>([])

  const location = useLocation()
  const { menuList } = useAppSelector((state) => {
    return {
      menuList: state.admin.menuList
    }
  }, useAppShallowEqual)

  const [current, setCurrent] = useState(() => {
    const path = location.pathname
    if (path == '/admin') {
      return menuList[0]?.children[0]?.path
    }
    return location.pathname
  })

  useEffect(() => {
    setItems(
      menuList.map((item) => {
        return getItem(item.name, item.path, <Icon icon={item.icon} />, [
          ...(item.children || []).map((iten) => getItem(iten.name, iten.path, <Icon icon={iten.icon} />))
        ])
      })
    )
  }, [menuList])

  const handleMenuItemClick = useMemoizedFn(({ key }: { key: string }) => {
    setCurrent(key)
    setTempOpenKeys([key.split('/').slice(0, -1).join('/')])
    setTimeout(() => {
      navigate(key, { replace: true })
    }, 300)
  })

  useEffect(() => {
    const path = location.pathname
    if (path == '/admin') {
      setCurrent(menuList[0]?.children[0]?.path)
      const key = menuList[0]?.children[0]?.path?.split('/').slice(0, -1).join('/')
      setOpenKeys([key])
      setTempOpenKeys([key])
      navigate(menuList[0]?.children[0]?.path, { replace: true })
    } else {
      const key = path.split('/').slice(0, -1).join('/')
      setCurrent(path)
      setOpenKeys([key])
      setTempOpenKeys([key])
      navigate(path, { replace: true })
    }
  }, [menuList])

  const handleOpenChange = useMemoizedFn((key: string[]) => {
    setOpenKeys(key)
    if (key.length > 0) {
      setTempOpenKeys(key.filter((item) => current.includes(item)))
    }
  })

  useImperativeHandle(
    ref,
    () => {
      return {
        setKey(key) {
          setCurrent(key)
        }
      }
    },
    []
  )

  useEffect(() => {
    if (!props.collapsed && tempOpenKeys.length > 0) {
      setOpenKeys(tempOpenKeys)
    }
  }, [props.collapsed])

  return (
    <AppMenuWrapper>
      <Menu
        mode={mode}
        theme={theme}
        items={items}
        className="h-[calc(100vh-64px)]"
        onClick={handleMenuItemClick}
        openKeys={openKeys}
        // defaultOpenKeys={[openKeys]}
        selectedKeys={[current]}
        onOpenChange={handleOpenChange}
      />
    </AppMenuWrapper>
  )
})

export default memo(AppMenu)
