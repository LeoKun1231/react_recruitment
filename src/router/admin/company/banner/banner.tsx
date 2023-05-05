import React, { lazy } from 'react'
const Banner = lazy(() => import('@/views/Admin/Company/Banner/index'))

export default {
  path: '/admin/company/banner',
  element: <Banner />
}
