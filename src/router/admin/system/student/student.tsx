import React, { lazy } from 'react'
const Student = lazy(() => import('@/views/Admin/System/Student/index'))

export default {
  path: '/admin/system/student',
  element: <Student />
}
