/*
 * @Author: hqk
 * @Date: 2023-02-24 14:48:02
 * @LastEditors: hqk
 * @LastEditTime: 2023-02-24 15:02:57
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'

import LoginAccount from '../login-account/login-account'
import LoginPhone from '../login-phone/login-phone'
import { PannelWrapper } from './style'
import { useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import LoginForget from '../login-forget/login-forget'
import { useMemoizedFn } from 'ahooks'

interface IProps {
  children?: ReactNode
}

const onChange = (key: string) => {
  console.log(key)
}

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `帐号登录`,
    children: <LoginAccount />
  },
  {
    key: '2',
    label: `手机登录`,
    children: <LoginPhone />
  }
]

const LoginPanel: FC<IProps> = () => {
  const { showForget } = useAppSelector((state) => {
    return {
      showForget: state.login.showForget
    }
  }, useAppShallowEqual)

  const showWhatComponet = useMemoizedFn((value: boolean) => {
    return value ? <LoginForget /> : <Tabs defaultActiveKey="1" items={items} onChange={onChange} centered className="animate-fade-in" />
  })
  return <PannelWrapper>{showWhatComponet(showForget)}</PannelWrapper>
}

export default memo(LoginPanel)
