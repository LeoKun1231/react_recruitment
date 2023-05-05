import { useAppCreateAsyncThunk } from '@/hooks/useAppRedux'
import {
  getCompanyCategoryList,
  getHomeCompanyList,
  getHotCompanyList,
  getHomeJobList,
  getJobTypeList,
  getHotJobList,
  getJobListWithDetailType,
  getJobRelationList,
  getHomeCompanyDetail,
  getCompanyDetailType,
  getCompanyDetailJobList,
  addCompanyAndJobWatchCount,
  getHomeJobDetail,
  uploadResume,
  addResumeToJob,
  getHomeBannerList,
  registerChatUser,
  saveChatRecord,
  getResumeURL,
  checkIsChat
} from '@/services'
import { IBasePage } from '@/types/base'
import { IJobRelationQuery } from '@/types/home/home'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const getHotCompanyListAction = useAppCreateAsyncThunk('home/getHotCompanyList', async (payload: IBasePage) => {
  const res = await getHotCompanyList(payload)
  return res
})

export const getHotJobListAction = useAppCreateAsyncThunk('home/getHotJobList', async (payload: IBasePage) => {
  const res = await getHotJobList(payload)
  return res
})

export const getHomeCompanyListAction = useAppCreateAsyncThunk(
  'home/getHomeCompanyListv',
  async (payload: IBasePage & { category: string }) => {
    const res = await getHomeCompanyList(payload)
    return res
  }
)

export const getHomeJobListAction = useAppCreateAsyncThunk('home/getHomeJobList', async (payload: IBasePage & { type: string }) => {
  const res = await getHomeJobList(payload)
  return res
})

export const getCompanyCategoryAction = useAppCreateAsyncThunk('home/getCompanyCategory', async () => {
  const res = await getCompanyCategoryList()
  return res
})

export const getJobTypeListAction = useAppCreateAsyncThunk('home/getJobTypeList', async () => {
  const res = await getJobTypeList()
  return res
})

export const getJobListWithDetailTypeAction = useAppCreateAsyncThunk(
  'home/getJobListWithDetailType',
  async (payload: IBasePage & { type: string }) => {
    const res = await getJobListWithDetailType(payload)
    return res
  }
)

export const getJobRelationListAction = useAppCreateAsyncThunk('home/getJobRelationList', async (payload: IJobRelationQuery) => {
  const res = await getJobRelationList(payload)
  return res
})
export const getHomeCompanyDetailByIdAction = useAppCreateAsyncThunk('home/getHomeCompanyDetail', async (payload: number) => {
  const res = await getHomeCompanyDetail(payload)
  return res
})

export const getCompanyDetailTypeAction = useAppCreateAsyncThunk('home/getCompanyDetailType', async (payload: number) => {
  const res = await getCompanyDetailType(payload)
  return res
})

export const getCompanyDetailJobListAction = useAppCreateAsyncThunk(
  'home/getCompanyDetailJobList',
  async (payload: IBasePage & { type: string; companyId: string }) => {
    const res = await getCompanyDetailJobList(payload)
    return res
  }
)
export const addCompanyAndJobWatchCountAction = useAppCreateAsyncThunk(
  'home/addCompanyAndJobWatchCount',
  async (payload: { type: number; id: string }) => {
    const { id, type } = payload
    const res = await addCompanyAndJobWatchCount(id, type)
    return res
  }
)
export const getHomeJobDetailAction = useAppCreateAsyncThunk('home/getHomeJobDetail', async (payload: number) => {
  const res = await getHomeJobDetail(payload)
  return res
})
export const uploadResumeAction = useAppCreateAsyncThunk('home/uploadResume', async (payload: any) => {
  const res = await uploadResume(payload)
  return res
})

export const getHomeBannerListAction = useAppCreateAsyncThunk('home/getHomeBannerList', async () => {
  const res = await getHomeBannerList()
  return res
})
export const registerChatUserAction = useAppCreateAsyncThunk('home/getHomeBannerList', async (payload: { toId: number }) => {
  const res = await registerChatUser(payload)
  return res
})
export const addResumeToJobAction = useAppCreateAsyncThunk('home/addResumeToJob', async (payload: { jobId: number; userId: number }) => {
  const { jobId, userId } = payload
  const res = await addResumeToJob(jobId, userId)
  return res
})
export const saveChatRecordAction = useAppCreateAsyncThunk('home/saveChatRecord', async (payload: { jobId: string; userId: number }) => {
  const { jobId, userId } = payload
  const res = await saveChatRecord(userId, jobId)
  return res
})
export const checkIsChatAction = useAppCreateAsyncThunk('home/checkIsChat', async (payload: { jobId: string; userId: number }) => {
  const { jobId, userId } = payload
  const res = await checkIsChat(userId, jobId)
  return res
})

export const getResumeURLAction = useAppCreateAsyncThunk('home/getResumeURL', async () => {
  const res = await getResumeURL()
  return res
})

interface IState {
  isHome: boolean
  isShowChat: boolean
}

const initialState = {
  isHome: true,
  isShowChat: false
} as IState

const homeSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeIsHomeAction(state, { payload }: PayloadAction<boolean>) {
      state.isHome = payload
    },
    clearHomeAction(state) {
      state.isHome = true
      state.isShowChat = false
    },
    changeAppChatShowAction(state, { payload }: PayloadAction<boolean>) {
      state.isShowChat = payload
    }
  }
})

export default homeSlice.reducer

export const { changeIsHomeAction, clearHomeAction, changeAppChatShowAction } = homeSlice.actions
