/*
 * @Author: hqk
 * @Date: 2023-02-25 13:33:52
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-30 20:28:16
 * @Description
 */
import { ElementRef, useContext, useEffect, useRef, useState } from 'react'
import { useCounter, useCreation, useMemoizedFn } from 'ahooks'
import { Form, message } from 'antd'
import Verify from '@/components/Verify'
import { useAppDispatch } from './useAppRedux'
import { checkPhoneAction, sendCodeAction } from '@/store/features/common'
import checkError from '@/utils/error'
import { changeLoginStatusAction, loginByPhoneAction, loginByResetPassword } from '@/store/features/login'
import { useNavigate } from 'react-router-dom'
import { registerChatUserAction } from '@/store'

export const useVerifyModal = () => {
  const verifyRef = useRef<ElementRef<typeof Verify>>(null)

  //打开验证框
  const handleOpen = useMemoizedFn(() => {
    verifyRef.current?.handleModalOpen()
  })

  return {
    verifyRef,
    handleOpen
  }
}

type verifyType = 'Phone' | 'resetPassword'

/**
 * @description:
 * @param {verifyType} type
 * @return
 * @return form, 表单
 * @return verifyRef, 验证组件对象
 * @return handleLogin, 登录
 * @return handleAgree, 是否同意协定
 * @return isDisabled, 是否禁用手机号
 * @return contextHolder, message占位符
 * @return isLoginFailure, 登录是否失败
 * @return current, 倒计时计数
 * @return isSendCode, 是否发送了验证码
 * @return handleSendCode: handleOpen, 处理发送验证码
 * @return handleVerfiySuccess 验证成功回调
 */
export const useVerify = (type: verifyType) => {
  const [isSendCode, setIsSendCode] = useState(false)
  const [isAgree, setIsAgree] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timer>()
  const [isLoginFailure, setIsLoginFailure] = useState(false)

  const navigate = useNavigate()

  const [form] = Form.useForm()
  const telephone = Form.useWatch('telephone', form)
  const [messageApi, contextHolder] = message.useMessage()

  const [current, { dec, reset }] = useCounter(60)

  const { handleOpen, verifyRef } = useVerifyModal()
  const dispatch = useAppDispatch()

  //是否同意协定
  const handleAgree = useMemoizedFn((agree: boolean) => {
    setIsAgree(agree)
  })

  //是否禁用发送验证码
  const isDisabled = useCreation(() => {
    return isSendCode || !telephone
  }, [isSendCode, telephone])

  //登录模块
  const handleLogin = useMemoizedFn(async () => {
    try {
      const values = await form.validateFields()
      if (!isSendCode) {
        messageApi.error({
          content: '请先发送验证码',
          key: 'not_send_code'
        })
        return
      }
      if (!isAgree) {
        messageApi.error({
          content: '请先勾选同意',
          key: 'not_agree'
        })
        return
      }
      let res = null
      if (type == 'Phone') {
        res = await dispatch(loginByPhoneAction(values)).unwrap()
      } else if (type == 'resetPassword') {
        res = await dispatch(loginByResetPassword(values)).unwrap()
      }
      if (checkError(res)) {
        setIsLoginFailure(true)
      }
      //登录成功
      const { id } = res!.data
      navigate('/main/home')
      dispatch(registerChatUserAction({ toId: id }))

      setTimeout(() => {
        setIsLoginFailure(false)
      }, 700)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  })

  //验证成功回调
  const handleVerfiySuccess = useMemoizedFn(async () => {
    const telephone = form.getFieldValue('telephone')
    const res = await dispatch(checkPhoneAction(telephone)).unwrap()
    if (res.success) {
      await dispatch(sendCodeAction(telephone))
      setIsSendCode(true)
      const tempTimer = setInterval(() => {
        dec()
      }, 1000)
      setTimer(tempTimer)
    }
  })

  //倒计时
  useEffect(() => {
    if (timer && current == 1) {
      clearInterval(timer)
      setTimer(undefined)
      //为了平缓过度
      setTimeout(() => {
        reset()
        setIsSendCode(false)
      }, 1000)
    }
  }, [current, timer])

  return {
    form, //表单
    verifyRef, //验证组件对象
    handleLogin, //登录
    handleAgree, //是否同意协定
    isDisabled, //是否禁用手机号
    contextHolder, //message占位符
    isLoginFailure, //登录是否失败
    current, //倒计时计数
    isSendCode, //是否发送了验证码
    handleSendCode: handleOpen, //处理发送验证码
    handleVerfiySuccess //验证成功回调
  }
}
