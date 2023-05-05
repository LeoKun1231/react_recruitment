/*
 * @Author: hqk
 * @Date: 2023-03-24 13:02:02
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-10 16:05:14
 * @Description:
 */
import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { CompanyWrapper } from './style'
import { searchConfig } from './config/search.config'
import { Col, Form, Input, Row, Select, Switch, Steps } from 'antd'
import { tableConifg } from './config/table.config'
import { useCreation, useMemoizedFn } from 'ahooks'
import { useRulesConfig } from './config/rule.config'
import AppPage from '@/components/AppPage'
import MySteps from './MySteps'
import MySwitch from './MySwitch'
const { Option } = Select

interface IProps {
  children?: ReactNode
}
const { accountRules, emailRules, nickNameRules, phoneRules, userNameRules, companyNameRules } = useRulesConfig()

const Company: FC<IProps> = () => {
  const { items } = searchConfig
  const { columns } = tableConifg

  const CustomColunms = [
    {
      title: '是否启用',
      dataIndex: 'active',
      key: 'active',
      align: 'center',
      width: 120,
      render(value: any, { id, status }: any) {
        return <MySwitch value={value} id={id} status={status} key={id} />
      }
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 200,
      render(value: any, { id }: any) {
        return <MySteps value={value} userId={id} />
      }
    }
  ]

  return (
    <CompanyWrapper>
      <AppPage
        title="公司列表"
        searchConfig={{ items }}
        tableConfig={{ columns: [...columns, ...CustomColunms] as any, page: tableConifg.page }}
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
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="email" label="邮箱" rules={emailRules}>
                  <Input placeholder="请输入邮箱" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="companyName" label="公司名称" rules={companyNameRules}>
                  <Input placeholder="请输入公司名称" />
                </Form.Item>
              </Col>
            </Row>
            {!isEdit && (
              <Form.Item name="password" label="密码">
                <Input placeholder="此处可不填，默认密码为123456" />
              </Form.Item>
            )}
          </>
        )}
      />
    </CompanyWrapper>
  )
}

export default memo(Company)
