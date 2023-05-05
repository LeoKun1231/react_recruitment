/*
 * @Author: hqk
 * @Date: 2023-03-23 14:49:01
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-07 15:35:44
 * @Description:
 */
import React, { ElementRef, memo, Suspense, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { AdminWrapper } from './style'
import { MenuFoldOutlined, MenuUnfoldOutlined, FormOutlined, LoginOutlined } from '@ant-design/icons'
import { Layout, Breadcrumb, theme, Switch, Popover, Spin, Button } from 'antd'
import type { MenuTheme } from 'antd/es/menu'
import classNames from 'classnames'
import { useCreation, useMemoizedFn } from 'ahooks'
import AppMenu from '@/components/AppMenu'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import Logo from '@/assets/img/logo.png'
import { mapPath2Breadcrumb } from '@/utils/map-utils'

const { Header, Sider, Content } = Layout
interface IProps {
  children?: ReactNode
}

interface IBreadcrumb {
  title: ReactNode
  onClick?: () => void
}

const Admin: FC<IProps> = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mode, setMode] = useState<'vertical' | 'inline'>('inline')
  const [selftheme, setSelftheme] = useState<MenuTheme>('dark')
  const [breadcrumb, setBreadcrumb] = useState<IBreadcrumb[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const appMenuRef = useRef<ElementRef<typeof AppMenu>>(null)

  const { menuList } = useAppSelector((state) => {
    return {
      menuList: state.admin.menuList
    }
  }, useAppShallowEqual)

  const {
    token: { colorBgContainer }
  } = theme.useToken()

  //改变排列模式
  const changeMode = useMemoizedFn((value: boolean) => {
    setMode(value ? 'vertical' : 'inline')
  })
  const changeTheme = useMemoizedFn((value: boolean) => {
    setSelftheme(value ? 'dark' : 'light')
  })

  const handleFold = useMemoizedFn(() => {
    setCollapsed(!collapsed)
  })

  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    setBreadcrumb(
      mapPath2Breadcrumb(location.pathname, menuList).map((item) => {
        if (item.href) {
          return {
            title: <div className="hoverSlow">{item.title}</div>,
            onClick: () => {
              appMenuRef.current?.setKey(item.href)
              navigate(item.href)
            }
          }
        } else {
          return {
            title: item.title
          }
        }
      })
    )
  }, [location.pathname])

  const defaultModeChecked = useCreation(() => {
    return mode != 'inline' ? true : false
  }, [mode])
  const defaultThemeChecked = useCreation(() => {
    return selftheme == 'dark' ? true : false
  }, [selftheme])

  //退出后台
  const handleLoginOutBackend = useMemoizedFn(() => {
    navigate('/main/home', { replace: true })
  })

  return (
    <AdminWrapper>
      <Layout className="h-[100vh]">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className={classNames({ '!bg-white': selftheme == 'light', 'shadow-lg': true })}>
          <h1 className="logo p-0 m-0 center cursor-pointer h-[64px]" title="校园招聘网">
            <img src={Logo} className="w-[42px] h-[42px] " />
            {!collapsed && (
              <span
                className={classNames({
                  'text-[20px] ml-[6px] font-600 border-t-4px border-[var(--primary-color)] border-t-solid text-[var(--primary-color)]':
                    true,
                  'animate-fade-in': !collapsed,
                  'animate-fade-out': collapsed
                })}>
                校园招聘网
              </span>
            )}
          </h1>
          <AppMenu mode={mode} theme={selftheme} ref={appMenuRef} />
        </Sider>
        <Layout className="flex h-[100vh]">
          <Header style={{ background: colorBgContainer }} className="between py-0 px-[10px] h-[48px] leading-[48px] mx-[16px] shadow-lg">
            <div className="flex">
              <div className="trigger !pr-[16px]" onClick={handleFold}>
                {!collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              </div>
              <Popover
                placement="rightBottom"
                content={
                  <div className="py-[4px] px-[10px]">
                    <div className="center py-[8px]">
                      <Switch onChange={changeMode} defaultChecked={defaultModeChecked} />
                      <div className="pl-[10px]">修改排列模式</div>
                    </div>
                    <div className="center py-[8px]">
                      <Switch onChange={changeTheme} defaultChecked={defaultThemeChecked} />
                      <div className="pl-[10px]">修改背景颜色</div>
                    </div>
                  </div>
                }
                trigger="click">
                <div className="trigger !pl-0">
                  <FormOutlined />
                </div>
              </Popover>
            </div>
            <div className="flex">
              <Button type="primary" icon={<LoginOutlined />} onClick={handleLoginOutBackend}>
                退出后台
              </Button>
            </div>
          </Header>
          <Content className="shadow-lg">
            <Breadcrumb style={{ margin: '4px 16px', height: '22px' }} items={breadcrumb}></Breadcrumb>
            <div style={{ margin: '4px 16px 4px' }}>
              <Suspense fallback="">
                <Outlet />
              </Suspense>
            </div>
          </Content>
        </Layout>
      </Layout>
    </AdminWrapper>
  )
}

export default memo(Admin)
