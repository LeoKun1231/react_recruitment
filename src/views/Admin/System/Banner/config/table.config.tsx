/*
 * @Author: hqk
 * @Date: 2023-03-27 14:35:32
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-15 13:03:38
 * @Description:
 */
import React from 'react'
import { ITableConfig } from '@/types/common'
import { Button, Image } from 'antd'

export const tableConifg: ITableConfig<any> = {
  page: '/company/banner/admin',
  isFullPage: true,
  columns: [
    { title: '创建者', dataIndex: 'creator', key: 'creator', align: 'center', width: 200 },
    {
      title: '轮播图',
      dataIndex: 'imgUrl',
      key: 'imgUrl',
      align: 'center',
      width: 400,
      render(url: any) {
        return <Image width={80} src={url} />
      }
    },
    {
      title: '跳转链接',
      dataIndex: 'govUrl',
      key: 'govUrl',
      align: 'center',
      width: 400,
      render(url: any) {
        return (
          <Button href={url} type="link" target="_blank">
            {url}
          </Button>
        )
      }
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', align: 'center', width: 200 },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', align: 'center', width: 200 }
  ]
}
