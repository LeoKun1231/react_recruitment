/*
 * @Author: hqk
 * @Date: 2023-02-24 10:40:44
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-17 17:00:55
 * @Description:
 */
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { PhoneWrapper } from './style'
import { Button, Checkbox, Form, Input } from 'antd'
import Verify from '@/components/Verify'
import { useVerify } from '@/hooks/useVerify'
import LoginAgree from '../login-agree/login-agree'
import { useRulesConfig } from '../../config/rule.config'
import classNames from 'classnames'
import { useLocalStorageState, useMemoizedFn } from 'ahooks'

interface IProps {
  children?: ReactNode
}

const LoginPhone: FC<IProps> = () => {
  const [checked, setChecked] = useLocalStorageState<boolean>('phone-checked')
  const [phone, setPhone] = useLocalStorageState<string>('phone')

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
  } = useVerify('Phone')

  const { codeRules, phoneRules } = useRulesConfig()

  const handleCheckChange = useMemoizedFn((e) => {
    setChecked(e.target.checked)
  })

  const hadnleLoginMiddleware = useMemoizedFn(() => {
    handleLogin()
    if (checked) {
      setPhone(form.getFieldValue('telephone'))
    } else {
      setPhone('')
    }
  })

  useEffect(() => {
    if (checked) {
      form.setFieldValue('telephone', phone)
    }
  }, [phone])

  return (
    <PhoneWrapper>
      {contextHolder}
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
        <div className="mt-8px">
          <Checkbox checked={checked} onChange={handleCheckChange}>
            记住手机号
          </Checkbox>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          className={classNames({ 'w-full h-[56px] text-lg my-[10px]': true, 'animate-shake-x': isLoginFailure })}
          onClick={hadnleLoginMiddleware}>
          登录
        </Button>
        <LoginAgree onAgree={handleAgree} />
        <Verify ref={verifyRef} onSuccess={handleVerfiySuccess} />
      </Form>
    </PhoneWrapper>
  )
}

export default memo(LoginPhone)
