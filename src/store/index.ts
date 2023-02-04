/*
 * @Author: hqk
 * @Date: 2023-02-04 11:52:41
 * @LastEditors: hqk
 * @LastEditTime: 2023-02-04 12:18:42
 * @Description:
 */
import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import counter from './features/counter'

const store = configureStore({
  reducer: {
    counter
  }
})

useSelector

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
