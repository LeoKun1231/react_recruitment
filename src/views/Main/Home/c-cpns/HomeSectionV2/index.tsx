/*
 * @Author: hqk
 * @Date: 2023-04-12 21:37:25
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-12 22:48:21
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HomeSectionV2Wrapper } from './style'
import AppSectionTab from '@/components/AppSectionTab'
import HomeSection from '../HomeSection'

interface IProps {
  children?: ReactNode
  title: string
  tabNames: string[]
  tabClick: (index: number, item: string) => void
  data: any
  count: number
  onMore: () => void
  renderItem: (item: any) => ReactNode
}

const HomeSectionV2: FC<IProps> = (props) => {
  const { title, tabNames, tabClick, data, count, onMore, renderItem } = props

  return (
    <HomeSectionV2Wrapper>
      <h1 className="text-center mb-[30px]">{title}</h1>
      <AppSectionTab tabNames={tabNames} tabClick={tabClick} />
      <HomeSection className="mt-16px" data={data} count={count} onMore={onMore} renderItem={renderItem} />
    </HomeSectionV2Wrapper>
  )
}

export default memo(HomeSectionV2)
