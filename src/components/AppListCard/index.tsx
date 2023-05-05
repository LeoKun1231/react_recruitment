import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'

import classNames from 'classnames'
import { ListCardWrapper } from './style'
import { ReloadOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'

interface IProps {
  children?: ReactNode
  title: string
  className?: string
  onReload: () => void
}

const AppListCard: FC<IProps> = ({ title, onReload, children, className }) => {
  const [isLoading, setIsLoading] = useState(false)

  const onLoad = useMemoizedFn(() => {
    setIsLoading(true)
    onReload()
    let timer = null
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
  })
  return (
    <ListCardWrapper>
      <div className={classNames({ 'title between text-[18px] h-[30px] border pb-[10px]': true }, className)}>
        <div className="font-600">{title}</div>
        <div className=" text-[var(--primary-color)] hover:opacity-70 hover:cursor-pointer center" onClick={onLoad}>
          <ReloadOutlined className={classNames({ rotate: isLoading }, 'text-[18px]')} />
          <div className="ml-[6px] text-[14px]">换一批</div>
        </div>
      </div>
      <div className="list">{children}</div>
    </ListCardWrapper>
  )
}

export default memo(AppListCard)
