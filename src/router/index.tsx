import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import type { RouteObject } from 'react-router-dom'

const Home = lazy(() => import('@/views/Home/index'))
const HomeMessage = lazy(() => import('@/views/Home/c-cpns/HomeMessage/index'))
const HomeCount = lazy(() => import('@/views/Home/c-cpns/HomeCount/index'))
const About = lazy(() => import('@/views/About/index'))

const NotFound = lazy(() => import('@/views/NotFound/index'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: '/home',
        element: <Navigate to="/home/message" />
      },
      {
        path: '/home/message',
        element: <HomeMessage />
      },
      {
        path: '/home/count',
        element: <HomeCount />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '/about',
    element: <About />
  }
]

export default routes
