/*
 * @Author: hqk
 * @Date: 2023-02-25 16:02:17
 * @LastEditors: hqk
 * @LastEditTime: 2023-02-25 16:14:11
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { Checkbox } from 'antd'
import { useMemoizedFn } from 'ahooks'

interface IProps {
  children?: ReactNode
  onAgree: (agree: boolean) => void
}

const LoginAgree: FC<IProps> = (props) => {
  const { onAgree } = props
  const onCheckBoxChange = useMemoizedFn((e: CheckboxChangeEvent) => {
    onAgree && onAgree(e.target.checked)
  })
  return (
    <div className="my-[5px] text-xs flex items-center">
      <Checkbox onChange={onCheckBoxChange}>我已阅读并同意</Checkbox>
      <a className="text-[var(--primary-color)]">《校园招聘网服务协议》《隐私政策》</a>
    </div>
  )
}

export default memo(LoginAgree)
