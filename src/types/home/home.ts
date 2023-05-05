import { IBaseResult } from '../base'

export interface IHomeCompanyListData extends IBaseResult {
  data: IHomeCompanyListWithCount
}

export interface IHomeCompanyListWithCount {
  records: IHomeCompanyList[]
  totalCount: number
}

export interface IHomeCompanyList {
  companyId: string
  avatar: string
  shortName: string
  size: string
  category: string
  level: string
  jobList: JobList[]
}

export interface JobList {
  jobId: string
  jobName: string
  startMoney: number
  endMoney: number
  moneyMonth: number
  city: string[]
  id: string
  jobRequire: string
}

export interface IHomeJobListData extends IBaseResult {
  data: IHomeJobListWithCount
}

export interface IHomeJobListWithCount {
  records: IHomeJobList[]
  totalCount: number
}

export interface IHomeJobList {
  jobId: string
  companyId: string
  jobName: string
  startMoney: number
  endMoney: number
  moneyMonth: number
  city: string[]
  jobRequire: string
  tag: string[]
  avatar: string
  level: string
  companyName: string
  category: string
  size: string
}

export interface IDetailJobListData extends IBaseResult {
  data: IDetailJobListWithCount
}

export interface IDetailJobListWithCount {
  records: IDetailJobList[]
  totalCount: number
}

export interface IDetailJobList extends IHomeJobList {
  weal: string[]
}
export interface IJobRelationListData extends IBaseResult {
  data: IJobRelationList[]
}

export interface IJobRelationList {
  companyId: string
  jobId: string
  companyName: string
  jobName: string
  avatar: string
  startMoney: number
  endMoney: number
  moneyMonth: number
  city: string[]
}

export interface IJobRelationQuery {
  firstLabel: string
  secondLabel: string
  thirdLabel: string
  isThird: boolean
  jobId?: string
}
export interface IHomeCompanyDetailData extends IBaseResult {
  data: {
    data: IHomeCompanyDetail
  }
}

export interface IHomeCompanyDetail {
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
  jobCount: number
  hrCount: number
  watchCount: any
  address: string[]
  addressName: string
  companyUrl: string[]
  certifyUrl: string[]
}

export interface IHomeJobDetailData extends IBaseResult {
  data: {
    data: IHomeJobDetail
  }
}

export interface IHomeJobDetail {
  id: string
  companyId: string
  isSend: boolean
  hrId: number
  jobName: string
  desc: string
  linkMan: string
  govUrl: string
  jobType: string[]
  jobRequire: string
  startMoney: number
  endMoney: number
  moneyMonth: number
  city: string[]
  address: string[]
  addressName: string
  watchCount: number
  tag: string[]
  weal: string[]
  jobDesc: string
  companyName: string
  size: string
  avatar: string
}
