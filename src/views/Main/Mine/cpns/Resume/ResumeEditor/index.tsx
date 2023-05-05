/*
 * @Author: hqk
 * @Date: 2023-03-16 10:36:43
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-21 17:15:48
 * @Description:
 */
import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { EditorWrapper } from './style'
import CompanyExperience from '../Editors/CompanyExperience'
import EducationInfo from '../Editors/EducationInfo'
import HonoraryExperience from '../Editors/HonoraryExperience'
import MajorSkill from '../Editors/MajorSkill'
import BaseInfo from '../Editors/BaseInfo'
import SchoolExperience from '../Editors/SchoolExperience'
import SkillsCertificatesAndMore from '../Editors/SkillsCertificatesAndMore'
import CustomInfo from '../Editors/CustomInfo'
import { EditorComponent } from '@/constant'
interface IProps {
  children?: ReactNode
  ComponentName: EditorComponent
  title?: string
  id?: string
}

const components = {
  CompanyExperience,
  EducationInfo,
  HonoraryExperience,
  MajorSkill,
  BaseInfo,
  SchoolExperience,
  SkillsCertificatesAndMore,
  CustomInfo
}

const ResumeEditor: FC<IProps> = (props) => {
  const { ComponentName, title, id } = props

  const Component = components[ComponentName]

  return (
    <EditorWrapper>
      <Component title={title!} id={id!} />
    </EditorWrapper>
  )
}

export default memo(ResumeEditor)
