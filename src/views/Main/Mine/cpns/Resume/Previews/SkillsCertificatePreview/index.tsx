/*
 * @Author: hqk
 * @Date: 2023-03-19 15:37:00
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-22 20:15:32
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { SkillsCertificatePreviewWrapper } from './style'
import { useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const SkillsCertificatePreview: FC<IProps> = () => {
  const { data, templateId } = useAppSelector((state) => {
    return {
      data: state.resume.skillsAndCertificate,
      templateId: state.resume.templateId
    }
  }, useAppShallowEqual)

  return (
    <SkillsCertificatePreviewWrapper className={classNames({ 'pt-[10px] pr-[30px] pb-[10px] pl-20px': templateId == 3 })}>
      {
        <ul className="pl-[22px] my-[8px]">
          {data.skills && (
            <li className="rich-editor">
              <span className="font-600">技能： </span>
              {data.skills}
            </li>
          )}
          {data.certificate && (
            <li className="rich-editor">
              <span className="font-600">证书： </span>
              {data.certificate}
            </li>
          )}
          {data.lang && (
            <li className="rich-editor">
              <span className="font-600">语言： </span>
              {data.lang}
            </li>
          )}
          {data.hobby && (
            <li className="rich-editor">
              <span className="font-600">兴趣爱好： </span>
              {data.hobby}
            </li>
          )}
          {data.activity && (
            <li className="rich-editor">
              <span className="font-600">活动： </span>
              {data.activity}
            </li>
          )}
        </ul>
      }
    </SkillsCertificatePreviewWrapper>
  )
}

export default memo(SkillsCertificatePreview)
