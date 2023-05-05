/*
 * @Author: hqk
 * @Date: 2023-02-26 16:44:50
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-24 13:50:00
 * @Description:
 */
import appRequest from '@/services'
import { IMajorNoTreeData, IMajorTreeData, IUpload } from '@/types/common'

/**
 * @description: 验证码登录
 * @param {number} telephone
 * @return {*}
 */
export function sendCode(telephone: number) {
  return appRequest.get({
    url: `/sms/${telephone}`
  })
}

export function checkCodeIsExit(telephone: number) {
  return appRequest.get({
    url: `/user/login/checkPhone/${telephone}`
  })
}

export function getMajorNoTreeList() {
  return appRequest.get<IMajorNoTreeData>({
    url: '/acl/major/noTreeList'
  })
}

export function upload(data: any) {
  return appRequest.post<IUpload>({
    url: '/oss/upload',
    data
  })
}

export function getMajorTreeList(id: number) {
  return appRequest.get<IMajorTreeData>({
    url: `/acl/major/list/${id}`,
    isHidnLoading: true
  })
}

export function getAllMajorTreeList() {
  return appRequest.get<IMajorTreeData>({
    url: '/acl/major/list'
  })
}

export function addMajor(data: { parentId: number; majorName: string }) {
  return appRequest.post({
    url: '/acl/major/add',
    data,
    isHidnLoading: true
  })
}

export function deleteMajors(data: number[]) {
  return appRequest.delete({
    url: '/acl/major/batchDelete',
    data,
    isHidnLoading: true
  })
}

export function updateMajorById(data: { id: number; majorName: string }) {
  return appRequest.put({
    url: '/acl/major/update',
    data
  })
}
