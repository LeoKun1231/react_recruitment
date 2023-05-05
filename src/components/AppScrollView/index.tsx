/*
 * @Author: hqk
 * @Date: 2023-03-06 16:31:51
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-14 10:31:09
 * @Description:
 */
import React, { FC, MouseEvent, memo, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { ViewWrapper } from './style'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
interface IProps {
  children?: ReactNode
  className?: string
  width?: number
}

const ScrollView: FC<IProps> = (props) => {
  const { className, width } = props
  /** 定义内部的状态 */
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)
  const [posIndex, setPosIndex] = useState(0)
  const totalDistanceRef = useRef(0)

  /** 组件渲染完毕, 判断是否显示右侧的按钮 */
  const scrollContentRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const scrollWidth = scrollContentRef.current?.scrollWidth as any // 一共可以滚动的宽度
    const clientWidth = scrollContentRef.current?.clientWidth as any // 本身占据的宽度
    const totalDistance = scrollWidth - clientWidth
    totalDistanceRef.current = totalDistance
    if (scrollContentRef.current) {
      const newIndex = posIndex + 1
      const newEl = scrollContentRef.current?.children[newIndex] as any
      const newOffsetLeft = newEl?.offsetLeft
      setShowRight(totalDistance > newOffsetLeft - (width ? width : 120))
    }
  }, [props.children])

  /** 事件处理的逻辑 */
  const controlClickHandle = useMemoizedFn((e: MouseEvent, isRight: boolean) => {
    e.preventDefault()
    if (scrollContentRef.current) {
      const newIndex = isRight ? posIndex + 1 : posIndex - 1
      const newEl = scrollContentRef.current?.children[newIndex] as any
      const newOffsetLeft = newEl.offsetLeft
      scrollContentRef.current.style.transform = `translate(-${newOffsetLeft}px)`
      setPosIndex(newIndex)
      // 是否继续显示右侧的按钮
      setShowRight(totalDistanceRef.current > newOffsetLeft)
      setShowLeft(newOffsetLeft > 0)
    }
  })

  return (
    <ViewWrapper className={className}>
      {showLeft && (
        <div className="control left" onClick={(e) => controlClickHandle(e, false)}>
          <CaretLeftOutlined />
        </div>
      )}
      {showRight && (
        <div className="control right" onClick={(e) => controlClickHandle(e, true)}>
          <CaretRightOutlined />
        </div>
      )}

      <div className="scroll">
        <div className="scroll-content [&>div]:mr-[8px] [&>div]:flex-shrink-0 " ref={scrollContentRef}>
          {props.children}
        </div>
      </div>
    </ViewWrapper>
  )
}

export default memo(ScrollView)
