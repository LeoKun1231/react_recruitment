/*
 * @Author: hqk
 * @Date: 2023-04-15 23:24:08
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-16 16:49:23
 * @Description:
 */
import { ROLECODE } from '@/constant'
import { useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  userId: number
  owner?: boolean
}
//userId 有值且owner为真时，则除了userId这个用户不显示
//如果只有userId 则只有userId和admin才显示

const AppRoleUserControl: FC<IProps> = (props) => {
  const { children, userId, owner } = props

  const { roleId, id } = useAppSelector((state) => {
    return {
      roleId: state.login.loginUser.roleId,
      id: state.login.loginUser.id
    }
  }, useAppShallowEqual)
  let isShow = false

  if (roleId == ROLECODE.ADMIN || id == userId) {
    isShow = true
  }

  if (userId == id && owner) {
    isShow = false
  }

  return <>{isShow ? children : null}</>
}

export default memo(AppRoleUserControl)
