import React, { lazy } from 'react'
const Job = lazy(() => import('@/views/Admin/Company/Job/index'))

export default {
  path: '/admin/company/job',
  element: <Job />
}
