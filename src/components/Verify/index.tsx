/*
 * @Author: hqk
 * @Date: 2023-02-24 19:16:00
 * @LastEditors: hqk
 * @LastEditTime: 2023-02-25 11:07:28
 * @Description:
 */

import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react'
import type { ReactNode } from 'react'
import { Vertify } from '@alex_xu/react-slider-vertify'
import { message, Modal } from 'antd'
import classnames from 'classnames'

import { VerfiyWrapper } from './style'
import { useMemoizedFn } from 'ahooks'

interface IProps {
  children?: ReactNode
  onSuccess?: () => void
}

interface IHandler {
  handleModalOpen: () => void
}

const Verify = forwardRef<IHandler, IProps>((props, ref) => {
  const { onSuccess } = props
  const [visible, setVisible] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [isVerfiyFail, setIsVerifyFail] = useState(false)

  const handleCancel = useCallback(() => {
    setModalOpen(false)
  }, [])

  const handleVerifySuccess = useMemoizedFn(() => {
    onSuccess && onSuccess()
    setVisible(false)
    setModalOpen(false)
  })

  const handleModalOpen = useMemoizedFn(() => {
    setModalOpen(true)
    setVisible(true)
  })

  useImperativeHandle(ref, () => {
    return {
      handleModalOpen
    }
  })

  const handleVerifyFailure = useMemoizedFn(() => {
    //抖动效果
    setIsVerifyFail(true)
    messageApi.error({
      key: 'verify',
      content: '验证失败'
    })
    //重置抖动效果
    setTimeout(() => {
      setIsVerifyFail(false)
    }, 1000)
  })

  return (
    <VerfiyWrapper>
      {contextHolder}
      {modalOpen && (
        <Modal title="安全验证" centered footer={null} open={modalOpen} getContainer={false} onCancel={handleCancel}>
          <div className={classnames({ 'animate-head-shake': isVerfiyFail })}>
            <Vertify width={320} height={200} visible={visible} onSuccess={handleVerifySuccess} onFail={handleVerifyFailure} />
          </div>
        </Modal>
      )}
    </VerfiyWrapper>
  )
})

Verify.displayName = 'Verify'

export default memo(Verify)
