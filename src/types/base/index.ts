/*
 * @Author: hqk
 * @Date: 2023-02-26 11:18:11
 * @LastEditors: hqk
 * @LastEditTime: 2023-02-26 16:03:21
 * @Description:
 */
export interface IBaseResult {
  success: boolean
  code: number
  message?: string
  data?: any
}

export interface IBasePage {
  currentPage: number
  pageSize: number
}
