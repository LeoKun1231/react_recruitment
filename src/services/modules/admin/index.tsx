/*
 * @Author: hqk
 * @Date: 2023-03-24 13:50:08
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-11 14:47:15
 * @Description:
 */
import appRequest from '@/services'
import { ICompanyDetailData, IMenusData, IUpdateCompany } from '@/types/admin'
import { IReport, IReportArticleData, IReportCommentData } from '@/types/home/community'

export function getMenusByRoleId(id: number) {
  return appRequest.get<IMenusData>({
    url: `/acl/menus/${id}`
  })
}

export function getDataList(name: string, data: any, isFullPage?: boolean) {
  return appRequest.post({
    url: isFullPage ? `${name}/list` : `/acl/${name}/list`,
    data
  })
}

export function addData(name: string, data: any, isFullPage?: boolean) {
  return appRequest.post({
    url: isFullPage ? `${name}/add` : `/acl/${name}/add`,
    data,
    isHidnLoading: true
  })
}

export function batchDeleteData(ids: number[], page?: string, isFullPage?: boolean) {
  return appRequest.delete({
    url: isFullPage ? `${page}/batchDelete` : `/acl/${page}/batchDelete`,
    data: ids,
    isHidnLoading: true
  })
}

export function deleteDataById(id: number, page?: string, isFullPage?: boolean) {
  return appRequest.delete({
    url: isFullPage ? `${page}/delete/${id}` : `/acl/${page}/delete/${id}`
  })
}

export function updateDataById(name: string, data: any, isFullPage?: boolean) {
  return appRequest.put({
    url: isFullPage ? `${name}/update` : `/acl/${name}/update`,
    data,
    isHidnLoading: true
  })
}

export function batchAddUser(file: any, majorId: number) {
  return appRequest.post({
    url: `/acl/student/batchAdd/${majorId}`,
    data: file,
    isHidnLoading: true
  })
}

export function updateTopicById(data: { id: number; content: string }) {
  return appRequest.put({
    url: '/common/topic/update',
    data
  })
}

export function addTopic(data: { content: string }) {
  return appRequest.post({
    url: '/common/topic/add',
    data
  })
}
export function deleteTopicById(id: number) {
  return appRequest.delete({
    url: `/common/topic/delete/${id}`,
    isHidnLoading: true
  })
}

export function getReportList(page: string, data: { type: number; pageSize: number; currentPage: number }) {
  return appRequest.post<IReportArticleData>({
    url: `/common/report/${page}/list`,
    data
  })
}

export function getReportCommentList(data: { type: number; pageSize: number; currentPage: number }) {
  return appRequest.post<IReportCommentData>({
    url: `/common/report/comment/list`,
    data
  })
}

export function deleteReport(page: string, data: number[]) {
  return appRequest.delete({
    url: `/common/report/${page}/delete`,
    data,
    isHidnLoading: true
  })
}

export function recoverReport(page: string, data: number[]) {
  return appRequest.delete({
    url: `/common/report/${page}/recover`,
    data,
    isHidnLoading: true
  })
}

export function reportById(page: string, data: IReport) {
  return appRequest.post({
    url: `/common/report/${page}/add`,
    data,
    isHidnLoading: true
  })
}

export function removeImages(page: 'companyImages' | 'certifyImages' | 'avatar', url: string) {
  return appRequest.delete({
    url: `/company/remove/${page}`,
    data: {
      url
    },
    isHidnLoading: true
  })
}

export function removeAll() {
  return appRequest.get({
    url: `/company/removeAll`,
    isHidnLoading: true
  })
}

export function updateCompany(data: IUpdateCompany) {
  return appRequest.post({
    url: `/company/saveDetail`,
    data
  })
}

export function getCompanyDetail(id: number) {
  return appRequest.get<ICompanyDetailData>({
    url: `/company/${id}`
  })
}

export function changeCompanyActive(id: number) {
  return appRequest.put({
    url: `/acl/boss/changeActive/${id}`,
    isHidnLoading: true
  })
}

export function getCompanyStatus(id: number) {
  return appRequest.get({
    url: `/acl/boss/status/${id}`,
    isHidnLoading: true
  })
}

export function checkCompany(data: { id: number; reason?: string; isSuccess: boolean }) {
  return appRequest.post({
    url: `/acl/boss/check`,
    data,
    isHidnLoading: true
  })
}

export function addJob(data: any) {
  return appRequest.post({
    url: '/company/job/add',
    data,
    isHidnLoading: true
  })
}

export function getJobDetail(id: string) {
  return appRequest.get({
    url: `/company/job/${id}`,
    isHidnLoading: true
  })
}

export function changeJobStatus(id: string) {
  return appRequest.get({
    url: `/company/job/status/${id}`,
    isHidnLoading: true
  })
}

export function removeBannerImage() {
  return appRequest.get({
    url: '/company/banner/remove'
  })
}

export function getBannerDetail() {
  return appRequest.get({
    url: '/company/banner/detail'
  })
}

export function saveBanner(data: any) {
  return appRequest.post({
    url: '/company/banner/admin/add',
    data
  })
}
export function changeBannerStatus(id: number) {
  return appRequest.get({
    url: `/company/banner/changeStatus/${id}`
  })
}
