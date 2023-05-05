import {
  addMajor,
  checkCodeIsExit,
  deleteMajors,
  getAllMajorTreeList,
  getMajorNoTreeList,
  getMajorTreeList,
  sendCode,
  updateMajorById
} from '@/services'
import { IMajorNoTree, ITree } from '@/types/common'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAppCreateAsyncThunk } from '@/hooks/useAppRedux'
import { clearAdminState } from './admin'
import { clearCommunityAction } from './community'
import { clearHomeAction } from './home'
import { clearLoginAction } from './login'
import { clearResumeAction } from './resume'

interface IJobInfo {
  jobName: string
  hrId: number
  show: boolean
  jobId: string
  userId: number
}

interface IState {
  loading: boolean
  jobInfo: IJobInfo
  majorNoTreeList: IMajorNoTree[]
  marjorTreeList: ITree[]
  allMarjorTreeList: ITree[]
}

const initialState = {
  loading: false,
  jobInfo: {
    jobName: '',
    hrId: 0,
    show: false,
    jobId: '',
    userId: 0
  }
} as IState

export const sendCodeAction = useAppCreateAsyncThunk('common/sendCode', async (payload: number) => {
  const res = await sendCode(payload)
  return res
})

export const checkPhoneAction = useAppCreateAsyncThunk('common/checkPhone', async (payload: number) => {
  const res = await checkCodeIsExit(payload)
  return res
})

export const getMajorNoTreeListAction = useAppCreateAsyncThunk('common/getMajorNoTreeList', async (payload, { dispatch }) => {
  const res = await getMajorNoTreeList()
  dispatch(saveMajorNoTreeList(res.data.list))
  return res.data.list
})

export const getMajorTreeListAction = useAppCreateAsyncThunk('common/getMajorTreeList', async (payload: number, { dispatch }) => {
  const res = await getMajorTreeList(payload)
  dispatch(saveMajorTreeList(res.data))
  return res.data
})

export const getAllMajorTreeListAction = useAppCreateAsyncThunk('common/getMajorTreeList', async (payload, { dispatch }) => {
  const res = await getAllMajorTreeList()
  dispatch(saveAllMajorTreeList(res.data))
  return res.data
})

export const addMajorAction = useAppCreateAsyncThunk(
  'common/addMajor',
  async (payload: { parentId: number; majorName: string }, { dispatch }) => {
    const res = await addMajor(payload)
    if (res.code == 200) {
      dispatch(getAllMajorTreeListAction())
    }
    return res
  }
)

export const deleteMajorsAction = useAppCreateAsyncThunk('common/deleteMajors', async (payload: number[], { dispatch }) => {
  const res = await deleteMajors(payload)
  if (res.code == 200) {
    dispatch(getAllMajorTreeListAction())
  }
  return res
})

export const updateMajorByIdAction = useAppCreateAsyncThunk(
  'common/updateMajor',
  async (payload: { id: number; majorName: string }, { dispatch }) => {
    const res = await updateMajorById(payload)
    if (res.code == 200) {
      dispatch(getAllMajorTreeListAction())
    }
    return res
  }
)

export const clearAllAction = useAppCreateAsyncThunk('common/clearAll', (_, { dispatch }) => {
  dispatch(clearCommonAction())
  dispatch(clearAdminState())
  dispatch(clearCommunityAction())
  dispatch(clearHomeAction())
  dispatch(clearLoginAction())
  dispatch(clearResumeAction())
})

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeLoadingAction(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload
    },
    saveMajorNoTreeList(state, { payload }: PayloadAction<IMajorNoTree[]>) {
      state.majorNoTreeList = [{ majorName: '全部', id: 0 }, ...payload]
    },
    saveMajorTreeList(state, { payload }: PayloadAction<ITree[]>) {
      state.marjorTreeList = payload
    },
    saveAllMajorTreeList(state, { payload }: PayloadAction<ITree[]>) {
      state.allMarjorTreeList = payload
    },
    clearCommonAction(state) {
      state.allMarjorTreeList = []
      state.jobInfo = {} as IJobInfo
      state.loading = false
      state.majorNoTreeList = []
      state.marjorTreeList = []
    }
  }
})

export const { changeLoadingAction, saveMajorNoTreeList, saveMajorTreeList, saveAllMajorTreeList, clearCommonAction } = commonSlice.actions
export default commonSlice.reducer
