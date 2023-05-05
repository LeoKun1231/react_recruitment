import React, { lazy } from 'react'
const Article = lazy(() => import('@/views/Admin/Community/Article/index'))

export default {
  path: '/admin/community/article',
  element: <Article />
}
