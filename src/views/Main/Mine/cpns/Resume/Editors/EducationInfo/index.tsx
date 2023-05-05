/*
 * @Author: hqk
 * @Date: 2023-03-16 19:11:15
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-19 19:32:21
 * @Description:
 */
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { EducationInfoWrapper } from './style'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import AppSectionEditor from '@/components/AppSectionEditor'
import { useMemoizedFn } from 'ahooks'
import { IEducationInfo } from '@/types/home/resume'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { formatStringToDayjs } from '@/utils/date'
import { changeEducationInfoAction } from '@/store/features/resume'
import { v4 as uuidv4 } from 'uuid'
import { DeleteOutlined } from '@ant-design/icons'
import AppSectionHeader from '@/components/AppSectionHeader'

interface IProps {
  children?: ReactNode
  name: string
  formData: IEducationInfo
}

const EducationInfo: FC<IProps> = memo((props) => {
  const { name, formData } = props
  const [form] = Form.useForm()

  const dispatch = useAppDispatch()
  const getEditorHtmlAndText = useMemoizedFn((html: string, text: string) => {
    const newArr = data.map((item) => {
      if (item.id == formData.id) {
        return { ...item, formText: { value: html } }
      } else {
        return item
      }
    })
    dispatch(changeEducationInfoAction(newArr))
  })
  const { data } = useAppSelector((state) => {
    return {
      data: state.resume.educationInfo
    }
  }, useAppShallowEqual)

  useEffect(() => {
    form.setFieldsValue(formData)
    form.setFieldValue('schoolTime', [formatStringToDayjs('2012-01'), formatStringToDayjs('2012-05')])
  }, [])

  const handleChange = useMemoizedFn(() => {
    const newArr = data.map((item) => {
      if (item.id == formData.id) {
        console.log(form.getFieldsValue())
        return { ...item, ...form.getFieldsValue() }
      } else {
        return item
      }
    })
    dispatch(changeEducationInfoAction(newArr))
  })

  return (
    <EducationInfoWrapper>
      <Form form={form} name={name} layout="vertical" autoComplete="off" onChange={handleChange}>
        <Form.Item label="学校：" name="schoolName">
          <Input placeholder="如：清华大学" />
        </Form.Item>
        <Form.Item label="城市：" name="schoolCity">
          <Input placeholder="如：北京" />
        </Form.Item>
        <div className="between">
          <Form.Item label="专业：" name="majorName">
            <Input placeholder="如：计算机科学与技术" />
          </Form.Item>
          <Form.Item label="学历：" name="educationBackground">
            <Select placeholder="请选择学历" allowClear style={{ width: '183px' }} onChange={handleChange}>
              <Select.Option value="大专">大专</Select.Option>
              <Select.Option value="本科">本科</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <Form.Item label="在读时间：" name="schoolTime">
          <DatePicker.RangePicker picker="month" className="w-full" onChange={handleChange} />
        </Form.Item>
        <div className="mb-[8px]">其他：</div>
        <AppSectionEditor getEdtiorHtml={getEditorHtmlAndText} value={formData.formText.value} />
      </Form>
    </EducationInfoWrapper>
  )
})

const EducationInfoList = memo((props) => {
  const { data } = useAppSelector((state) => {
    return {
      data: state.resume.educationInfo
    }
  }, useAppShallowEqual)

  const dispatch = useAppDispatch()
  const handleAdd = useMemoizedFn(() => {
    dispatch(
      changeEducationInfoAction([
        ...data,
        {
          id: uuidv4(),
          schoolName: '清华大学',
          majorName: '计算机科学与技术',
          educationBackground: '本科',
          schoolCity: '北京',
          schoolTime: ['2012-01', '2012-05'],
          formText: {
            value: '222222222222222222222'
          }
        }
      ])
    )
  })
  const handleDelete = (e: React.MouseEvent, id: string) => {
    const newArr = data.filter((item) => item.id != id)
    dispatch(changeEducationInfoAction(newArr))
  }

  return (
    <>
      <AppSectionHeader title="教育经历" />
      {data.map((item, index) => {
        return (
          <div key={item.id}>
            <div className="h-[28px] leading-[28px] text-[var(--primary-color)] text-[16px] center">
              {'教育经历' + (index + 1)}
              {data.length > 1 && <DeleteOutlined className="ml-[6px]  hoverSlow" onClick={(e) => handleDelete(e, item.id)} />}
            </div>
            <EducationInfo name={'education' + item.id} formData={item} />
          </div>
        )
      })}
      <Button type="primary" className="my-[10px]" onClick={handleAdd}>
        添加经历
      </Button>
    </>
  )
})

export default EducationInfoList
