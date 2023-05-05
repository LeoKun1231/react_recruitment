/*
 * @Author: hqk
 * @Date: 2023-04-08 10:31:49
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-11 20:09:06
 * @Description:
 */
import React, { memo, useState, useRef, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { InputRef } from 'antd'
import { Button, Space, Form, Divider, Input, Select } from 'antd'
import { useMemoizedFn } from 'ahooks'

interface IProps {
  children?: ReactNode
  label: string
  options: string[]
  name: string
  rules: any
  placeholder?: string
}
const AppAddSelect: FC<IProps> = (props) => {
  const { label, options, name, placeholder, rules } = props
  const [items, setItems] = useState(() => {
    return options
  })

  const [customItem, setCustomItem] = useState<string>()
  const inputRef = useRef<InputRef>(null)

  const onNameChange = useMemoizedFn((event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomItem(event.target.value)
  })

  const addItem = useMemoizedFn((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (!customItem || customItem?.length == 0 || customItem?.trim() == '') {
      return
    }
    e.preventDefault()
    setItems([...items, customItem])
    setCustomItem('')
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  })

  useEffect(() => {
    setItems(options)
  }, [options])

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        maxTagCount="responsive"
        placeholder={placeholder}
        dropdownRender={(menu) => (
          <div>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <div className="between p-4px">
              <Input
                placeholder="请输入自定义选项"
                ref={inputRef}
                value={customItem}
                onChange={onNameChange}
                onKeyDown={(e) => {
                  e.stopPropagation()
                }}
              />
              <Button type="text" icon={<PlusOutlined />} onClick={addItem} className="ml-4px">
                添加
              </Button>
            </div>
          </div>
        )}>
        {items.map((item) => {
          return (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          )
        })}
      </Select>
    </Form.Item>
  )
}

export default memo(AppAddSelect)
