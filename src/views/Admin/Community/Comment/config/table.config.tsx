/*
 * @Author: hqk
 * @Date: 2023-03-27 14:35:32
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-07 13:16:32
 * @Description:
 */
import React from 'react'
import { IStudentDetail } from '@/types/admin'
import { ITableConfig } from '@/types/common'
import { Avatar, Button, Tag } from 'antd'
import { EyeOutlined, UserOutlined } from '@ant-design/icons'
import { IReportComment } from '@/types/home/community'

export const tableConifg: ITableConfig<IReportComment> = {
  page: 'student',
  columns: [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      width: 80,
      render: (_, { avatar }) => (avatar ? <Avatar src={avatar} /> : <Avatar icon={<UserOutlined />} />)
    },
    { title: '用户名', dataIndex: 'nickName', key: 'nickName', align: 'center', width: 120, ellipsis: true },
    { title: '举报次数', dataIndex: 'reportCount', key: 'reportCount', align: 'center', width: 120, ellipsis: true },
    {
      title: '评论内容',
      dataIndex: 'comment',
      key: 'comment',
      align: 'center',
      width: 300,
      ellipsis: true,
      render(_, { comment }) {
        return (
          <div className="text-left truncate" title={comment}>
            {comment}
          </div>
        )
      }
    },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', align: 'center', width: 200 }
  ]
}
