import React, { lazy } from 'react'
const HR = lazy(() => import('@/views/Admin/Company/HR/index'))

export default {
  path: '/admin/company/hr',
  element: <HR />
}
