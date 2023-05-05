import React, { lazy } from 'react'
const System = lazy(() => import('@/views/Admin/System/index'))

export default {
  path: '/admin/system',
  element: <System />
}
