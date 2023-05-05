/*
 * @Author: hqk
 * @Date: 2023-03-24 13:50:20
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-10 12:48:34
 * @Description:
 */
import { IBaseResult } from '../base'

export interface IMenusData extends IBaseResult {
  data: IMenus[]
}

export interface IMenus {
  id: number
  parentId: number
  name: string
  permission: string
  path: string
  icon: string
  children: IMenus[]
}

export interface IAdminTeacherData extends IBaseResult {
  data: IAdminTeacher
}

export interface IAdminTeacher {
  records: IAdminTeacherDetail[]
  totalCount: number
}

export interface IAdminTeacherDetail {
  id: number
  account: string
  telephone: string
  email: string
  userName: string
  roleName: string
  roleId: number
  nickName: string
  avatar: string
  majorIds: number[]
  majorNames: string[]
  createTime: string
  updateTime: string
}

export interface IStudentDetail {
  id: number
  account: string
  telephone: string
  email: string
  userName: string
  roleName: string
  roleId: number
  nickName: string
  avatar: string
  majorId: number
  majorName: string
  createTime: string
  updateTime: string
}

export interface IUpdateCompany {
  shortName?: string
  fullName?: string
  linkman?: string
  telephone?: string
  city?: string[]
  size?: string
  category?: string
  level?: string
  companyType?: string
  govUrl?: string
  weal?: number[]
  desc?: string
  address?: number[]
}

export interface ICompanyDetailData {
  data: {
    data: ICompanyDetail
  }
}

export interface ICompanyDetail {
  id: string
  userId: number
  shortName: string
  fullName: string
  linkman: string
  telephone: string
  city: string[]
  size: string
  category: string
  level: string
  companyType: string
  govUrl: string
  weal: string[]
  desc: string
  avatar: string
  address: string[]
  addressName: string
  companyUrl: string[]
  certifyUrl: string[]
}
