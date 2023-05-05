/*
 * @Author: hqk
 * @Date: 2023-02-04 11:52:41
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-11 10:31:54
 * @Description:
 */
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { createBlacklistFilter } from 'redux-persist-transform-filter'

import storageSession from 'redux-persist/lib/storage/session'
import admin from './features/admin'
import common from './features/common'
import community from './features/community'
import info from './features/info'
import login from './features/login'
import resume from './features/resume'
import home from './features/home'

const adminFilter = createBlacklistFilter('admin', ['dataList'])

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['login', 'resume', 'admin', 'home'],
  transforms: [adminFilter]
}
const myReducers = combineReducers({
  common,
  info,
  login,
  community,
  resume,
  admin,
  home
})

type reducers = ReturnType<typeof myReducers>

const myPersistReducer = persistReducer<reducers>(persistConfig, myReducers)
const store = configureStore({
  reducer: myPersistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const peristor = persistStore(store)

export default store

export * from './features/admin'
export * from './features/common'
export * from './features/community'
export * from './features/home'
export * from './features/login'
