/*
 * @Author: hqk
 * @Date: 2023-03-04 14:36:30
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-17 16:02:03
 * @Description:
 */
import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderWrapper } from './style'
import Logo from '@/assets/img/logo.png'
import { Tabs, Button, Avatar, Dropdown, MenuProps } from 'antd'
import type { TabsProps } from 'antd'
import { useHref, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { useCreation, useMemoizedFn } from 'ahooks'
import { RightOutlined, UserOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { getMenuListByRoleIdAction } from '@/store/features/admin'
import AppRoleControl from '../AppRoleControl'
import { ROLECODE } from '@/constant'
import { clearAllAction } from '@/store'

interface IProps {
  children?: ReactNode
}
const items: TabsProps['items'] = [
  {
    key: '/main/home',
    label: '首页'
  },
  {
    key: '/main/community',
    label: '社区'
  },
  {
    key: '/main/mine',
    label: '简历制作'
  },
  {
    key: '/main/info',
    label: '我的'
  }
]

const AppHeader: FC<IProps> = () => {
  const navigate = useNavigate()
  const [active, setActive] = useState('/main/home')

  const onChange = useMemoizedFn((key: string) => {
    navigate(key)
  })
  const location = useLocation()

  useEffect(() => {
    items.forEach((item) => {
      if (location.pathname.includes(item.key)) {
        setActive(item.key)
      }
    })
  }, [location])

  const { id, roleId, avatar } = useAppSelector((state) => {
    return {
      id: state.login.loginUser.id,
      roleId: state.login.loginUser.roleId,
      avatar: state.login.loginUser.avatar
    }
  }, useAppShallowEqual)

  const dispatch = useAppDispatch()
  const handleGoToAdmin = useMemoizedFn(async () => {
    await dispatch(getMenuListByRoleIdAction(roleId))
    navigate('/admin')
  })

  const handleLogout = useMemoizedFn(() => {
    dispatch(clearAllAction())
    navigate('/login', { replace: true })
  })

  const handleGoProfile = useMemoizedFn(() => {
    navigate('/main/info')
  })

  const dropMenus: MenuProps['items'] = useCreation(() => {
    return [
      {
        key: '1',
        label: <div onClick={handleGoProfile}>个人资料</div>
      },
      {
        key: '2',
        label: <div onClick={handleLogout}>退出登录</div>
      }
    ]
  }, [])
  return (
    <HeaderWrapper>
      <div className="w-[1200px] h-full m-auto flex items-center">
        <h1 className="logo p-0 m-0 center cursor-pointer w-[200px]" title="校园招聘网">
          <img src={Logo} className="w-[42px] h-[42px] " />
          <span className="text-[20px] ml-[4px] font-600 border-t-4px border-[var(--primary-color)] border-t-solid text-[var(--primary-color)]">
            校园招聘网
          </span>
        </h1>
        <div className="navbar center h-full">
          <Tabs activeKey={active} items={items} onChange={onChange} />
        </div>

        <Dropdown menu={{ items: dropMenus }} placement="bottom" arrow>
          <div className="mr-20px hover:cursor-pointer">
            {avatar ? <Avatar size={40} src={avatar} /> : <Avatar size={40} icon={<UserOutlined />} />}
          </div>
        </Dropdown>

        <AppRoleControl code={[ROLECODE.ADMIN, ROLECODE.BOSS, ROLECODE.HR, ROLECODE.TEACHER]}>
          <Button type="primary" ghost onClick={handleGoToAdmin}>
            前往管理界面
            <RightOutlined />
          </Button>
        </AppRoleControl>
      </div>
    </HeaderWrapper>
  )
}

export default memo(AppHeader)
