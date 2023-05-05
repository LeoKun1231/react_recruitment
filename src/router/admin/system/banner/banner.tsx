import React, { lazy } from 'react'
const Banner = lazy(() => import('@/views/Admin/System/Banner/index'))

export default {
  path: '/admin/system/banner',
  element: <Banner />
}
