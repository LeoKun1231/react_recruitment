/*
 * @Author: hqk
 * @Date: 2023-03-16 19:00:54
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-19 16:29:33
 * @Description:
 */
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { BaseInfoWrapper } from './style'
import { Button, Radio, Form, Input, Select, FormInstance } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import AppSectionHeader from '@/components/AppSectionHeader'
import { useMemoizedFn } from 'ahooks'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { changeBaseInfoAction } from '@/store/features/resume'

interface IProps {
  children?: ReactNode
}

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const BaseInfo: FC<IProps> = () => {
  const [form] = Form.useForm()

  const { data } = useAppSelector((state) => {
    return {
      data: state.resume.baseInfo
    }
  }, useAppShallowEqual)

  const dispatch = useAppDispatch()

  useEffect(() => {
    form.setFieldsValue(data)
  }, [])

  const handleChange = useMemoizedFn(() => {
    dispatch(changeBaseInfoAction(form.getFieldsValue()))
  })

  const onSelectChange = useMemoizedFn(() => {
    dispatch(changeBaseInfoAction(form.getFieldsValue()))
  })

  return (
    <BaseInfoWrapper>
      <AppSectionHeader title="基本信息" />
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onChange={handleChange}>
        <Form.Item label="期望岗位：" name="job">
          <Input placeholder="如：HR" />
        </Form.Item>
        <Form.Item label="姓名：" name="name">
          <Input placeholder="如：张伟" />
        </Form.Item>
        <div className="between">
          <Form.Item label="政治面貌：" name="politics">
            <Select placeholder="请选择政治面貌" allowClear style={{ width: '183px' }} onChange={onSelectChange}>
              <Select.Option value="中共党员">中共党员</Select.Option>
              <Select.Option value="共青团员">共青团员</Select.Option>
              <Select.Option value="群众">群众</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="性别：" name="sex" className="w-[183px]">
            <Radio.Group>
              <Radio value="男"> 男 </Radio>
              <Radio value="女"> 女 </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="between">
          <Form.Item label="手机：" name="telephone">
            <Input placeholder="如：138-8888-8888" />
          </Form.Item>
          <Form.Item label="邮箱：" name="email">
            <Input placeholder="如：1024983409@qq.com" />
          </Form.Item>
        </div>
        <div className="between">
          <Form.Item label="意向城市：" name="likeCity">
            <Input placeholder="如：福州" />
          </Form.Item>
          <Form.Item label="年龄：" name="years">
            <Input placeholder="如：18" addonAfter="岁" className="w-[183px]" />
          </Form.Item>
        </div>
        <div className="mb-[8px]">其他：</div>
        <Form.List name="customs">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item label={''} required={false} key={field.key}>
                  <Form.Item {...field} noStyle>
                    <Input placeholder="添加属于自己属性" style={{ width: '80%' }} />
                  </Form.Item>
                  {fields.length >= 1 ? (
                    <MinusCircleOutlined
                      className="ml-[20px]"
                      onClick={() => {
                        remove(field.name)
                        dispatch(changeBaseInfoAction(form.getFieldsValue()))
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button type="dashed" className="w-full h-[36px] center mt-[8px]" onClick={() => add()} icon={<PlusOutlined />}>
                  添加其他
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </BaseInfoWrapper>
  )
}

export default memo(BaseInfo)
