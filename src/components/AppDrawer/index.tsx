/*
 * @Author: hqk
 * @Date: 2023-03-30 21:24:26
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-29 21:38:36
 * @Description:
 */
import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import type { ReactNode } from 'react'
import { AppDrawerWrapper } from './style'
import { Button, Drawer, Space } from 'antd'
import { useMemoizedFn } from 'ahooks'

interface IProps {
  children?: ReactNode
  className?: string
  title?: string
  destroyOnClose?: boolean
  height?: number | string
  width?: number | string
  isShowExtra?: boolean
  okText?: string
  cancelText?: string
  placement?: 'top' | 'right' | 'bottom' | 'left'
  noLogicCancel?: boolean
  onConfirm?: () => Promise<any>
  onCancel?: () => Promise<any>
}

interface IHandler {
  showDrawer: () => void
  close: () => void
}

const AppDrawer = forwardRef<IHandler, IProps>((props, ref) => {
  const {
    children,
    className,
    title,
    onConfirm,
    destroyOnClose,
    isShowExtra,
    placement,
    height,
    okText,
    onCancel,
    cancelText,
    width,
    noLogicCancel
  } = props
  const [open, setOpen] = useState(false)
  const [isLoading, setIsloading] = useState(false)

  useImperativeHandle(
    ref,
    useMemoizedFn(() => {
      return {
        showDrawer() {
          setOpen(true)
        },
        close() {
          setOpen(false)
        }
      }
    }),
    []
  )
  const handleSubmitSuccess = useMemoizedFn(() => {
    setIsloading(true)
    onConfirm &&
      onConfirm()
        .then(() => {
          setIsloading(false)
          setOpen(false)
        })
        .catch(() => {
          setIsloading(false)
        })
  })

  const onClose = useMemoizedFn(() => {
    if (onCancel) {
      setIsloading(true)
      onCancel()
        .then(() => {
          setIsloading(false)
        })
        .catch(() => {
          setIsloading(false)
        })
    } else {
      setOpen(false)
    }
  })

  const closeNoLogin = useMemoizedFn(() => {
    setOpen(false)
  })

  return (
    <AppDrawerWrapper className={className}>
      <Drawer
        title={title}
        width={width ?? 720}
        height={height}
        placement={placement}
        onClose={!noLogicCancel ? onClose : closeNoLogin}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose={destroyOnClose}
        extra={
          isShowExtra && (
            <Space>
              <Button onClick={onClose}>{cancelText}</Button>
              <Button onClick={handleSubmitSuccess} type="primary" loading={isLoading}>
                {okText}
              </Button>
            </Space>
          )
        }>
        {children}
      </Drawer>
    </AppDrawerWrapper>
  )
})

AppDrawer.defaultProps = {
  isShowExtra: true,
  placement: 'right',
  okText: '提交',
  cancelText: '取消',
  noLogicCancel: false
}

export default memo(AppDrawer)
