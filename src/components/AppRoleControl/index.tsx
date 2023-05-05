/*
 * @Author: hqk
 * @Date: 2023-04-15 23:24:08
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-15 23:24:17
 * @Description:
 */
import { ROLECODE } from '@/constant'
import { useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  code: ROLECODE[]
}

const AppRoleControl: FC<IProps> = (props) => {
  const { children, code } = props

  const { roleId } = useAppSelector((state) => {
    return {
      roleId: state.login.loginUser.roleId
    }
  }, useAppShallowEqual)
  let isShow = false

  for (const id of code) {
    if (roleId == id) {
      isShow = true
      break
    }
  }

  return <>{isShow ? children : null}</>
}

export default memo(AppRoleControl)
