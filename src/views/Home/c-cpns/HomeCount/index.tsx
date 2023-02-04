/*
 * @Author: hqk
 * @Date: 2023-02-03 20:25:53
 * @LastEditors: hqk
 * @LastEditTime: 2023-02-04 12:11:48
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import {
  useAppDispatch,
  useAppSelector,
  useAppShallowEqual
} from '@/hooks/useAppRedux'
import { incrementCountAction } from '@/store/features/counter'

interface IProps {
  children?: ReactNode
}

const HomeCount: FC<IProps> = () => {
  const { count } = useAppSelector(
    (state) => ({
      count: state.counter.count
    }),
    useAppShallowEqual
  )

  const dispatch = useAppDispatch()
  function handleCounterIncrement() {
    dispatch(incrementCountAction(6))
  }

  return (
    <div>
      HomeCount:
      {count}
      <button onClick={handleCounterIncrement}>+6</button>
    </div>
  )
}

export default memo(HomeCount)
