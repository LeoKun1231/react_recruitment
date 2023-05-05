/*
 * @Author: hqk
 * @Date: 2023-03-27 14:35:32
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-07 16:53:52
 * @Description:
 */
import React from 'react'
import { IAdminTeacherDetail } from '@/types/admin'
import { ITableConfig } from '@/types/common'
import { Avatar, Button, Tag, Tooltip } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export const tableConifg: ITableConfig<IAdminTeacherDetail> = {
  page: 'admin',
  columns: [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      fixed: 'left',
      width: 80,
      render: (_, { avatar }) => (avatar ? <Avatar src={avatar} /> : <Avatar icon={<UserOutlined />} />)
    },

    { title: '帐号', dataIndex: 'account', key: 'account', align: 'center', width: 200, ellipsis: true, fixed: 'left' },
    { title: '用户名', dataIndex: 'nickName', key: 'nickName', align: 'center', width: 120, ellipsis: true },
    { title: '姓名', dataIndex: 'userName', key: 'userName', align: 'center', width: 120, ellipsis: true },
    { title: '手机号码', dataIndex: 'telephone', key: 'telephone', align: 'center', width: 120, ellipsis: true },
    { title: '邮箱', dataIndex: 'email', key: 'email', align: 'center', width: 200, ellipsis: true },
    {
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName',
      align: 'center',
      width: 120
    },
    {
      title: '管理的专业',
      dataIndex: 'majorNames',
      key: 'majorNames',
      align: 'center',
      width: 200,
      render: (_, { majorNames, roleId }) =>
        roleId == 1 ? (
          <Tag color="processing" className="m-[4px] hover">
            全部
          </Tag>
        ) : (
          <>
            <Tooltip
              color="#fff"
              className="hover "
              title={
                <>
                  {majorNames?.map((item) => {
                    return (
                      <Tag key={item} color="processing" className="m-[4px]">
                        {item}
                      </Tag>
                    )
                  })}
                </>
              }>
              {majorNames?.slice(0, 1)?.map((item) => {
                return (
                  <Tag key={item} color="processing">
                    {item}
                  </Tag>
                )
              })}
              {majorNames?.length > 1 && <Tag color="processing">...</Tag>}
            </Tooltip>
          </>
        )
    },

    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', align: 'center', width: 200 },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', align: 'center', width: 200 }
  ]
}
