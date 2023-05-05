/*
 * @Author: hqk
 * @Date: 2023-03-17 19:52:28
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-19 20:47:02
 * @Description:
 */
import React, { memo, useEffect, useState, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { CompanyExperienceWrapper } from './style'
import { DatePicker, Form, Input, Button } from 'antd'
import AppSectionEditor from '@/components/AppSectionEditor'
import { useMemoizedFn } from 'ahooks'
import { formatStringToDayjs } from '@/utils/date'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { changeCompanyExperienceAction, changeEducationInfoAction } from '@/store/features/resume'
import { v4 as uuidv4 } from 'uuid'
import { DeleteOutlined } from '@ant-design/icons'
import AppSectionHeader from '@/components/AppSectionHeader'
import { ICompanyExperience } from '@/types/home/resume'
interface IProps {
  children?: ReactNode
  name: string
  formData: ICompanyExperience
}

const initialState = [
  {
    id: 1,
    companyName: '美图',
    jobName: 'HR1',
    department: '人力资源部1',
    companyCity: '福州1',
    workTime: [formatStringToDayjs('2012-01'), formatStringToDayjs('2012-05')],
    formText: {
      value: '11111111111111111'
    }
  },
  {
    id: 2,
    companyName: '百度',
    jobName: 'HR2',
    department: '人力资源部2',
    companyCity: '福州2',
    workTime: [formatStringToDayjs('2013-01'), formatStringToDayjs('2013-05')],
    formText: {
      value: '222222222222222222'
    }
  },
  {
    id: 3,
    companyName: '腾讯',
    jobName: 'HR3',
    department: '人力资源部3',
    companyCity: '福州3',
    workTime: [formatStringToDayjs('2014-01'), formatStringToDayjs('2014-05')],
    formText: {
      value: '333333333333333333333'
    }
  }
]

const AddObj = {
  companyName: '美图',
  jobName: 'HR',
  department: '人力资源部',
  companyCity: '福州',
  workTime: [formatStringToDayjs('2012-01'), formatStringToDayjs('2012-05')],
  formText: {
    value: '11111111111111111'
  }
}

const CompanyExperience = memo<IProps>((props) => {
  const { name, formData } = props
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  const { data } = useAppSelector((state) => {
    return {
      data: state.resume.companyExperience
    }
  }, useAppShallowEqual)

  const getEditorHtmlAndText = useMemoizedFn((html: string, text: string) => {
    const newArr = data.map((item) => {
      if (item.id == formData.id) {
        return { ...item, formText: { value: html } }
      } else {
        return item
      }
    })
    dispatch(changeCompanyExperienceAction(newArr))
  })
  useEffect(() => {
    form.setFieldsValue(formData)
    form.setFieldValue('workTime', [formatStringToDayjs('2012-01'), formatStringToDayjs('2012-05')])
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
    dispatch(changeCompanyExperienceAction(newArr))
  })

  return (
    <CompanyExperienceWrapper>
      <Form form={form} name={'form' + name} layout="vertical" autoComplete="off" onChange={handleChange}>
        <Form.Item label="公司名称：" name="companyName">
          <Input placeholder="如：美团" />
        </Form.Item>
        <Form.Item label="职位名称：" name="jobName">
          <Input placeholder="如：HR" />
        </Form.Item>
        <div className="between">
          <Form.Item label="所在部门：" name="department">
            <Input placeholder="如：人力资源部" />
          </Form.Item>
          <Form.Item label="所在城市：" name="companyCity">
            <Input placeholder="如：福州" />
          </Form.Item>
        </div>
        <Form.Item label="工作时间：" name="workTime">
          <DatePicker.RangePicker picker="month" className="w-full" onChange={handleChange} />
        </Form.Item>
        <div className="mb-[8px]">经历描述：</div>
        <AppSectionEditor getEdtiorHtml={getEditorHtmlAndText} value={formData.formText.value} />
      </Form>
    </CompanyExperienceWrapper>
  )
})

const CompanyExperienceList = memo((props) => {
  const { data } = useAppSelector((state) => {
    return {
      data: state.resume.companyExperience
    }
  }, useAppShallowEqual)

  const dispatch = useAppDispatch()
  const handleAdd = useMemoizedFn(() => {
    dispatch(
      changeCompanyExperienceAction([
        ...data,
        {
          id: uuidv4(),
          companyName: '美图',
          jobName: 'HR',
          department: '人力资源部',
          companyCity: '福州',
          workTime: ['2012-01', '2012-05'],
          formText: {
            value: '11111111111111111'
          }
        }
      ])
    )
  })
  const handleDelete = (e: React.MouseEvent, id: string) => {
    const newArr = data.filter((item) => item.id != id)
    dispatch(changeCompanyExperienceAction(newArr))
  }

  return (
    <>
      <AppSectionHeader title="公司经历" />
      {data.map((item, index) => {
        return (
          <div key={item.id}>
            <div className="h-[28px] leading-[28px] text-[var(--primary-color)] text-[16px] center">
              {'公司经历' + (index + 1)}
              {data.length > 1 && <DeleteOutlined className="ml-[6px]  hoverSlow" onClick={(e) => handleDelete(e, item.id)} />}
            </div>
            <CompanyExperience name={'company' + item.id} formData={item} />
          </div>
        )
      })}
      <Button type="primary" className="my-[10px]" onClick={handleAdd}>
        添加经历
      </Button>
    </>
  )
})

export default CompanyExperienceList
