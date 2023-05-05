import React, { lazy } from 'react'
const Major = lazy(() => import('@/views/Admin/System/Major/index'))

export default {
  path: '/admin/system/major',
  element: <Major />
}
