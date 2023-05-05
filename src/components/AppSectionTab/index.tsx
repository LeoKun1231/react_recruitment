/*
 * @Author: hqk
 * @Date: 2023-04-12 21:52:33
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-12 21:53:01
 * @Description:
 */
import classNames from 'classnames'
import React, { FC, MouseEvent, memo, useState } from 'react'
import { TabsWrapper } from './style'
import AppScrollView from '../AppScrollView'
import { useMemoizedFn } from 'ahooks'

interface IProps {
  tabNames: any[]
  customClass?: string
  tabClick: (index: number, item: string) => void
}

const SectionTabs: FC<IProps> = (props) => {
  const { tabNames = [], tabClick, customClass } = props
  const [currentIndex, setCurrentIndex] = useState(0)

  const itemClickHandle = useMemoizedFn((e: MouseEvent, index: number, item: string) => {
    e.stopPropagation()
    setCurrentIndex(index)
    tabClick(index, item)
  })

  return (
    <TabsWrapper className={classNames({ 'center !w-full !mx-20px pb-10px border': true }, [customClass])}>
      <AppScrollView className="!w-full">
        {tabNames.map((item, index) => {
          return (
            <div
              key={index}
              className={classNames('item', { active: index === currentIndex })}
              onClick={(e) => itemClickHandle(e, index, item)}>
              {item}
            </div>
          )
        })}
      </AppScrollView>
    </TabsWrapper>
  )
}

export default memo(SectionTabs)
