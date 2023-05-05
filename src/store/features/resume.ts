/*
 * @Author: hqk
 * @Date: 2023-02-04 11:54:17
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-23 12:50:52
 * @Description:
 */
import { EditorComponent } from '@/constant'
import { useAppCreateAsyncThunk } from '@/hooks/useAppRedux'
import { upload } from '@/services'
import {
  IBaseInfo,
  ICompanyExperience,
  ICustom,
  IEducationInfo,
  IHonoray,
  ISchoolExperience,
  ISkillsAndCertificate
} from '@/types/home/resume'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
  id: number
  templateId: number
  baseInfo: IBaseInfo
  companyExperience: ICompanyExperience[]
  educationInfo: IEducationInfo[]
  honoray: IHonoray[]
  majorSkill: {
    value: string
  }
  schoolExperience: ISchoolExperience[]
  skillsAndCertificate: ISkillsAndCertificate
  previews: EditorComponent[]
  customList: ICustom[]
  avatar: {
    url: string
    fileName: string
  }
}

const initialState = {} as IState

export const uploadResumeAvatarAction = useAppCreateAsyncThunk('resume/uploadResumeAvatar', async (payload: any, { dispatch }) => {
  const res = await upload(payload)
  dispatch(saveAvatarAction(res.data))
})

const ResumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    changeResumeDataAction(state, { payload }: any) {
      state.id = 1
      state.baseInfo = payload.baseInfo
      state.companyExperience = payload.companyExperience
      state.educationInfo = payload.educationInfo
      state.honoray = payload.honoray
      state.majorSkill = payload.majorSkill
      state.schoolExperience = payload.schoolExperience
      state.skillsAndCertificate = payload.skillsAndCertificate
      state.templateId = 1
      state.previews = [
        EditorComponent.BASE_INFO,
        EditorComponent.EDUCATION_INFO,
        EditorComponent.SCHOOL_EXPERIENCE,
        EditorComponent.MAJOR_SKILL,
        EditorComponent.COMPANY_EXPERIENCE,
        EditorComponent.SKILLS_CERTIFICATES_AND_MORE
      ]
      state.customList = []
      state.avatar = { url: '', fileName: '' }
    },
    changeSkillAndCertificateAction(state, { payload }: PayloadAction<ISkillsAndCertificate>) {
      state.skillsAndCertificate = payload
    },
    changeBaseInfoAction(state, { payload }: PayloadAction<IBaseInfo>) {
      state.baseInfo = payload
    },
    changeCompanyExperienceAction(state, { payload }: PayloadAction<ICompanyExperience[]>) {
      state.companyExperience = payload
    },
    changeEducationInfoAction(state, { payload }: PayloadAction<IEducationInfo[]>) {
      state.educationInfo = payload
    },
    changeMajorSkillAction(state, { payload }: PayloadAction<{ value: string }>) {
      state.majorSkill = payload
    },
    changeSchoolExperienceAction(state, { payload }: PayloadAction<ISchoolExperience[]>) {
      state.schoolExperience = payload
    },
    changeHonoraryExperienceAction(state, { payload }: PayloadAction<IHonoray[]>) {
      state.honoray = payload
    },
    changeTemplateIdAction(state, { payload }: PayloadAction<number>) {
      state.templateId = payload
    },
    changePreviewsAction(state, { payload }: PayloadAction<EditorComponent[]>) {
      state.previews = payload
    },
    changeCustomListAction(state, { payload }: PayloadAction<ICustom[]>) {
      state.customList = payload
    },
    saveAvatarAction(state, { payload }: PayloadAction<{ url: string; fileName: string }>) {
      state.avatar = payload
    },
    clearResumeAction(state) {
      state = {} as IState
    }
  }
})

export default ResumeSlice.reducer
export const {
  changeResumeDataAction,
  changeSkillAndCertificateAction,
  changeBaseInfoAction,
  changeCompanyExperienceAction,
  changeEducationInfoAction,
  changeMajorSkillAction,
  changeSchoolExperienceAction,
  changeHonoraryExperienceAction,
  changeTemplateIdAction,
  changePreviewsAction,
  changeCustomListAction,
  saveAvatarAction,
  clearResumeAction
} = ResumeSlice.actions
