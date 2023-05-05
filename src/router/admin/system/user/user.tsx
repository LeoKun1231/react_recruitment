import React, { lazy } from 'react'
const User = lazy(() => import('@/views/Admin/System/User/index'))

export default {
  path: '/admin/system/user',
  element: <User />
}
