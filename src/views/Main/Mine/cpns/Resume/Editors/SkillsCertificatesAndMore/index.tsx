/*
 * @Author: hqk
 * @Date: 2023-03-18 17:49:40
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-19 16:05:03
 * @Description:
 */
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { SkillsCertificatesWrapper } from './style'
import { DatePicker, Form, Input } from 'antd'
import AppSectionEditor from '@/components/AppSectionEditor'
import { useMemoizedFn } from 'ahooks'
import AppAddMore from '@/components/AppAddMore'
import { formatStringToDayjs } from '@/utils/date'
import AppSectionHeader from '@/components/AppSectionHeader'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { changeSkillAndCertificateAction } from '@/store/features/resume'

interface IProps {
  children?: ReactNode
}

const SkillsCertificatesAndMore: FC<IProps> = memo((props) => {
  const [form] = Form.useForm()

  const { data } = useAppSelector((state) => {
    return {
      data: state.resume.skillsAndCertificate
    }
  }, useAppShallowEqual)

  useEffect(() => {
    form.setFieldsValue(data)
  }, [])

  const dispatch = useAppDispatch()
  const handleChange = () => {
    dispatch(changeSkillAndCertificateAction(form.getFieldsValue()))
  }

  return (
    <SkillsCertificatesWrapper>
      <AppSectionHeader title="技能/证书及其他" />
      <Form form={form} name="form" layout="vertical" autoComplete="off" onChange={handleChange}>
        <Form.Item label="技能：" name="skills">
          <Input placeholder="技能名称（程度描述），如：PPT（可设计模版）" />
        </Form.Item>
        <Form.Item label="证书：" name="certificate">
          <Input placeholder="证书名称（程度描述），如：CFA（二级）" />
        </Form.Item>
        <Form.Item label="语言：" name="lang">
          <Input placeholder="语言名称（程度描述），如：英语（CET-6）" />
        </Form.Item>
        <Form.Item label="兴趣爱好：" name="hobby">
          <Input placeholder="兴趣名称（程度描述），如：篮球（校队队长）" />
        </Form.Item>
        <Form.Item label="活动：" name="activity">
          <Input placeholder="活动名称（程度描述），如：XX公众号（运营）" />
        </Form.Item>
      </Form>
    </SkillsCertificatesWrapper>
  )
})

export default SkillsCertificatesAndMore
