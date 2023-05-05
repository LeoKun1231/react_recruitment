/*
 * @Author: hqk
 * @Date: 2023-03-16 12:05:36
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-16 19:14:34
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { SectionHeaderWrapper } from './style'
import { Button } from 'antd'
import { SaveOutlined } from '@ant-design/icons'

interface IProps {
  children?: ReactNode
  title: string
}

const AppSectionHeader: FC<IProps> = (props) => {
  const { title } = props
  return (
    <SectionHeaderWrapper>
      <div className="text-center flex-1">{title}</div>
    </SectionHeaderWrapper>
  )
}

export default memo(AppSectionHeader)
