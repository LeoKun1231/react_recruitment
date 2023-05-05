/*
 * @Author: hqk
 * @Date: 2023-04-12 16:20:00
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-12 16:30:40
 * @Description:
 */
import { useAppDispatch } from '@/hooks/useAppRedux'
import { changeCompanyActiveAction } from '@/store/features/admin'
import { useMemoizedFn } from 'ahooks'
import { Switch } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  value: number
  status: number
  id: number
}

const MySwitch: FC<IProps> = (props) => {
  const { value, status, id } = props
  const [myStatus, setMyStatus] = useState(value)

  useEffect(() => {
    setMyStatus(value)
  }, [value])
  const dispatch = useAppDispatch()
  const handleChange = useMemoizedFn((e) => {
    setMyStatus(e)
    dispatch(changeCompanyActiveAction(id))
  })

  return <Switch checkedChildren="启用" unCheckedChildren="关闭" disabled={status != 2} checked={myStatus == 1} onChange={handleChange} />
}

export default MySwitch
