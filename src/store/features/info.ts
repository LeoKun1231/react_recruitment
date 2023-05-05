/*
 * @Author: hqk
 * @Date: 2023-02-04 11:54:17
 * @LastEditors: hqk
 * @LastEditTime: 2023-05-05 13:18:16
 * @Description:
 */
import { useAppCreateAsyncThunk } from '@/hooks/useAppRedux'
import {
  getChattingJob,
  getMineArtilceById,
  resetPassowrdByPassword,
  resetPassowrdByTelephone,
  updateUserInfo
} from '@/services/modules/home/info'
import { IBasePage } from '@/types/base'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const resetPassowrdByPasswordAction = useAppCreateAsyncThunk('info/resetPasswordByPassword', async (payload: any) => {
  const res = await resetPassowrdByPassword(payload)
  return res
})
export const resetPassowrdByTelephoneAction = useAppCreateAsyncThunk('info/resetPassowrdByTelephone', async (payload: any) => {
  const res = await resetPassowrdByTelephone(payload)
  return res
})
export const updateUserInfoAction = useAppCreateAsyncThunk('info/updateUserInfo', async (payload: any) => {
  const res = await updateUserInfo(payload)
  return res
})

export const getChattingJobListAction = useAppCreateAsyncThunk('info/getChattingJob', async (payload: IBasePage) => {
  const res = await getChattingJob(payload)
  return res
})
export const getMineArtilceByIdAction = useAppCreateAsyncThunk('info/getMineArtilceById', async (payload: IBasePage) => {
  const res = await getMineArtilceById(payload)
  return res
})

const infoSlice = createSlice({
  name: 'info',
  initialState: {},
  reducers: {}
})

export default infoSlice.reducer
// export const {} = infoSlice.actions
