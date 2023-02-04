import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import AboutWrapper from './style'

interface IProps {
  children?: ReactNode
}

const About: FC<IProps> = () => {
  return <AboutWrapper>About</AboutWrapper>
}

export default memo(About)
