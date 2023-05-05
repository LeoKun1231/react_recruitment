/*
 * @Author: hqk
 * @Date: 2023-02-16 11:20:26
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-27 16:45:00
 * @Description:
 */
import React, { lazy } from 'react'
import { Navigate, NonIndexRouteObject } from 'react-router-dom'

import type { RouteObject } from 'react-router-dom'

const Login = lazy(() => import('@/views/Login/index'))

const Main = lazy(() => import('@/views/Main/index'))
const Community = lazy(() => import('@/views/Main/Community/index'))
const WriteArticle = lazy(() => import('@/views/Main/Community/c-cpns/WriteArticle'))
const TopicDetail = lazy(() => import('@/views/Main/Community/c-cpns/TopicDetail'))
const ArticleDetail = lazy(() => import('@/views/Main/Community/c-cpns/ArticleDetail'))

const Home = lazy(() => import('@/views/Main/Home/index'))
const Info = lazy(() => import('@/views/Main/Info/index'))
const Mine = lazy(() => import('@/views/Main/Mine/index'))

const NotFound = lazy(() => import('@/views/NotFound/index'))

const JobList = lazy(() => import('@/views/Main/Home/c-cpns/JobList/index'))
const CompanyDetail = lazy(() => import('@/views/Main/Home/c-cpns/CompanyDetail/index'))
const JobDetail = lazy(() => import('@/views/Main/Home/c-cpns/JobDetail/index'))

// type MyRouteObject = Omit<RouteObject, 'children'> | { children: MyRouteObject[] } | { meta: string }

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: '/main/home',
        element: <Home />
      },
      {
        path: '/main/home/jobList',
        element: <JobList />
      },
      {
        path: '/main/home/company/detail',
        element: <CompanyDetail />
      },
      {
        path: '/main/home/job/detail',
        element: <JobDetail />
      },
      {
        path: '/main/community',
        element: <Community />,
        children: [
          {
            path: '/main/community/writeArticle',
            element: <WriteArticle />
          },
          {
            path: '/main/community/topicDetail/:id',
            element: <TopicDetail />
          },
          {
            path: '/main/community/articleDeatil/:id',
            element: <ArticleDetail />
          }
        ]
      },
      {
        path: '/main/mine',
        element: <Mine />
      },
      {
        path: '/main/info',
        element: <Info />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },

  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export default routes
