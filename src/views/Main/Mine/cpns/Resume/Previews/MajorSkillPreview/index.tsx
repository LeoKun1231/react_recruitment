/*
 * @Author: hqk
 * @Date: 2023-03-19 15:37:00
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-19 15:37:10
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { MajorSkillPreviewWrapper } from './style'
import { useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const MajorSkillPreview: FC<IProps> = () => {
  const { data, templateId } = useAppSelector((state) => {
    return {
      data: state.resume.majorSkill.value,
      templateId: state.resume.templateId
    }
  }, useAppShallowEqual)

  return (
    <MajorSkillPreviewWrapper className={classNames({ 'pt-[10px] pr-[30px] pb-[10px] pl-20px': templateId == 3 })}>
      <div dangerouslySetInnerHTML={{ __html: data }} className="rich-editor break-words"></div>
    </MajorSkillPreviewWrapper>
  )
}

export default memo(MajorSkillPreview)
