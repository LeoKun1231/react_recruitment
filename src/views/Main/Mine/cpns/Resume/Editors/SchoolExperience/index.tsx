/*
 * @Author: hqk
 * @Date: 2023-03-18 17:49:40
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-19 23:38:45
 * @Description:
 */
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { SchoolExperienceWrapper } from './style'
import { DatePicker, Form, Input, Button } from 'antd'
import AppSectionEditor from '@/components/AppSectionEditor'
import { useMemoizedFn } from 'ahooks'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { formatStringToDayjs } from '@/utils/date'
import { changeSchoolExperienceAction } from '@/store/features/resume'
import { v4 as uuidv4 } from 'uuid'
import { DeleteOutlined } from '@ant-design/icons'
import AppSectionHeader from '@/components/AppSectionHeader'
import { ISchoolExperience } from '@/types/home/resume'

interface IProps {
  children?: ReactNode
  name: string
  formData: ISchoolExperience
}

const SchoolExperience: FC<IProps> = memo((props) => {
  const { name, formData } = props
  const [form] = Form.useForm()

  const getEditorHtmlAndText = useMemoizedFn((html: string, text: string) => {
    const newArr = data.map((item) => {
      if (item.id == formData.id) {
        return { ...item, formText: { value: html } }
      } else {
        return item
      }
    })
    dispatch(changeSchoolExperienceAction(newArr))
  })

  const { data } = useAppSelector((state) => {
    return {
      data: state.resume.schoolExperience
    }
  }, useAppShallowEqual)
  const dispatch = useAppDispatch()

  const handleChange = useMemoizedFn(() => {
    const newArr = data.map((item) => {
      if (item.id == formData.id) {
        console.log(form.getFieldsValue())
        return { ...item, ...form.getFieldsValue() }
      } else {
        return item
      }
    })
    dispatch(changeSchoolExperienceAction(newArr))
  })
  useEffect(() => {
    form.setFieldsValue(formData)
    form.setFieldValue('workTime', [formatStringToDayjs('2012-01'), formatStringToDayjs('2012-05')])
  }, [])

  return (
    <SchoolExperienceWrapper>
      <Form form={form} name={'form' + name} layout="vertical" autoComplete="off" onChange={handleChange}>
        <Form.Item label="经历简要：" name="schoolSumary">
          <Input placeholder="如：学生会" />
        </Form.Item>
        <Form.Item label="主要职责：" name="schoolDuty">
          <Input placeholder="如：部长" />
        </Form.Item>
        <Form.Item label="时间：" name="workTime">
          <DatePicker.RangePicker picker="month" className="w-full" onChange={handleChange} />
        </Form.Item>
        <div className="mb-[8px]">经历描述：</div>
        <AppSectionEditor getEdtiorHtml={getEditorHtmlAndText} value={formData.formText.value} />
      </Form>
    </SchoolExperienceWrapper>
  )
})
const SchoolExperienceList = memo(() => {
  const { data } = useAppSelector((state) => {
    return {
      data: state.resume.schoolExperience
    }
  }, useAppShallowEqual)

  const dispatch = useAppDispatch()
  const handleAdd = useMemoizedFn(() => {
    dispatch(
      changeSchoolExperienceAction([
        ...data,
        {
          id: uuidv4(),
          schoolSumary: '经历简要: 如社团名称',
          schoolDuty: '担任职责：如班长、部长',
          workTime: ['2012-01', '2012-05'],
          formText: {
            value: '11111111111111'
          }
        }
      ])
    )
  })
  const handleDelete = (e: React.MouseEvent, id: string) => {
    const newArr = data.filter((item) => item.id != id)
    dispatch(changeSchoolExperienceAction(newArr))
  }

  return (
    <>
      <AppSectionHeader title="校园经历" />
      {data.map((item, index) => {
        return (
          <div key={item.id}>
            <div className="h-[28px] leading-[28px] text-[var(--primary-color)] text-[16px] center">
              {'校园经历' + (index + 1)}
              {data.length > 1 && <DeleteOutlined className="ml-[6px]  hoverSlow" onClick={(e) => handleDelete(e, item.id)} />}
            </div>
            <SchoolExperience name={'schoolExperience' + item.id} formData={item} />
          </div>
        )
      })}
      <Button type="primary" className="my-[10px]" onClick={handleAdd}>
        添加经历
      </Button>
    </>
  )
})

export default SchoolExperienceList
