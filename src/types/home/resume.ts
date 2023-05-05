export interface IBaseInfo {
  job: string
  name: string
  politics: string
  sex: string
  telephone: string
  email: string
  likeCity: string
  years: string
  customs: string[]
}

export interface ICompanyExperience {
  id: string
  companyName: string
  jobName: string
  department: string
  companyCity: string
  workTime: any[]
  formText: {
    value: string
  }
}
export interface IEducationInfo {
  id: string
  schoolName: string
  majorName: string
  schoolCity: string
  educationBackground: string
  schoolTime: string[]
  formText: {
    value: string
  }
}
export interface ISchoolExperience {
  id: string
  schoolSumary: string
  schoolDuty: string
  workTime: any[]
  formText: {
    value: string
  }
}
export interface ISkillsAndCertificate {
  skills: string
  certificate: string
  lang: string
  hobby: string
  activity: string
}

export interface IHonoray {
  id: string
  awardName: string
  awardTime: string
}

export interface ICustom {
  id: string
  title: string
  text: string
}
