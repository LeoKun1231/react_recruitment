import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const Company: FC<IProps> = () => {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  )
}

export default memo(Company)
