/*
 * @Author: hqk
 * @Date: 2023-02-24 10:41:08
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-06 11:20:11
 * @Description:
 */
import Verify from '@/components/Verify'
import { useAppDispatch } from '@/hooks/useAppRedux'
import { useVerifyModal } from '@/hooks/useVerify'
import { registerChatUserAction } from '@/store'
import { loginByAccountAction, turnToForgetPasswordAction } from '@/store/features/login'
import checkError from '@/utils/error'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useLocalStorageState, useMemoizedFn } from 'ahooks'
import { Button, Checkbox, Form, Input, message } from 'antd'
import classNames from 'classnames'
import type { FC, ReactNode } from 'react'
import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginAgree from '../login-agree/login-agree'
import { AccountWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const LoginAccount: FC<IProps> = () => {
  const [checked, setChecked] = useLocalStorageState<boolean>('account-checked')
  const [account, setAccount] = useLocalStorageState<string>('account', { defaultValue: '123456' })
  const [password, setPassword] = useLocalStorageState<string>('account-password', { defaultValue: '123456' })

  const dispatch = useAppDispatch()
  const [isAgree, setIsAgree] = useState(false)
  const [isLoginFailure, setIsLoginFailure] = useState(false)

  const navigate = useNavigate()

  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const { verifyRef, handleOpen } = useVerifyModal()

  //是否同意协议
  const onAgree = useMemoizedFn((agree: boolean) => {
    setIsAgree(agree)
  })

  //前往忘记密码模块
  const onForgetPassword = useMemoizedFn((e: any) => {
    e.preventDefault()
    dispatch(turnToForgetPasswordAction(true))
  })

  const handleLogin = useMemoizedFn(async () => {
    try {
      const values = await form.validateFields()

      if (!isAgree) {
        messageApi.error({
          content: '请先勾选同意',
          key: 'not_agree'
        })
        return
      }
      handleOpen()
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  })

  const handleVerifySuccess = useMemoizedFn(async () => {
    const values = await form.validateFields()

    if (checked) {
      setAccount(form.getFieldValue('account'))
      setPassword(form.getFieldValue('password'))
    } else {
      setPassword('')
      setAccount('')
    }

    const res = await dispatch(loginByAccountAction(values)).unwrap()
    if (checkError(res) || !res.data.token) {
      setIsLoginFailure(true)
      messageApi.error({
        content: '登录失败'
      })
      return
    }
    const { id } = res.data
    dispatch(registerChatUserAction({ toId: id }))
    navigate('/main/home')
    setTimeout(() => {
      setIsLoginFailure(false)
    }, 700)
  })

  const handleCheckBox = useMemoizedFn((e) => {
    setChecked(e.target.checked)
  })

  useEffect(() => {
    form.setFieldsValue({ password, account })
  }, [password, account])

  return (
    <AccountWrapper>
      {contextHolder}
      <Form name="normal_login" form={form}>
        <Form.Item name="account" rules={[{ required: true, message: '请输入帐号' }]}>
          <Input placeholder="帐号" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password
            type="password"
            placeholder="密码"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <div className="flex justify-between items-center mt-16px ">
          <Checkbox checked={checked} onChange={handleCheckBox}>
            记住密码
          </Checkbox>
          <a onClick={onForgetPassword}>忘记密码</a>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          className={classNames({ 'animate-shake-x': isLoginFailure, 'w-full h-[56px] text-lg my-[10px]': true })}
          onClick={handleLogin}>
          登录
        </Button>
        <LoginAgree onAgree={onAgree} />
      </Form>
      <Verify ref={verifyRef} onSuccess={handleVerifySuccess} />
    </AccountWrapper>
  )
}

export default memo(LoginAccount)
