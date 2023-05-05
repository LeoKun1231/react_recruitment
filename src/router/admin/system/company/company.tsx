import React, { lazy } from 'react'
const Company = lazy(() => import('@/views/Admin/System/Company/index'))

export default {
  path: '/admin/system/company',
  element: <Company />
}
