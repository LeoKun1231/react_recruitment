/*
 * @Author: hqk
 * @Date: 2023-03-02 12:25:28
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-02 21:08:36
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
  icon: FC<{ className?: string }>
  text: string | number
  onClick?: () => void
  isClick?: boolean
  className?: string
}

const IconText: FC<IProps> = ({ icon: Icon, text, onClick, isClick, className }) => {
  return (
    <div className="flex items-center mr-3 hover:cursor-pointer hover:text-[var(--primary-color)]" onClick={onClick}>
      <Icon className={className} />
      <div className={classNames({ 'mx-1': true, 'text-[var(--primary-color)]': isClick })}>{text}</div>
    </div>
  )
}

export default memo(IconText)
