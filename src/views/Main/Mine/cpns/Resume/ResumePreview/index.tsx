/*
 * @Author: hqk
 * @Date: 2023-03-16 10:36:36
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-15 14:42:57
 * @Description:
 */
import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { PreviewWrapper } from './style'
import ResumeSection from '../ResumeSection'
import { EditorComponent } from '@/constant'
import BaseInfoPreview from '../Previews/BaseInfoPreview'
import EducationInfoPreview from '../Previews/EducationInfoPreview'
import MajorSkillPreview from '../Previews/MajorSkillPreview'
import CompanyExperiencePreview from '../Previews/CompanyExperiencePreview'
import SchoolExperiencePreview from '../Previews/SchoolExperiencePreview'
import HonoraryExperiencePreview from '../Previews/HonoraryExperiencePreview'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { useMemoizedFn, useSize } from 'ahooks'
import {
  changeCompanyExperienceAction,
  changeCustomListAction,
  changeEducationInfoAction,
  changeHonoraryExperienceAction,
  changeMajorSkillAction,
  changePreviewsAction,
  changeSchoolExperienceAction,
  changeSkillAndCertificateAction
} from '@/store/features/resume'
import SkillsCertificatePreview from '../Previews/SkillsCertificatePreview'
import template from '@/assets/data/template.json'
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDndProvider } from '@/hooks/useDndProvider'
import update from 'immutability-helper'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
  onChangeComponent: (name: EditorComponent, title?: string, id?: string) => void
}

const showComponents = [
  {
    key: '1',
    id: EditorComponent.EDUCATION_INFO,
    title: '教育经历',
    Component: EducationInfoPreview
  },
  {
    key: '2',
    id: EditorComponent.MAJOR_SKILL,
    title: '专业技能',
    Component: MajorSkillPreview
  },
  {
    key: '3',
    id: EditorComponent.SCHOOL_EXPERIENCE,
    title: '校园经历',
    Component: SchoolExperiencePreview
  },
  {
    key: '4',
    id: EditorComponent.HONORARY_EXPERIENCE,
    title: '荣誉经历',
    Component: HonoraryExperiencePreview
  },
  {
    key: '5',
    id: EditorComponent.SKILLS_CERTIFICATES_AND_MORE,
    title: '技能/证书及其他',
    Component: SkillsCertificatePreview
  },
  {
    key: '6',
    id: EditorComponent.COMPANY_EXPERIENCE,
    title: '公司经历',
    Component: CompanyExperiencePreview
  }
]

const ResumePreview: FC<IProps> = (props) => {
  const { onChangeComponent } = props

  const [arr, setArr] = useState<any[]>([])

  //修改编辑器
  const handleChangeEditor = (name: EditorComponent, title?: string, id?: string) => {
    onChangeComponent && onChangeComponent(name, title, id)
  }

  const { previews, customList, templateId } = useAppSelector((state) => {
    return {
      previews: state.resume.previews,
      customList: state.resume.customList,
      templateId: state.resume.templateId
    }
  }, useAppShallowEqual)
  const dispatch = useAppDispatch()

  //删除
  const handleDelete = useMemoizedFn((key: EditorComponent, id?: string) => {
    if (id) {
      const newArr = customList.filter((item) => item.id != id)
      dispatch(changeCustomListAction(newArr))
      setArr((c) => c.filter((item) => item.id != id))
      onChangeComponent && onChangeComponent(EditorComponent.BASE_INFO)
      return
    }

    const arr = previews.filter((item) => item != key)
    switch (key) {
      case EditorComponent.COMPANY_EXPERIENCE:
        dispatch(changeCompanyExperienceAction(template.companyExperience))
        break
      case EditorComponent.EDUCATION_INFO:
        dispatch(changeEducationInfoAction(template.educationInfo as any))
        break
      case EditorComponent.HONORARY_EXPERIENCE:
        dispatch(changeHonoraryExperienceAction(template.honoray))
        break
      case EditorComponent.MAJOR_SKILL:
        dispatch(changeMajorSkillAction(template.majorSkill))
        break
      case EditorComponent.SCHOOL_EXPERIENCE:
        dispatch(changeSchoolExperienceAction(template.schoolExperience))
        break
      case EditorComponent.SKILLS_CERTIFICATES_AND_MORE:
        dispatch(changeSkillAndCertificateAction(template.skillsAndCertificate))
        break
      default:
        break
    }
    dispatch(changePreviewsAction(arr))
    setArr((c) => c.filter((item) => item.id != key))

    onChangeComponent && onChangeComponent(EditorComponent.BASE_INFO)
  })

  const isShow = useMemoizedFn((componentName: EditorComponent, previews: EditorComponent[]) => {
    return previews?.includes(componentName)
  })

  useEffect(() => {
    showComponents.forEach((item) => {
      if (previews?.includes(item.id)) {
        setArr((c) => [...c, item])
      }
    })
    setArr((c) => [...new Set(c)])
  }, [previews])

  useEffect(() => {
    setArr((c) => {
      let tempArr: any = []
      tempArr = c
      for (const item of customList || []) {
        tempArr = c.filter((iten) => iten.id != item.id)
        tempArr.push(item)
      }
      return [...tempArr]
    })
  }, [customList])

  const findCard = useMemoizedFn((id: string) => {
    const card = arr.filter((c) => `${c.id}` === id)[0] as {
      id: string
    }
    return {
      card,
      index: arr.indexOf(card)
    }
  })

  const moveCard = useMemoizedFn((id: string, atIndex: number) => {
    const { card, index } = findCard(id)
    setArr(
      update(arr, {
        $splice: [
          [index, 1],
          [atIndex, 0, card]
        ]
      })
    )
  })
  const [, drop] = useDrop(() => ({ accept: 'card' }))

  return (
    <PreviewWrapper
      className={classNames({
        pdfExport: true,
        'pt-[30px] pr-[40px] pl-[40px]': true
      })}
      ref={drop}>
      {isShow(EditorComponent.BASE_INFO, previews) && <BaseInfoPreview onClick={() => handleChangeEditor(EditorComponent.BASE_INFO)} />}
      <div>
        {arr.map(({ key, id, title, Component, text }) => {
          return !key ? (
            <ResumeSection
              id={id}
              title={title}
              onDelete={() => handleDelete(EditorComponent.CUSTOM_INFO, id)}
              onClick={() => handleChangeEditor(EditorComponent.CUSTOM_INFO, title, id)}
              key={id}
              moveCard={moveCard}
              findCard={findCard}>
              <div
                dangerouslySetInnerHTML={{ __html: text }}
                className={classNames({ 'pt-[20px] pr-[30px] pb-[10px] pl-20px': templateId == 3 })}></div>
            </ResumeSection>
          ) : (
            <ResumeSection
              title={title}
              onDelete={() => handleDelete(id)}
              onClick={() => handleChangeEditor(id)}
              key={id}
              id={id}
              moveCard={moveCard}
              findCard={findCard}>
              <Component />
            </ResumeSection>
          )
        })}
      </div>
    </PreviewWrapper>
  )
}

export default memo(ResumePreview)
