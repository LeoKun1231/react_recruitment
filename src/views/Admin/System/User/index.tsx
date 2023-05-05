/*
 * @Author: hqk
 * @Date: 2023-03-24 13:02:02
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-07 15:13:18
 * @Description:
 */
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { UserWrapper } from './style'
import { searchConfig } from './config/search.config'
import { Col, Form, Input, Row, Select, TreeSelect } from 'antd'
import { tableConifg } from './config/table.config'
import { useCreation, useMemoizedFn } from 'ahooks'
import { useRulesConfig } from './config/rule.config'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { getMajorTreeListAction } from '@/store/features/common'
import { CustomFormItem } from '@/types/common'
import { FormInstance } from 'antd/lib/form/Form'
import AppPage from '@/components/AppPage'

const { Option } = Select

interface IProps {
  children?: ReactNode
}
const { accountRules, emailRules, nickNameRules, phoneRules, userNameRules } = useRulesConfig()

const User: FC<IProps> = () => {
  const { items } = searchConfig
  const dispatch = useAppDispatch()

  const { majorTreeList, userId } = useAppSelector((state) => {
    return {
      majorTreeList: state.common.marjorTreeList,
      userId: state.login.loginUser.id
    }
  }, useAppShallowEqual)

  useEffect(() => {
    dispatch(getMajorTreeListAction(userId))
  }, [])

  const majorTreeSelect: CustomFormItem = useCreation(() => {
    return {
      type: 'tree',
      label: '专业',
      name: 'majorId',
      treeData: majorTreeList
    }
  }, [majorTreeList])

  const watchRoleId = useMemoizedFn((name: string, form: FormInstance) => {
    return Form.useWatch(name, form)
  })

  return (
    <UserWrapper>
      <AppPage
        title="用户列表"
        searchConfig={{ items: [...items.slice(0, 5), majorTreeSelect, ...items.slice(5)] }}
        tableConfig={tableConifg}
        addAndEdit={(form, isEdit) => (
          <>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="account" label="帐号" rules={accountRules}>
                  <Input placeholder="请输入4到16位（字母，数字，下划线，减号）" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="nickName" label="用户名" rules={nickNameRules}>
                  <Input placeholder="请输入2到14位的字符" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="userName" label="姓名" rules={userNameRules}>
                  <Input placeholder="请输入中文字符" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="telephone" label="手机号码" rules={phoneRules}>
                  <Input placeholder="请输入手机号码" />
                </Form.Item>
              </Col>
            </Row>
            {isEdit ? (
              <Form.Item name="email" label="邮箱" rules={emailRules}>
                <Input placeholder="请输入邮箱" />
              </Form.Item>
            ) : (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="email" label="邮箱" rules={emailRules}>
                    <Input placeholder="请输入邮箱" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="password" label="密码">
                    <Input placeholder="此处可不填，默认密码为123456" />
                  </Form.Item>
                </Col>
              </Row>
            )}

            <Col span={24}>
              <Form.Item name="roleId" label="角色" rules={[{ required: true, message: '请选择角色' }]}>
                <Select placeholder="请选择一种角色">
                  <Option value={1}>超级管理员</Option>
                  <Option value={2}>老师</Option>
                </Select>
              </Form.Item>
            </Col>
            {watchRoleId('roleId', form) == 2 && (
              <Col span={24}>
                <Form.Item name="majorIds" label="负责专业">
                  <TreeSelect
                    treeData={majorTreeList}
                    allowClear
                    multiple
                    treeCheckable
                    maxTagCount={5}
                    treeNodeFilterProp="title"
                    maxTagTextLength={6}></TreeSelect>
                </Form.Item>
              </Col>
            )}
          </>
        )}
      />
    </UserWrapper>
  )
}

export default memo(User)
