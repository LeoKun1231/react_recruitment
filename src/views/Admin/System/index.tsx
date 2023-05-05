/*
 * @Author: hqk
 * @Date: 2023-03-25 15:21:46
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-26 14:24:33
 * @Description:
 */
import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const System: FC<IProps> = () => {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  )
}

export default memo(System)
