/*
 * @Author: hqk
 * @Date: 2023-03-27 14:35:32
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-11 16:10:23
 * @Description:
 */
import React from 'react'
import { ITableConfig } from '@/types/common'
import { Avatar, Tooltip, Tag } from 'antd'

export const tableConifg: ITableConfig<any> = {
  page: '/company/job',
  isFullPage: true,
  columns: [
    { title: '岗位名称', dataIndex: 'jobName', key: 'jobName', align: 'center', width: 200, ellipsis: true, fixed: 'left' },
    {
      title: '岗位类型',
      dataIndex: 'jobType',
      key: 'jobType',
      align: 'center',
      width: 200,
      ellipsis: true,
      render: (value) => (
        <>
          <Tooltip
            color="#fff"
            className="hover "
            title={
              <>
                {value?.map((item: any) => {
                  return (
                    <Tag key={item} color="processing" className="m-[4px]">
                      {item}
                    </Tag>
                  )
                })}
              </>
            }>
            {value?.slice(0, 1)?.map((item: any) => {
              return (
                <Tag key={item} color="processing">
                  {item}
                </Tag>
              )
            })}
            {value?.length > 1 && <Tag color="processing">...</Tag>}
          </Tooltip>
        </>
      )
    },
    { title: '薪资', dataIndex: 'money', key: 'money', align: 'center', width: 120, ellipsis: true },
    { title: '学历要求', dataIndex: 'jobRequire', key: 'jobRequire', align: 'center', width: 120, ellipsis: true },
    { title: '所在城市', dataIndex: 'city', key: 'city', align: 'center', width: 120, ellipsis: true },
    { title: '详细地址', dataIndex: 'addressName', key: 'addressName', align: 'center', width: 200, ellipsis: true },
    {
      title: '岗位福利',
      dataIndex: 'weal',
      key: 'weal',
      align: 'center',
      width: 120,
      ellipsis: true,
      render: (value) => (
        <>
          <Tooltip
            color="#fff"
            className="hover "
            title={
              <>
                {value?.map((item: any) => {
                  return (
                    <Tag key={item} color="processing" className="m-[4px]">
                      {item}
                    </Tag>
                  )
                })}
              </>
            }>
            {value?.slice(0, 1)?.map((item: any) => {
              return (
                <Tag key={item} color="processing">
                  {item}
                </Tag>
              )
            })}
            {value?.length > 1 && <Tag color="processing">...</Tag>}
          </Tooltip>
        </>
      )
    },
    {
      title: '岗位标签',
      dataIndex: 'tag',
      key: 'tag',
      align: 'center',
      width: 120,
      ellipsis: true,
      render: (value) => (
        <>
          <Tooltip
            color="#fff"
            className="hover "
            title={
              <>
                {value?.map((item: any) => {
                  return (
                    <Tag key={item} color="processing" className="m-[4px]">
                      {item}
                    </Tag>
                  )
                })}
              </>
            }>
            {value?.slice(0, 1)?.map((item: any) => {
              return (
                <Tag key={item} color="processing">
                  {item}
                </Tag>
              )
            })}
            {value?.length > 1 && <Tag color="processing">...</Tag>}
          </Tooltip>
        </>
      )
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', align: 'center', width: 200 },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', align: 'center', width: 200 }
  ]
}
