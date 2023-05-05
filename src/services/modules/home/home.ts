import appRequest from '@/services'
import { IBasePage } from '@/types/base'
import {
  IHomeCompanyDetailData,
  IDetailJobListData,
  IHomeCompanyListData,
  IHomeJobListData,
  IJobRelationListData,
  IJobRelationQuery,
  IHomeJobDetailData
} from '@/types/home/home'

export function getHotCompanyList(data: IBasePage) {
  return appRequest.post<IHomeCompanyListData>({
    url: '/home/company/hot',
    data
  })
}

export function getHotJobList(data: IBasePage) {
  return appRequest.post<IHomeJobListData>({
    url: '/home/job/hot',
    data
  })
}

export function getCompanyCategoryList() {
  return appRequest.get({
    url: '/home/company/category'
  })
}

export function getJobTypeList() {
  return appRequest.get({
    url: '/home/job/type'
  })
}
export function getHomeCompanyList(data: IBasePage & { category: string }) {
  return appRequest.post<IHomeCompanyListData>({
    url: '/home/company/list',
    data
  })
}

export function getHomeJobList(data: IBasePage & { type: string }) {
  return appRequest.post<IHomeJobListData>({
    url: '/home/job/list',
    data
  })
}

export function getJobListWithDetailType(data: IBasePage & { type: string }) {
  return appRequest.post<IDetailJobListData>({
    url: '/home/job/list/type',
    data
  })
}

export function getJobRelationList(data: IJobRelationQuery) {
  return appRequest.post<IJobRelationListData>({
    url: '/home/job/relation',
    data
  })
}

export function getHomeCompanyDetail(id: number) {
  return appRequest.get<IHomeCompanyDetailData>({
    url: `/home/company/detail/${id}`
  })
}

export function getCompanyDetailType(id: number) {
  return appRequest.get({
    url: `/home/company/deatil/type/${id}`
  })
}

export function getCompanyDetailJobList(data: IBasePage & { type: string; companyId: string }) {
  return appRequest.post<IDetailJobListData>({
    url: '/home/company/detail/job/list',
    data
  })
}

export function addCompanyAndJobWatchCount(id: string, type: number) {
  return appRequest.get({
    url: `/home/watch/${id}/${type}`
  })
}

export function getHomeJobDetail(id: number) {
  return appRequest.get<IHomeJobDetailData>({
    url: `/home/job/detail/${id}`
  })
}

export function uploadResume(data: any) {
  return appRequest.post({
    url: '/home/upload/resume',
    isHidnLoading: true,
    data
  })
}

export function addResumeToJob(id: number, userId: number) {
  return appRequest.get({
    url: `/home/resume/${id}/${userId}`
  })
}
export function getHomeBannerList() {
  return appRequest.get({
    url: `/company/banner/home/list`
  })
}

export function registerChatUser(data: { toId: number }) {
  return appRequest.post({
    url: '/home/registerToIM',
    data
  })
}
export function saveChatRecord(userId: number, jobId: string) {
  return appRequest.post({
    url: '/home/saveChatRecord',
    data: {
      userId,
      jobId
    }
  })
}
export function checkIsChat(userId: number, jobId: string) {
  return appRequest.post({
    url: '/home/checkIsChat',
    data: {
      userId,
      jobId
    }
  })
}

export function getResumeURL() {
  return appRequest.get({
    url: '/home/resume/url'
  })
}
