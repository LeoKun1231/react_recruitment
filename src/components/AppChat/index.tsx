/*
 * @Author: hqk
 * @Date: 2023-05-05 13:17:38
 * @LastEditors: hqk
 * @LastEditTime: 2023-05-07 16:43:34
 * @Description:
 */
import React, { useEffect, memo, useState, forwardRef, useImperativeHandle } from 'react'
import type { FC, ReactNode } from 'react'
import { TUIKit } from 'hqk-leo-chat-uikit-react/src/index'
import TIM, { ChatSDK } from 'tim-js-sdk/tim-js-friendship'
import { AppChatWrapper } from './style'

import store, { registerChatUserAction, saveChatRecordAction } from '@/store'
import { Modal } from 'antd'
import { useAppDispatch } from '@/hooks/useAppRedux'

interface IProps {
  children?: ReactNode
  tim: ChatSDK
}

interface IHandler {
  show: () => void
}

const AppChat: FC<IProps> = memo((props) => {
  const { tim } = props
  console.log(tim, '==========')
  return (
    <AppChatWrapper>
      <div style={{ height: '100%', width: '100%' }} className="aa">
        <TUIKit tim={tim}></TUIKit>
      </div>
    </AppChatWrapper>
  )
})

const AppChatModal = forwardRef<IHandler, IProps>((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        show() {
          setIsModalOpen(true)
        }
      }
    },
    []
  )

  return (
    <Modal
      destroyOnClose={false}
      footer={null}
      width={1200}
      rootClassName="chat-modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}>
      <AppChat {...props} />
    </Modal>
  )
})

export default memo(AppChatModal)
