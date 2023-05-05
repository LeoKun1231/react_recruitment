import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { BaseInfoWrapper } from './style'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { useMemoizedFn } from 'ahooks'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { updateUserInfoAction } from '@/store/features/info'
import { changeLoginUserAction, saveLoginUserAction } from '@/store'
import { useRulesConfig } from '../config/rule.config'
interface IProps {
  children?: ReactNode
}

const { phoneRules, userNameRules, emailRules } = useRulesConfig()

const BaseInfo: FC<IProps> = () => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(true)
  const dispatch = useAppDispatch()

  const { loginUser } = useAppSelector((state) => {
    return {
      loginUser: state.login.loginUser
    }
  }, useAppShallowEqual)

  const handleSave = useMemoizedFn(async () => {
    try {
      const values = await form.validateFields()
      setIsLoading(true)
      const res = await dispatch(updateUserInfoAction(values)).unwrap()
      if (res.code == 200) {
        const { userName, nickName, telephone, email } = res.data.data
        dispatch(changeLoginUserAction({ userName, nickName, telephone, email }))
        setIsEdit(true)
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  })

  const handleReset = useMemoizedFn(() => {
    setIsEdit(true)
    form.setFieldsValue(loginUser)
  })

  useEffect(() => {
    form.setFieldsValue(loginUser)
  }, [])

  const handleEdit = useMemoizedFn(() => {
    setIsEdit(false)
  })

  return (
    <BaseInfoWrapper className="h-full center flex-col ">
      <Form
        form={form}
        name="basic"
        labelCol={{ flex: '120px' }}
        wrapperCol={{ span: 16 }}
        style={{ width: 500 }}
        autoComplete="off"
        disabled={isEdit}>
        <Form.Item label="用户名" name="nickName" rules={[{ required: true, message: '用户不能为空' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="姓名" name="userName" rules={userNameRules}>
          <Input />
        </Form.Item>
        <Form.Item label="手机号码" name="telephone" rules={phoneRules}>
          <Input />
        </Form.Item>
        <Form.Item label="邮箱" name="email" rules={emailRules}>
          <Input />
        </Form.Item>
      </Form>
      <div className="w-full center">
        {isEdit ? (
          <Button type="primary" className="mr-10px" onClick={handleEdit} loading={isLoading}>
            编辑
          </Button>
        ) : (
          <Button type="primary" className="mr-10px" onClick={handleSave} loading={isLoading}>
            提交
          </Button>
        )}

        <Button type="primary" onClick={handleReset} disabled={isEdit}>
          重置
        </Button>
      </div>
    </BaseInfoWrapper>
  )
}

export default memo(BaseInfo)
