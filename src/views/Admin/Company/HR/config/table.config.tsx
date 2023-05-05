/*
 * @Author: hqk
 * @Date: 2023-03-27 14:35:32
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-10 19:55:05
 * @Description:
 */
import React from 'react'
import { IStudentDetail } from '@/types/admin'
import { ITableConfig } from '@/types/common'
import { Avatar, Tag } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export const tableConifg: ITableConfig<IStudentDetail> = {
  page: 'hr',
  columns: [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      width: 80,
      render: (_, { avatar }) => (avatar ? <Avatar src={avatar} /> : <Avatar icon={<UserOutlined />} />),
      fixed: 'left'
    },
    { title: '帐号', dataIndex: 'account', key: 'account', align: 'center', width: 200, ellipsis: true, fixed: 'left' },
    { title: '用户名', dataIndex: 'nickName', key: 'nickName', align: 'center', width: 120, ellipsis: true },
    { title: '姓名', dataIndex: 'userName', key: 'userName', align: 'center', width: 120, ellipsis: true },

    { title: '手机号码', dataIndex: 'telephone', key: 'telephone', align: 'center', width: 120, ellipsis: true },
    { title: '邮箱', dataIndex: 'email', key: 'email', align: 'center', width: 200, ellipsis: true },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', align: 'center', width: 200 },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', align: 'center', width: 200 }
  ]
}
