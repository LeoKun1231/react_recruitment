/*
 * @Author: hqk
 * @Date: 2023-02-03 14:24:14
 * @LastEditors: hqk
 * @LastEditTime: 2023-02-03 16:37:57
 * @Description:
 */
import React, { Suspense } from 'react'
import { NavLink, useRoutes } from 'react-router-dom'
import routes from './router'

function App() {
  return (
    <div className="app">
      <NavLink to="/home">首页</NavLink>
      <NavLink to="/about">关于</NavLink>
      <Suspense fallback="">
        <div className="nav">{useRoutes(routes)}</div>
      </Suspense>
    </div>
  )
}

export default App
