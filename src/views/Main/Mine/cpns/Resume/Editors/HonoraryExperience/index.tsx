/*
 * @Author: hqk
 * @Date: 2023-03-18 16:34:51
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-19 23:58:29
 * @Description:
 */
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { HonoraryExperienceWrapper } from './style'
import { DatePicker, Form, Input, Button } from 'antd'
import { formatStringToDayjs } from '@/utils/date'
import { IHonoray } from '@/types/home/resume'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { changeHonoraryExperienceAction } from '@/store/features/resume'
import { v4 as uuidv4 } from 'uuid'
import { DeleteOutlined } from '@ant-design/icons'
import AppSectionHeader from '@/components/AppSectionHeader'
import { useMemoizedFn } from 'ahooks'

interface IProps {
  children?: ReactNode
  name: string
  formData: IHonoray
}

const HonoraryExperience = memo<IProps>((props) => {
  const { name, formData } = props
  const [form] = Form.useForm()

  const { data } = useAppSelector((state) => {
    return {
      data: state.resume.honoray
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
    dispatch(changeHonoraryExperienceAction(newArr))
  })
  useEffect(() => {
    form.setFieldsValue(formData)
    form.setFieldValue('awardTime', formatStringToDayjs('2012-01'))
  }, [])
  return (
    <HonoraryExperienceWrapper>
      <Form form={form} name={'form' + name} layout="vertical" autoComplete="off" onChange={handleChange}>
        <Form.Item label="奖项名称：" name="awardName">
          <Input placeholder="如：国家励志奖学金" />
        </Form.Item>
        <Form.Item label="获得时间：" name="awardTime">
          <DatePicker picker="month" className="w-full" onChange={handleChange} />
        </Form.Item>
      </Form>
    </HonoraryExperienceWrapper>
  )
})
const HonoraryExperienceList = memo(() => {
  const { data } = useAppSelector((state) => {
    return {
      data: state.resume.honoray
    }
  }, useAppShallowEqual)

  const dispatch = useAppDispatch()
  const handleAdd = useMemoizedFn(() => {
    dispatch(
      changeHonoraryExperienceAction([
        ...data,
        {
          id: uuidv4(),
          awardName: '国家奖学金',
          awardTime: '2014-01'
        }
      ])
    )
  })
  const handleDelete = (e: React.MouseEvent, id: string) => {
    const newArr = data.filter((item) => item.id != id)
    dispatch(changeHonoraryExperienceAction(newArr))
  }

  return (
    <>
      <AppSectionHeader title="荣誉经历" />
      {data.map((item, index) => {
        return (
          <div key={item.id}>
            <div className="h-[28px] leading-[28px] text-[var(--primary-color)] text-[16px] center">
              {'荣誉经历' + (index + 1)}
              {data.length > 1 && <DeleteOutlined className="ml-[6px]  hoverSlow" onClick={(e) => handleDelete(e, item.id)} />}
            </div>
            <HonoraryExperience name={'honorary' + item.id} formData={item} />
          </div>
        )
      })}
      <Button type="primary" className="my-[10px]" onClick={handleAdd}>
        添加经历
      </Button>
    </>
  )
})

export default HonoraryExperienceList

// export default AppAddMore(HonoraryExperience, {
//   title: '荣誉奖项',
//   AddObj: {
//     awardName: '国家奖学金',
//     awardTime: formatStringToDayjs('2014-01')
//   },
//   initialState: [
//     {
//       awardName: '国家奖学金',
//       awardTime: formatStringToDayjs('2014-01')
//     }
//   ],
//   btnText: '奖项/证书'
// })
