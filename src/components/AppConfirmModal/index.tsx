/*
 * @Author: hqk
 * @Date: 2023-03-31 15:08:01
 * @LastEditors: leo
 * @LastEditTime: 2023-05-24 20:00:22
 * @Description:
 */
import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { AppConfirmModalWrapper } from './style'
import { Modal } from 'antd'
import { useMemoizedFn } from 'ahooks'
interface IProps {
  children?: ReactNode
  title: ReactNode
  onConfirm: () => Promise<any>
  disabled?: boolean
  onCancel?: () => void
}

interface IHandler {
  show: () => void
}

const AppConfirmModal = forwardRef<IHandler, IProps>((props, ref) => {
  const { children, title, onConfirm, disabled, onCancel } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleOk = useMemoizedFn(() => {
    setConfirmLoading(true)
    onConfirm &&
      onConfirm()
        .then(() => {
          setConfirmLoading(false)
          setIsModalOpen(false)
        })
        .catch(() => {
          setConfirmLoading(false)
        })
  })

  const handleCancel = useMemoizedFn(() => {
    onCancel && onCancel()
    setIsModalOpen(false)
  })

  useImperativeHandle(
    ref,
    useMemoizedFn(() => {
      return {
        show() {
          setIsModalOpen(true)
        }
      }
    }),
    []
  )

  return (
    <AppConfirmModalWrapper>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        okText={confirmLoading ? '加载中' : '确认'}
        destroyOnClose
        okButtonProps={{ disabled }}>
        {children}
      </Modal>
    </AppConfirmModalWrapper>
  )
})

export default memo(AppConfirmModal)
