import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  shallowEqual
} from 'react-redux'
import type { RootState, AppDispatch } from '@/store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppShallowEqual = shallowEqual
