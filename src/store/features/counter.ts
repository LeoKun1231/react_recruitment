/*
 * @Author: hqk
 * @Date: 2023-02-04 11:54:17
 * @LastEditors: hqk
 * @LastEditTime: 2023-02-04 13:37:27
 * @Description:
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 100
  },
  reducers: {
    incrementCountAction(state, { payload }: PayloadAction<number>) {
      state.count = state.count + payload
    }
  }
})

export default counterSlice.reducer
export const { incrementCountAction } = counterSlice.actions
