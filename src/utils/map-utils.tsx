/*
 * @Author: hqk
 * @Date: 2023-03-24 13:16:02
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-11 15:27:50
 * @Description:
 */
import { Navigate, RouteObject } from 'react-router-dom'
import React from 'react'
/**
 * @description:获取某路径下的所有route对象
 */
export function getLocalRoutes() {
  const localRoutes: RouteObject[] = []
  const files: Record<string, any> = import.meta.glob('../router/admin/**/*.tsx', { eager: true })
  for (const file in files) {
    const module = files[file]
    localRoutes.push(module.default)
  }
  return localRoutes
}

/**
 * @description:将菜单数组转换成路由对象
 * @param {any} menuInfo
 * @return {*}
 */
export default function mapMenu2Routes(menuInfo: any[]) {
  // 1.获取router文件夹里的route对象
  const localRoutes = getLocalRoutes()

  // 2.根据用户菜单url匹配本地route对象 注册路由
  const mainRoutes: RouteObject[] = []

  let firstLevelRoute: any = null
  function recursionMenuInfo(menuInfo: any[], localRoutes: RouteObject[]) {
    for (const menuInfoItem of menuInfo || []) {
      // 1.获取当前匹配的路由
      const route = localRoutes.find((localRoutesItem) => localRoutesItem.path == menuInfoItem.path)
      // 2.记录当前的一级路由
      if (menuInfoItem.parentId == 1) {
        firstLevelRoute = menuInfoItem.path
      }
      // 3.找到匹配的路由
      if (route) {
        mainRoutes.push(route)

        if (!mainRoutes.find((item) => item.path === firstLevelRoute)) {
          //将一级路由添加到mainRoutes中，并重定向到默认的第一个子路由
          mainRoutes.push({ path: firstLevelRoute, element: <Navigate to={route.path + ''} />, children: [] })
        }
      }

      if (menuInfoItem?.children?.length > 0) {
        recursionMenuInfo(menuInfoItem?.children, localRoutes)
      }
    }
  }
  recursionMenuInfo(menuInfo, localRoutes)

  const firstRoutes: any[] = []
  const secondRoutes: any[] = []
  mainRoutes.forEach((item) => {
    if (item!.path!.split('/').length == 3) {
      firstRoutes.push({ ...item, children: [] })
    } else {
      secondRoutes.push(item)
    }
  })

  firstRoutes.forEach((item) => {
    const tempArr = secondRoutes.filter((iten) => iten.path.includes(item.path))
    item.children = tempArr
  })
  return firstRoutes
}

/**
 * @description: 获取当前路径的菜单以及父菜单
 * @param {string} path
 * @param {any} menus
 * @return {*}
 */
export function mapPath2Breadcrumb(path: string, menus: any[]) {
  const breadcrumb: any[] = []
  for (const menu of menus) {
    for (const subMenu of menu.children) {
      if (subMenu.path == path) {
        breadcrumb.push({
          title: menu.name,
          href: menu.children[0].path
        })
        breadcrumb.push({
          title: subMenu.name
        })
      }
    }
  }
  return breadcrumb
}
