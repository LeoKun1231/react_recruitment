/*
 * @Author: hqk
 * @Date: 2023-03-17 19:26:20
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-17 19:27:23
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { MajorSkillWrapper } from './style'
import AppSectionEditor from '@/components/AppSectionEditor'
import { useMemoizedFn } from 'ahooks'
import AppSectionHeader from '@/components/AppSectionHeader'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { changeMajorSkillAction } from '@/store/features/resume'

interface IProps {
  children?: ReactNode
}

const MajorSkill: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  const getHtmlAndText = useMemoizedFn((html: string, text: string) => {
    dispatch(changeMajorSkillAction({ value: html }))
  })
  const { data } = useAppSelector((state) => {
    return {
      data: state.resume.majorSkill.value
    }
  }, useAppShallowEqual)

  return (
    <MajorSkillWrapper>
      <AppSectionHeader title="专业技能" />
      <AppSectionEditor getEdtiorHtml={getHtmlAndText} value={data} />
    </MajorSkillWrapper>
  )
}

export default memo(MajorSkill)
