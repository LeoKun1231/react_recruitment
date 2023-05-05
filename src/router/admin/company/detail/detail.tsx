import React, { lazy } from 'react'
const Detail = lazy(() => import('@/views/Admin/Company/Detail/index'))

export default {
  path: '/admin/company/detail',
  element: <Detail />
}
