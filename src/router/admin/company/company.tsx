import React, { lazy } from 'react'
const Company = lazy(() => import('@/views/Admin/Company/index'))

export default {
  path: '/admin/company',
  element: <Company />
}
