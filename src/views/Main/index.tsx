/*
 * @Author: hqk
 * @Date: 2023-02-03 20:24:33
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-23 12:28:53
 * @Description:
 */
import React, { ElementRef, memo, Suspense, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import { Spin, FloatButton, Modal, Badge } from 'antd'
import { MessageOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import AppChat from '@/components/AppChat'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import TIM, { ChatSDK } from 'tim-js-sdk/tim-js-friendship'
import store, { changeAppChatShowAction } from '@/store'
import { genTestUserSig, SDKAPPID } from '@/utils/chat/GenerateTestUserSig'
import TIMUploadPlugin from 'tim-upload-plugin'
import AppRoleControl from '@/components/AppRoleControl'
import { ROLECODE } from '@/constant'
import { TimContext } from '@/Context'

interface IProps {
  children?: ReactNode
}

const init = async (): Promise<ChatSDK> => {
  return new Promise((resolve, reject) => {
    const tim = TIM.create({ SDKAppID: SDKAPPID })
    tim?.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin })
    const onReady = () => {
      resolve(tim)
    }
    tim.setLogLevel(4)
    tim.on(TIM.EVENT.SDK_READY, onReady)
    tim.login({
      userID: store.getState().login.loginUser.id + '',
      userSig: genTestUserSig(store.getState().login.loginUser.id + '').userSig
    })
  })
}

const Home: FC<IProps> = () => {
  const appChatRef = useRef<ElementRef<typeof AppChat>>(null)
  const [toId, setToId] = useState(0)
  const [jobId, setJobId] = useState('')
  const [jobName, setJobName] = useState('')
  const [userId, setUserId] = useState(0)
  const [unReadCount, setUnReadCount] = useState(0)

  const [tim, setTim] = useState<ChatSDK>()

  const dispatch = useAppDispatch()

  const loadData = async () => {
    const tim = await init()
    setTim(tim)
  }

  const { jobInfo, isShowChat, roleId } = useAppSelector((state) => {
    return {
      jobInfo: state.common.jobInfo,
      nickName: state.login.loginUser.nickName,
      userName: state.login.loginUser.userName,
      roleId: state.login.loginUser.roleId,
      isShowChat: state.home.isShowChat
    }
  }, useAppShallowEqual)

  useEffect(() => {
    if (roleId == ROLECODE.HR || ROLECODE.STUDENT == roleId) {
      loadData()
    }
    return () => {
      tim?.logout()
      tim?.destroy()
    }
  }, [roleId])

  const handleClick = useMemoizedFn(() => {
    appChatRef.current?.show()
  })

  useEffect(() => {
    let timer: any = null
    if (tim) {
      setInterval(() => {
        if (timer) clearInterval(timer)
        timer = setUnReadCount(tim.getTotalUnreadMessageCount())
      }, 1000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [tim])

  useEffect(() => {
    if (isShowChat) {
      appChatRef.current?.show()
      setTimeout(() => {
        dispatch(changeAppChatShowAction(false))
      }, 1000)
    }
  }, [isShowChat])

  return (
    <div className="min-h-100% flex flex-col relative ">
      <AppHeader />
      <div className="pt-[60px] flex-1 pb-[150px] ">
        <TimContext.Provider value={tim}>
          <Suspense
            fallback={
              <Spin
                className="center [&>:nth-child(1)]:w-[64px] [&>:nth-child(1)]:h-[64px]"
                style={{
                  height: '100vh',
                  position: 'fixed',
                  width: '100vw'
                }}
              />
            }>
            <Outlet />
          </Suspense>
        </TimContext.Provider>
      </div>
      <AppFooter />
      <FloatButton.Group style={{ right: 94 }}>
        <FloatButton.BackTop />
        <AppRoleControl code={[ROLECODE.HR, ROLECODE.STUDENT]}>
          <Badge count={unReadCount}>
            <FloatButton icon={<MessageOutlined />} onClick={handleClick} />
          </Badge>
        </AppRoleControl>
        <AppChat ref={appChatRef} tim={tim!} />
      </FloatButton.Group>
    </div>
  )
}

export default memo(Home)
