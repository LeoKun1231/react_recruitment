import appRequest from '@/services'
import { IBasePage } from '@/types/base'
import { IDetailJobListData } from '@/types/home/home'

export function resetPassowrdByPassword(data: any) {
  return appRequest.post({
    url: '/user/login/resetPassword/password',
    data
  })
}

export function resetPassowrdByTelephone(data: any) {
  return appRequest.post({
    url: '/user/login/resetPassword/telephone',
    data
  })
}

export function updateUserInfo(data: any) {
  return appRequest.put({
    url: '/acl/user/edit',
    data
  })
}

export function getChattingJob(data: IBasePage) {
  return appRequest.post<IDetailJobListData>({
    url: '/home/chatedJobList',
    data
  })
}

export function getMineArtilceById(data: IBasePage) {
  return appRequest.post({
    url: '/common/article/getArtilceById',
    data
  })
}
