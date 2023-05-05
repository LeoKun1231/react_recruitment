import React, { lazy } from 'react'
const Comment = lazy(() => import('@/views/Admin/Community/Comment/index'))

export default {
  path: '/admin/community/comment',
  element: <Comment />
}
