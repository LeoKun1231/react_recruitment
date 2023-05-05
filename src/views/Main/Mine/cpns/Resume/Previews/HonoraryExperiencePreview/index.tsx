/*
 * @Author: hqk
 * @Date: 2023-03-19 15:37:00
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-19 15:37:10
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HonoraryExperiencePreviewWrapper } from './style'
import { useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { formatTime } from '@/utils/date'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const HonoraryExperiencePreview: FC<IProps> = () => {
  const { data, templateId } = useAppSelector((state) => {
    return {
      data: state.resume.honoray,
      templateId: state.resume.templateId
    }
  }, useAppShallowEqual)

  return (
    <HonoraryExperiencePreviewWrapper className={classNames({ 'pt-[10px] pr-[30px] pb-[10px] pl-20px': templateId == 3 })}>
      {data.map((item) => {
        return (
          <div key={item.id} className="between font-600 py-[4px] rich-editor">
            <div>{item.awardName}</div>
            <div>{item.awardTime && formatTime(item.awardTime)}</div>
          </div>
        )
      })}
    </HonoraryExperiencePreviewWrapper>
  )
}

export default memo(HonoraryExperiencePreview)
