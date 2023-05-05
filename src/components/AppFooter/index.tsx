/*
 * @Author: hqk
 * @Date: 2023-03-04 14:36:38
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-15 10:54:20
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { FooterWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const AppFooter: FC<IProps> = () => {
  return (
    <FooterWrapper>
      <div className="header">
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(0, 122, 255,0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(0, 122, 255,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(0, 122, 255,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(24, 144, 255)" />
          </g>
        </svg>
      </div>
    </FooterWrapper>
  )
}

export default memo(AppFooter)
