/*
 * @Author: hqk
 * @Date: 2023-03-19 15:37:00
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-21 12:32:13
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { SchoolExperiencePreviewWrapper } from './style'
import { useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { formatTime } from '@/utils/date'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const SchoolExperiencePreview: FC<IProps> = () => {
  const { data, templateId } = useAppSelector((state) => {
    return {
      data: state.resume.schoolExperience,
      templateId: state.resume.templateId
    }
  }, useAppShallowEqual)

  return (
    <SchoolExperiencePreviewWrapper className={classNames({ 'pt-[10px] pr-[30px] pb-[10px] pl-20px': templateId == 3 })}>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <div className="rich-editor">
              <div className=" font-600 py-[4px] between ">
                <div className="text-[14px]  text-[#666]">{item.schoolSumary}</div>
                <div>
                  {item.workTime ? formatTime(item.workTime[0]) : '2012-01'}
                  <span className="px-[4px]">~</span>
                  {item.workTime ? formatTime(item.workTime[1]) : '2012-05'}
                </div>
              </div>
              <div className="py-[4px] text-[#666]">{item.schoolDuty}</div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: item.formText.value }} className="rich-editor break-words"></div>
          </div>
        )
      })}
    </SchoolExperiencePreviewWrapper>
  )
}

export default memo(SchoolExperiencePreview)
