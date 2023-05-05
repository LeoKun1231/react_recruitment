/*
 * @Author: hqk
 * @Date: 2023-03-26 16:17:38
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-01 18:28:58
 * @Description:
 */
import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { AppFormSearchWrapper } from './style'
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Form, Input, Row, Select, Cascader, TreeSelect } from 'antd'
import { ISearchConfig } from '@/types/common'
import { useMemoizedFn } from 'ahooks'
import { formatTime } from '@/utils/date'
interface IProps {
  children?: ReactNode
  searchConfig: ISearchConfig
  onSearch: (data: any) => void
}
const { Option } = Select

const AppFormSearch: FC<IProps> = (props) => {
  const {
    searchConfig: { items },
    onSearch
  } = props
  const [form] = Form.useForm()

  const formStyle = {
    maxWidth: 'none',
    background: '#fff',
    borderRadius: '8px',
    padding: '36px 48px'
  }

  const getFields = useMemoizedFn(() => {
    const children = []
    children.push(
      items.map((item, index) => (
        <Col key={item.name + '' + index} span="6">
          {item.type == 'input' && (
            <Form.Item {...item}>
              <Input />
            </Form.Item>
          )}
          {item.type == 'select' && (
            <Form.Item {...item}>
              <Select style={{ width: '100%' }}>
                {item.options?.map((iten) => {
                  return (
                    <Option value={iten.value} key={iten.value}>
                      {iten.label}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          )}
          {item.type == 'date' && (
            <Form.Item {...item}>
              <DatePicker.RangePicker style={{ width: '100%' }}></DatePicker.RangePicker>
            </Form.Item>
          )}
          {item.type == 'tree' && (
            <Form.Item {...item}>
              <TreeSelect
                treeData={item.treeData}
                allowClear
                multiple
                treeCheckable
                maxTagCount={1}
                treeNodeFilterProp="title"
                maxTagTextLength={6}></TreeSelect>
            </Form.Item>
          )}
          {item.type == 'cascader' && (
            <Form.Item {...item}>
              <Cascader options={item.options} fieldNames={{ children: 'children', label: 'label', value: 'label' }} />
            </Form.Item>
          )}
        </Col>
      ))
    )
    return children
  })

  const onFinish = (values: any) => {
    onSearch && onSearch(values)
  }
  return (
    <AppFormSearchWrapper>
      <Form
        form={form}
        name="advanced_search"
        className="shadow-lg"
        style={formStyle}
        onFinish={onFinish}
        size="large"
        autoComplete="false"
        labelCol={{ span: 8 }}
        labelAlign="right">
        <Row>{getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              搜 索
            </Button>
            <Button
              style={{ margin: '0 8px' }}
              icon={<ReloadOutlined />}
              onClick={() => {
                form.resetFields()
              }}>
              重 置
            </Button>
          </Col>
        </Row>
      </Form>
    </AppFormSearchWrapper>
  )
}

export default memo(AppFormSearch)
