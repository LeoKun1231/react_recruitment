/*
 * @Author: hqk
 * @Date: 2023-02-03 20:24:33
 * @LastEditors: hqk
 * @LastEditTime: 2023-02-03 20:24:46
 * @Description:
 */
import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = () => {
  return (
    <div>
      <NavLink to="/home/message">去信息</NavLink>
      <NavLink to="/home/count">去计数</NavLink>
      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </div>
  )
}

export default memo(Home)
