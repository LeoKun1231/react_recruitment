/*
 * @Author: hqk
 * @Date: 2023-03-19 15:37:00
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-19 19:10:25
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { EducationInfoPreviewWrapper } from './style'
import { useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { v4 as uuidv4 } from 'uuid'
import { formatTime } from '@/utils/date'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const EducationInfoPreview: FC<IProps> = () => {
  const { data, templateId } = useAppSelector((state) => {
    return {
      data: state.resume.educationInfo,
      templateId: state.resume.templateId
    }
  }, useAppShallowEqual)
  return (
    <EducationInfoPreviewWrapper className={classNames({ 'pt-[10px] pr-[30px] pb-[10px] pl-20px': templateId == 3 })}>
      {data.map((item) => {
        return (
          <div key={uuidv4()}>
            <div className="school-title between my-[4px] rich-editor">
              <div className="font-600">{item.schoolName}</div>
              <div>
                {item.schoolTime ? formatTime(item.schoolTime[0]) : '2012-01'}
                <span className="px-[4px]">~</span>
                {item.schoolTime ? formatTime(item.schoolTime[1]) : '2012-05'}
              </div>
            </div>
            <div className="major between rich-editor">
              <div>
                {item.majorName} {item.educationBackground}
              </div>
              <div>{item.schoolCity}</div>
            </div>
            <div className="school-content">
              <div dangerouslySetInnerHTML={{ __html: item.formText.value }} className="rich-editor break-words"></div>
            </div>
          </div>
        )
      })}
    </EducationInfoPreviewWrapper>
  )
}

export default memo(EducationInfoPreview)
