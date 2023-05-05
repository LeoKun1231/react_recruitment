/*
 * @Author: hqk
 * @Date: 2023-03-04 16:58:06
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-20 14:31:52
 * @Description:
 */
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { MineWrapper } from './style'
import Resume from './cpns/Resume'
import { useAppDispatch } from '@/hooks/useAppRedux'
import { changeResumeDataAction } from '@/store/features/resume'
import template from '@/assets/data/template.json'
import { resetArticleSearchOptionsAction } from '@/store/features/community'
interface IProps {
  children?: ReactNode
}

const Mine: FC<IProps> = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(changeResumeDataAction(template as any))
    return () => {
      dispatch(resetArticleSearchOptionsAction())
    }
  }, [])

  return (
    <MineWrapper>
      <Resume />
    </MineWrapper>
  )
}

export default memo(Mine)
