import React, { ElementRef, memo, useEffect, useMemo, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { PasswordChangeWrapper } from './style'
import { Button, Form, Input, Result, Space, Tabs, message } from 'antd'
import type { TabsProps } from 'antd'
import { useCounter, useCreation, useMemoizedFn } from 'ahooks'
import { useVerify, useVerifyModal } from '@/hooks/useVerify'
import classNames from 'classnames'
import Verify from '@/components/Verify'
import { useRulesConfig } from '../config/rule.config'
import { useAppDispatch } from '@/hooks/useAppRedux'
import { checkPhoneAction, loginByResetPassword, sendCodeAction } from '@/store'
import checkError from '@/utils/error'
import { resetPassowrdByPasswordAction, resetPassowrdByTelephoneAction } from '@/store/features/info'
import { EditOutlined } from '@ant-design/icons'
interface IProps {
  children?: ReactNode
}
const { codeRules, phoneRules, passwordRules } = useRulesConfig()

const Password: FC<IProps> = memo(() => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()

  const handleSave = useMemoizedFn(async () => {
    try {
      const values = await form.validateFields()

      const oldPassword = form.getFieldValue('oldPassword')
      const newPassword = form.getFieldValue('newPassword')
      if (oldPassword == newPassword) {
        messageApi.error({ content: '两次密码不能一样', key: 'same_password' })
        return
      }
      setIsLoading(true)
      const res = await dispatch(resetPassowrdByPasswordAction(values)).unwrap()
      if (res.code == 200) {
        form.resetFields()
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  })
  return (
    <Form size="large" form={form} className="w-[384px]" autoComplete="off">
      {contextHolder}
      <Form.Item name="oldPassword" rules={[{ required: true, message: '原密码不能为空' }]}>
        <Input.Password placeholder="原密码" />
      </Form.Item>

      <Form.Item name="newPassword" rules={passwordRules}>
        <Input.Password placeholder="新密码" />
      </Form.Item>

      <Form.Item className="center">
        <Button type="primary" className="!px-40px" icon={<EditOutlined />} onClick={handleSave} loading={isLoading}>
          修 改
        </Button>
      </Form.Item>
    </Form>
  )
})
const Telephone: FC<IProps> = memo(() => {
  const [isSendCode, setIsSendCode] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timer>()
  const [current, { dec, reset }] = useCounter(60)
  const [messageApi, contextHolder] = message.useMessage()
  const [isLoading, setIsLoading] = useState(false)

  const { handleOpen, verifyRef } = useVerifyModal()
  const [form] = Form.useForm()

  //验证成功回调
  const handleVerfiySuccess = useMemoizedFn(async () => {
    const telephone = form.getFieldValue('telephone')
    const res = await dispatch(checkPhoneAction(telephone)).unwrap()
    if (res.success) {
      const codeRes = await dispatch(sendCodeAction(telephone)).unwrap()
      if (codeRes.code != 200) return
      setIsSendCode(true)
      const tempTimer = setInterval(() => {
        dec()
      }, 1000)
      setTimer(tempTimer)
    }
  })

  const dispatch = useAppDispatch()
  const telephone = Form.useWatch('telephone', form)

  //是否禁用发送验证码
  const isDisabled = useCreation(() => {
    return isSendCode || !telephone
  }, [isSendCode, telephone])

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

  const handleSave = useMemoizedFn(async () => {
    try {
      const values = await form.validateFields()
      if (!isSendCode) {
        messageApi.error({
          content: '请先发送验证码',
          key: 'not_send_code'
        })
        return
      }
      setIsLoading(true)
      const res = await dispatch(resetPassowrdByTelephoneAction(values)).unwrap()
      if (res.code == 200) {
        form.resetFields()
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  })

  return (
    <div>
      {contextHolder}
      <Form form={form} size="large">
        <Form.Item name="telephone" rules={phoneRules}>
          <Input placeholder="手机号码" />
        </Form.Item>
        <Form.Item name="password" rules={passwordRules}>
          <Input.Password placeholder="新的密码" />
        </Form.Item>
        <Form.Item>
          <Space.Compact className="w-full">
            <Form.Item noStyle name="code" rules={codeRules}>
              <Input className="!w-[calc(100%-180px)]" placeholder="验证码" />
            </Form.Item>
            <Button type="primary" className="h-[40px] w-[180px]" disabled={isDisabled} onClick={handleOpen}>
              {isSendCode ? `重新发送(${current})` : '发送验证码'}
            </Button>
          </Space.Compact>
        </Form.Item>
        <Form.Item className="center">
          <Button
            type="primary"
            onClick={handleSave}
            style={{ paddingLeft: '40px', paddingRight: '40px' }}
            icon={<EditOutlined />}
            loading={isLoading}>
            修 改
          </Button>
        </Form.Item>
        <Verify ref={verifyRef} onSuccess={handleVerfiySuccess} />
      </Form>
    </div>
  )
})

const PasswordChange: FC<IProps> = () => {
  const items: TabsProps['items'] = useCreation(() => {
    return [
      {
        key: '1',
        label: `通过密码修改`,
        children: <Password />
      },
      {
        key: '2',
        label: `通过手机修改`,
        children: <Telephone />
      }
    ]
  }, [])

  return (
    <PasswordChangeWrapper className="flex justify-center mt-100px h-full ">
      <Tabs defaultActiveKey="1" centered items={items} />
    </PasswordChangeWrapper>
  )
}

export default memo(PasswordChange)
