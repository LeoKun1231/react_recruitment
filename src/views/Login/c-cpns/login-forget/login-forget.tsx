import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Form, Input, message } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

import Verify from '@/components/Verify'
import LoginAgree from '../login-agree/login-agree'
import { ForgetWrapper } from './style'
import { useAppDispatch } from '@/hooks/useAppRedux'
import { turnToForgetPasswordAction } from '@/store/features/login'
import { useVerify } from '@/hooks/useVerify'
import { useRulesConfig } from '../../config/rule.config'
import { useMemoizedFn } from 'ahooks'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const LoginForget: FC<IProps> = () => {
  //表单规则
  const { passwordRules, codeRules, phoneRules } = useRulesConfig()
  const {
    form,
    contextHolder,
    handleAgree,
    handleLogin,
    isDisabled,
    isLoginFailure,
    verifyRef,
    current,
    handleSendCode,
    handleVerfiySuccess,
    isSendCode
  } = useVerify('resetPassword')
  //去登录界面
  const dispatch = useAppDispatch()
  const goToLogin = useMemoizedFn(() => {
    dispatch(turnToForgetPasswordAction(false))
  })

  return (
    <ForgetWrapper className="animate-fade-in">
      {contextHolder}
      <div className="text-base text-center text-[var(--primary-color)] mb-[40px]">重置密码</div>
      <Form name="normal_login" form={form}>
        <Form.Item name="telephone" rules={phoneRules}>
          <Input placeholder="手机号码" />
        </Form.Item>
        <Form.Item>
          <Input.Group compact className="w-full">
            <Form.Item noStyle name="code" rules={codeRules}>
              <Input className="!w-[calc(100%-180px)]" placeholder="验证码" />
            </Form.Item>
            <Button type="primary" className="h-[50px] w-[180px]" disabled={isDisabled} onClick={handleSendCode}>
              {isSendCode ? `重新发送(${current})` : '发送验证码'}
            </Button>
          </Input.Group>
        </Form.Item>

        <Form.Item name="password" rules={passwordRules}>
          <Input.Password
            type="password"
            placeholder="设置6-16位字母和数字组合"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          className={classNames({ 'w-full h-[56px] text-lg my-[10px]': true, 'animate-shake-x': isLoginFailure })}
          onClick={handleLogin}>
          登录
        </Button>
        <LoginAgree onAgree={handleAgree} />

        <div className="center mt-[24px]">
          我有账号？
          <span className="text-[var(--primary-color)] cursor-pointer" onClick={goToLogin}>
            立即登录
          </span>
        </div>
        <Verify ref={verifyRef} onSuccess={handleVerfiySuccess} />
      </Form>
    </ForgetWrapper>
  )
}

export default memo(LoginForget)
