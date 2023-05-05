/*
 * @Author: hqk
 * @Date: 2023-02-26 11:15:47
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-15 22:58:51
 * @Description:
 */
import { IBaseResult } from '../base'

export interface ILoginAccount {
  account: string
  password: string
}

export interface ILoginPhone {
  telephone: string
  code: string
}

export interface ILoginResetPassword {
  telephone: string
  code: string
  password: string
}

export interface ILoginUser {
  id: number
  token: string
  roleId: number
  companyId: string
  majorId: number
  userName: string
  nickName: string
  email: string
  telephone: string
  avatar: string
  majorName: string
}

export interface ILoginResult extends IBaseResult {
  data: ILoginUser
}
