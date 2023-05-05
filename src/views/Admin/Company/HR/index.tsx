/*
 * @Author: hqk
 * @Date: 2023-03-24 13:02:04
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-11 13:40:07
 * @Description:
 */
import React, { ElementRef, memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { HRWrapper } from './style'
import AppPage from '@/components/AppPage'
import { searchConfig } from './config/search.config'
import { Button, Col, Form, Input, Row, TreeSelect } from 'antd'
import { tableConifg } from './config/table.config'
import { useRulesConfig } from './config/rule.config'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { getMajorTreeListAction } from '@/store/features/common'

interface IProps {
  children?: ReactNode
}

const { accountRules, emailRules, nickNameRules, phoneRules, userNameRules } = useRulesConfig()

const HR: FC<IProps> = () => {
  const { items } = searchConfig
  const dispatch = useAppDispatch()

  const studentRef = useRef<HTMLDivElement | null>(null)

  const { majorTreeList, userId } = useAppSelector((state) => {
    return {
      majorTreeList: state.common.marjorTreeList,
      userId: state.login.loginUser.id
    }
  }, useAppShallowEqual)

  useEffect(() => {
    dispatch(getMajorTreeListAction(userId))
  }, [])

  return (
    <HRWrapper ref={studentRef}>
      <AppPage
        title="HR列表"
        userId={userId}
        searchConfig={{ items: [...items.slice(0, 4), ...items.slice(4)] }}
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
          </>
        )}
      />
    </HRWrapper>
  )
}

export default memo(HR)
