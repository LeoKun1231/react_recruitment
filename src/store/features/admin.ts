/*
 * @Author: hqk
 * @Date: 2023-02-04 11:54:17
 * @LastEditors: hqk
 * @LastEditTime: 2023-05-07 11:23:40
 * @Description:
 */
import { changeBannerStatus, getBannerDetail, getTopicList, removeBannerImage, saveBanner } from '@/services'
import {
  addJob,
  addTopic,
  addData,
  batchAddUser,
  batchDeleteData,
  changeCompanyActive,
  checkCompany,
  deleteReport,
  deleteTopicById,
  deleteDataById,
  getCompanyDetail,
  getCompanyStatus,
  getDataList,
  getMenusByRoleId,
  getReportCommentList,
  getReportList,
  recoverReport,
  removeAll,
  removeImages,
  reportById,
  updateCompany,
  updateTopicById,
  updateDataById,
  getJobDetail,
  changeJobStatus
} from '@/services'
import { IMenus, IUpdateCompany } from '@/types/admin'
import { IReport } from '@/types/home/community'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RouteObject } from 'react-router-dom'
import { useAppCreateAsyncThunk } from '@/hooks/useAppRedux'

interface IState {
  menuList: IMenus[]
  dynamicRoutes: RouteObject[]
  dataList: any[]
  pageSize: number
  currentPage: number
  totalCount: number
  seachParams: object
}

const initialState = {
  menuList: [],
  dynamicRoutes: [],
  dataList: [],
  pageSize: 10,
  currentPage: 1,
  totalCount: 0,
  seachParams: {}
} as IState

export const getMenuListByRoleIdAction = useAppCreateAsyncThunk('admin/getMenuListById', async (payload: number, { dispatch }) => {
  const res = await getMenusByRoleId(payload)
  if (res.data.length > 0) {
    dispatch(saveMenuListAction(res.data[0].children))
  } else {
    dispatch(saveMenuListAction([]))
    dispatch(saveDynamicRoutesAction([]))
  }
  return res.data
})

export const getDataListAction = useAppCreateAsyncThunk(
  'admin/getDataList',
  async (payload: { page: string; data: any; isFullPage?: boolean }, { dispatch, getState }) => {
    const {
      admin: { seachParams }
    } = getState()
    const res = await getDataList(payload.page, { ...payload.data, ...seachParams }, payload.isFullPage)
    dispatch(changeDataListAction(res.data.records))
    dispatch(changeTotalCountAction(res.data.totalCount))
    return res
  }
)

export const addDataAction = useAppCreateAsyncThunk(
  'admin/addData',
  async (payload: { page: string; data: any; isFullPage?: boolean }, { dispatch }) => {
    const res = await addData(payload.page, payload.data, payload.isFullPage)
    if (res.code == 200) {
      dispatch(resetPageAction())
      dispatch(getDataListAction({ page: payload.page, data: { pageSize: 10, currentPage: 1 }, isFullPage: payload.isFullPage }))
    }
    return res
  }
)

export const batchDeleteDataAction = useAppCreateAsyncThunk(
  'admin/batchDeleteData',
  async (payload: { ids: number[]; page: string; isFullPage?: boolean }, { dispatch }) => {
    const { ids, page, isFullPage } = payload
    const res = await batchDeleteData(ids, page, isFullPage)
    if (res.code == 200) {
      dispatch(resetPageAction())
      dispatch(getDataListAction({ page, data: { pageSize: 10, currentPage: 1 }, isFullPage: payload.isFullPage }))
    }
    return res
  }
)

export const deleteDataByIdAction = useAppCreateAsyncThunk(
  'admin/deleteDataById',
  async (payload: { id: number; page: string; isFullPage?: boolean }, { dispatch }) => {
    const { page, id, isFullPage } = payload
    const res = await deleteDataById(id, page, isFullPage)
    if (res.code == 200) {
      dispatch(resetPageAction())
      dispatch(getDataListAction({ page, data: { pageSize: 10, currentPage: 1 }, isFullPage: payload.isFullPage }))
    }
  }
)

export const batchAddAction = useAppCreateAsyncThunk('admin/batchAdd', async (payload: { file: any; majorId: number }, { dispatch }) => {
  const { file, majorId } = payload
  const res = await batchAddUser(file, majorId)
  if (res.code == 200) {
    dispatch(resetPageAction())
    dispatch(getDataListAction({ page: 'student', data: { pageSize: 10, currentPage: 1 } }))
  }
  return res
})

export const updateDataByIdAction = useAppCreateAsyncThunk(
  'admin/updateDataById',
  async (payload: { page: string; data: any; isFullPage?: boolean }, { dispatch, getState }) => {
    const {
      admin: { currentPage, pageSize }
    } = getState()
    const res = await updateDataById(payload.page, payload.data, payload.isFullPage)
    if (res.code == 200) {
      dispatch(getDataListAction({ page: payload.page, data: { pageSize, currentPage }, isFullPage: payload.isFullPage }))
    }
    return res
  }
)

export const getAdminTopicListAction = useAppCreateAsyncThunk(
  'admin/topicList',
  async (payload: { currentPage: number; pageSize: number }) => {
    const res = await getTopicList(payload)
    return res
  }
)

export const updateTopicByIdAction = useAppCreateAsyncThunk('admin/updateTopic', async (payload: { id: number; content: string }) => {
  const res = await updateTopicById(payload)
  return res
})

export const addTopicAction = useAppCreateAsyncThunk('admin/addTopic', async (payload: { content: string }) => {
  const res = await addTopic(payload)
  return res
})
export const deleteTopicByIdAction = useAppCreateAsyncThunk('admin/deleteTopic', async (payload: number) => {
  const res = await deleteTopicById(payload)
  return res
})

export const reportByIdAction = useAppCreateAsyncThunk('admin/report', async (payload: { data: IReport; page: string }) => {
  const { data, page } = payload
  const res = await reportById(page, data)
  return res
})

export const getReportArticleListAction = useAppCreateAsyncThunk(
  'admin/getReportArticleList',
  async (payload: { type: number; pageSize: number; currentPage: number; page: string }) => {
    const { type, currentPage, page, pageSize } = payload
    const res = await getReportList(page, { type, currentPage, pageSize })
    return res
  }
)

export const getReportCommentListAction = useAppCreateAsyncThunk(
  'admin/getReportCommentList',
  async (payload: { type: number; pageSize: number; currentPage: number }) => {
    const { type, currentPage, pageSize } = payload
    const res = await getReportCommentList({ type, currentPage, pageSize })
    return res
  }
)

export const deleteReportAction = useAppCreateAsyncThunk('admin/deleteReport', async (payload: { data: number[]; page: string }) => {
  const { data, page } = payload
  const res = await deleteReport(page, data)
  return res
})

export const recoverReportAction = useAppCreateAsyncThunk('admin/recoverReport', async (payload: { data: number[]; page: string }) => {
  const { data, page } = payload
  const res = await recoverReport(page, data)
  return res
})

export const removeImagesAction = useAppCreateAsyncThunk(
  'admin/removeImage',
  async (payload: { page: 'companyImages' | 'certifyImages' | 'avatar'; url: string }) => {
    const { page, url } = payload
    const res = await removeImages(page, url)
    return res
  }
)

export const removeAllAction = useAppCreateAsyncThunk('admin/removeAll', async () => {
  const res = await removeAll()
  return res
})

export const updateCompanyAction = useAppCreateAsyncThunk('admin/updateCompany', async (payload: IUpdateCompany) => {
  const res = await updateCompany(payload)
  return res
})

export const changeCompanyActiveAction = useAppCreateAsyncThunk('admin/changeCompanyActive', async (payload: number) => {
  const res = await changeCompanyActive(payload)
  return res
})

export const getCompanyDetailAction = useAppCreateAsyncThunk('admin/getCompanyDetail', async (payload: number) => {
  const res = await getCompanyDetail(payload)
  return res
})

export const getCompanyStatusAction = useAppCreateAsyncThunk('admin/getCompanyStatus', async (payload: number) => {
  const res = await getCompanyStatus(payload)
  return res
})

export const checkCompanyAction = useAppCreateAsyncThunk(
  'admin/checkCompany',
  async (payload: { id: number; reason?: string; isSuccess: boolean }) => {
    const res = await checkCompany(payload)
    return res
  }
)

export const AddJobAction = useAppCreateAsyncThunk('admin/addjob', async (payload: any, { dispatch }) => {
  const res = await addJob(payload)
  if (res.code == 200) {
    dispatch(resetPageAction())
    dispatch(getDataListAction({ page: '/company/job', data: { pageSize: 10, currentPage: 1 }, isFullPage: true }))
  }
  return res
})

export const getJobDetailAction = useAppCreateAsyncThunk('admin/getJobDetail', async (payload: string) => {
  const res = await getJobDetail(payload)
  return res
})
export const changeJobStatusAction = useAppCreateAsyncThunk('admin/changeJobStatus', async (payload: string) => {
  const res = await changeJobStatus(payload)
  return res
})
export const removeBannerImageAction = useAppCreateAsyncThunk('admin/removeBannerImage', async () => {
  const res = await removeBannerImage()
  return res
})
export const getBannerDetailAction = useAppCreateAsyncThunk('admin/getBannerDetail', async () => {
  const res = await getBannerDetail()
  return res
})
export const saveBannerAction = useAppCreateAsyncThunk('admin/saveBanner', async (data: any) => {
  const res = await saveBanner(data)
  return res
})
export const changeBannerStatusAction = useAppCreateAsyncThunk('admin/changeBannerStatus', async (data: number) => {
  const res = await changeBannerStatus(data)
  return res
})

const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    saveMenuListAction(state, { payload }: PayloadAction<IMenus[]>) {
      state.menuList = payload
    },
    saveDynamicRoutesAction(state, { payload }: PayloadAction<RouteObject[]>) {
      state.dynamicRoutes = payload
    },
    changeDataListAction(state, { payload }: PayloadAction<any[]>) {
      state.dataList = payload
    },
    changeTotalCountAction(state, { payload }: PayloadAction<number>) {
      state.totalCount = payload
    },
    changePageAction(state, { payload }: PayloadAction<{ currentPage: number; pageSize: number }>) {
      state.currentPage = payload.currentPage
      state.pageSize = payload.pageSize
    },
    resetPageAction(state) {
      state.currentPage = 1
      state.pageSize = 10
    },
    changeSeachParamsAction(state, { payload }) {
      state.seachParams = payload
    },
    clearAdminState(state) {
      state.currentPage = 1
      state.dataList = []
      state.dynamicRoutes = []
      state.menuList = []
      state.pageSize = 10
      state.seachParams = {}
      state.totalCount = 0
    }
  }
})

export default AdminSlice.reducer
export const {
  saveMenuListAction,
  saveDynamicRoutesAction,
  changeDataListAction,
  resetPageAction,
  changeTotalCountAction,
  changePageAction,
  changeSeachParamsAction,
  clearAdminState
} = AdminSlice.actions
