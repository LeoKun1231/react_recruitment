/*
 * @Author: hqk
 * @Date: 2023-03-17 19:26:20
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-20 15:55:26
 * @Description:
 */
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { CustomInfoWrapper } from './style'
import AppSectionEditor from '@/components/AppSectionEditor'
import { useMemoizedFn } from 'ahooks'
import AppSectionHeader from '@/components/AppSectionHeader'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { changeCustomListAction } from '@/store/features/resume'

interface IProps {
  children?: ReactNode
  title: string
  id: string
}

const CustomInfo: FC<IProps> = (props) => {
  const { title, id } = props
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')
  const { data } = useAppSelector((state) => {
    return {
      data: state.resume.customList
    }
  }, useAppShallowEqual)
  const getHtmlAndText = useMemoizedFn((html: string, text: string) => {
    const newArr = data.map((item) => {
      if (item.id == id) {
        return { ...item, text: html }
      } else {
        return item
      }
    })
    dispatch(changeCustomListAction(newArr as any))
  })

  useEffect(() => {
    setValue(data.find((item) => item.id == id)?.text as any)
  }, [data, id])

  return (
    <CustomInfoWrapper>
      <AppSectionHeader title={title} />
      <AppSectionEditor getEdtiorHtml={getHtmlAndText} value={value!} />
    </CustomInfoWrapper>
  )
}

export default memo(CustomInfo)
