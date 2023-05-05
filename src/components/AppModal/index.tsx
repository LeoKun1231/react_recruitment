import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AppModalWrapper } from './style'
import { DeleteOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'

interface IProps {
  children?: ReactNode
  onDelete: () => void
  onClick: () => void
}

const AppModal: FC<IProps> = (props) => {
  const { children, onDelete, onClick } = props

  const handleDelete = useMemoizedFn((e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete && onDelete()
  })
  const handleClick = useMemoizedFn(() => {
    onClick && onClick()
  })

  return (
    <AppModalWrapper onClick={handleClick}>
      {children}
      <div className="mask">
        <DeleteOutlined onClick={handleDelete} />
      </div>
    </AppModalWrapper>
  )
}

export default memo(AppModal)
