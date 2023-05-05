/*
 * @Author: hqk
 * @Date: 2023-03-31 21:15:48
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-31 21:21:24
 * @Description:
 */
import React, { lazy } from 'react'
const Topic = lazy(() => import('@/views/Admin/Community/Topic/index'))

export default {
  path: '/admin/community/topic',
  element: <Topic />
}
