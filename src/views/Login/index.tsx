/*
 * @Author: hqk
 * @Date: 2023-02-24 10:39:49
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-29 20:42:46
 * @Description:
 */
import React, { memo, useContext, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import LoginBg from '@/assets/img/login-bg.png'
import LoginPanel from './c-cpns/login-panel/login-panel'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { clearAllAction, saveLoginUserAction } from '@/store'
import { TimContext } from '@/Context'

interface IProps {
  children?: ReactNode
}

const Login: FC<IProps> = () => {
  const tim = useContext(TimContext)

  const { showForget } = useAppSelector((state) => {
    return {
      showForget: state.login.showForget
    }
  }, useAppShallowEqual)

  const dispatch = useAppDispatch()

  useEffect(() => {
    localStorage.clear()
    sessionStorage.clear()
    dispatch(clearAllAction())
    sessionStorage.removeItem('persist:root')
    tim?.logout()
  }, [])

  return (
    <div className="bg-[var(--bg-color)] h-100vh center ">
      <div className="w-[1000px] h-[580px]  bg-white rounded-lg overflow-hidden shadow-2xl flex animate-fade-in animate-duration-700 ">
        <div className="w-[480px] bg-[var(--primary-color)] h-full text-neutral-100  ">
          <div className="pt-[44px] pl-[44px]">
            <div className="text-2xl">欢迎来到校园招聘网</div>
            <div className="text-sm pt-[9px] pb-[22px]">{showForget ? '请进行密码重置' : '请选择一种方式进行登录'}</div>
            <div className="w-[400px] h-[400px] ">
              <img src={LoginBg} alt="校园招聘网" />
            </div>
          </div>
        </div>
        <div className="flex-1 center">
          <LoginPanel />
        </div>
      </div>
    </div>
  )
}

export default memo(Login)
