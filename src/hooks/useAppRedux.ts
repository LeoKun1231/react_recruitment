import { TypedUseSelectorHook, useDispatch, useSelector, shallowEqual } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppShallowEqual = shallowEqual
export const useAppCreateAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  // rejectValue: string
  // extra: { s: string; n: number }
}>()
