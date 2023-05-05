/*
 * @Author: hqk
 * @Date: 2023-02-25 12:29:06
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-16 14:02:25
 * @Description:
 */
import { useAppCreateAsyncThunk } from '@/hooks/useAppRedux'
import { loginByAccount, loginByPhone, resetPassword } from '@/services'
import { ILoginAccount, ILoginPhone, ILoginResetPassword, ILoginUser } from '@/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
  showForget: boolean
  loginUser: ILoginUser
  userId: number
  isLogin: boolean
}

const initialState: IState = {
  showForget: false,
  loginUser: {},
  userId: 0,
  isLogin: false
} as IState

export const loginByAccountAction = useAppCreateAsyncThunk('login/account', async (payload: ILoginAccount, { dispatch, getState }) => {
  const res = await loginByAccount(payload)
  dispatch(saveLoginUserAction(res.data))
  return res
})

export const loginByPhoneAction = useAppCreateAsyncThunk('login/phone', async (payload: ILoginPhone, { dispatch, getState }) => {
  const res = await loginByPhone(payload)
  dispatch(saveLoginUserAction(res.data))
  return res
})

export const loginByResetPassword = createAsyncThunk('login/resetPassword', async (payload: ILoginResetPassword, { dispatch }) => {
  const res = await resetPassword(payload)
  dispatch(saveLoginUserAction(res.data))
  return res
})

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    turnToForgetPasswordAction(state, { payload }: PayloadAction<boolean>) {
      state.showForget = payload
    },
    saveLoginUserAction(state, { payload }: PayloadAction<ILoginUser>) {
      state.loginUser = payload
    },
    changeLoginStatusAction(state, { payload }: PayloadAction<boolean>) {
      state.isLogin = payload
    },
    clearLoginAction(state) {
      state.loginUser = {} as ILoginUser
      state.userId = 0
    },
    changeLoginUserAction(
      state,
      { payload }: PayloadAction<{ userName?: string; nickName?: string; email?: string; telephone?: string; avatar?: string }>
    ) {
      const { userName, nickName, email, telephone, avatar } = payload
      if (nickName) {
        state.loginUser.nickName = nickName
      }
      if (telephone) {
        state.loginUser.telephone = telephone
      }
      if (email) {
        state.loginUser.email = email
      }
      if (userName) {
        state.loginUser.userName = userName
      }
      if (avatar) {
        state.loginUser.avatar = avatar
      }
    }
  }
})

export const { turnToForgetPasswordAction, saveLoginUserAction, changeLoginStatusAction, clearLoginAction, changeLoginUserAction } =
  loginSlice.actions
export default loginSlice.reducer
