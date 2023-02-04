/*
 * @Author: hqk
 * @Date: 2023-02-03 20:25:14
 * @LastEditors: hqk
 * @LastEditTime: 2023-02-04 14:25:04
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Space } from 'antd'
interface IProps {
  children?: ReactNode
}

const HomeMessage: FC<IProps> = () => {
  return (
    <div>
      <Space wrap>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Space>
    </div>
  )
}

export default memo(HomeMessage)
