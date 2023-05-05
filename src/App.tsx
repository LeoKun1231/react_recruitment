/*
 * @Author: hqk
 * @Date: 2023-02-03 14:24:14
 * @LastEditors: hqk
 * @LastEditTime: 2023-05-05 12:44:08
 * @Description:
 */
import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import { Await, useNavigate, useRoutes } from 'react-router-dom'
import { ConfigProvider, Spin } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'

import routes from './router'
import { ConfigProviderProps } from 'antd/es/config-provider'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from './hooks/useAppRedux'
import mapMenu2Routes from '@/utils/map-utils'
import { getMenuListByRoleIdAction } from './store/features/admin'
import { ROLECODE } from './constant'
const Admin = lazy(() => import('@/views/Admin/index'))

const config: ConfigProviderProps = {
  theme: {
    token: {
      colorPrimary: '#007aff'
    }
  },
  locale: zhCN
}
const loadingEl = (
  <div className="my-loading">
    <div></div>
    <div></div>
  </div>
)

Spin.setDefaultIndicator(loadingEl)

const App = memo(() => {
  const [combineRoutes, setCombineRoutes] = useState(() => {
    return routes
  })

  const { loading, menuList, roleId, token } = useAppSelector((state) => {
    return {
      loading: state.common.loading,
      menuList: state.admin.menuList,
      roleId: state.login.loginUser?.roleId,
      token: state.login.loginUser?.token
    }
  }, useAppShallowEqual)

  const navigate = useNavigate()

  useEffect(() => {
    if (!token || token == '') {
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (ROLECODE.ADMIN == roleId || ROLECODE.BOSS == roleId || ROLECODE.HR == roleId || ROLECODE.TEACHER == roleId) {
      setCombineRoutes((c) => [
        ...c,
        {
          path: '/admin',
          element: <Admin />,
          children: []
        }
      ])
      setCombineRoutes((c) => {
        c.forEach((item) => {
          if (item.path == '/admin' && menuList?.length > 0) {
            item.children = [...mapMenu2Routes(menuList)]
          }
        })
        return c
      })
    } else {
      setCombineRoutes((c) => {
        return c.filter((item) => item.path != '/admin')
      })
    }
  }, [menuList])

  return (
    <ConfigProvider {...config}>
      <Spin
        className="[&>:nth-child(1)]:w-[64px] [&>:nth-child(1)]:h-[64px]"
        spinning={loading}
        delay={500}
        style={{
          minHeight: '100vh',
          position: 'fixed',
          width: '100vw'
        }}>
        <div className="app">
          <Suspense> {useRoutes(combineRoutes)}</Suspense>
        </div>
      </Spin>
    </ConfigProvider>
  )
})

export default App
