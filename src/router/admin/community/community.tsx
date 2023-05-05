import React, { lazy } from 'react'
const Community = lazy(() => import('@/views/Admin/Community/index'))

export default {
  path: '/admin/community',
  element: <Community />
}
