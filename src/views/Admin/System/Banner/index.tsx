/*
 * @Author: hqk
 * @Date: 2023-03-24 13:02:02
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-15 13:11:26
 * @Description:
 */
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { BannerWrapper } from './style'
import { searchConfig } from './config/search.config'
import { Select, Switch } from 'antd'
import { tableConifg } from './config/table.config'
import { useCreation, useMemoizedFn } from 'ahooks'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import AppPage from '@/components/AppPage'
import { changeBannerStatusAction } from '@/store'

const { Option } = Select

interface IProps {
  children?: ReactNode
}
const { columns, page, isFullPage } = tableConifg

const Banner: FC<IProps> = () => {
  const { items } = searchConfig
  const dispatch = useAppDispatch()

  const { userId } = useAppSelector((state) => {
    return {
      userId: state.login.loginUser.id
    }
  }, useAppShallowEqual)

  const handleChange = useMemoizedFn(async (id) => {
    await dispatch(changeBannerStatusAction(id))
  })

  const customColumns = useCreation(() => {
    return [
      ...columns.slice(0, 3),
      {
        title: '是否启用',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: 200,
        ellipsis: true,
        render(value: any, { id }: any) {
          return (
            <Switch
              checkedChildren="启用"
              unCheckedChildren="停用"
              defaultChecked={value == 1}
              onChange={() => handleChange(id)}
              key={id}
            />
          )
        }
      },
      ...columns.slice(3)
    ]
  }, [])
  return (
    <BannerWrapper>
      <AppPage
        title="用户列表"
        searchConfig={{ items }}
        tableConfig={{ columns: customColumns as any, page, isFullPage }}
        isShowAdd={false}
      />
    </BannerWrapper>
  )
}

export default memo(Banner)
