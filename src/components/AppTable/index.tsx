/*
 * @Author: hqk
 * @Date: 2023-03-26 19:55:50
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-10 09:28:20
 * @Description:
 */
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { AppTableWrapper } from './style'
import { Table } from 'antd'
import { TableRowSelection } from 'antd/es/table/interface'
import { useCreation } from 'ahooks'

interface IProps {
  children?: ReactNode
  className?: string
  columns: any[]
  data?: any[]
  pageSize?: number
  currentPage?: number
  totalCount?: number
  onPageChange?: (page: number, pageSize: number) => void
  rowSelection?: TableRowSelection<any>
  expandedRowRender?: any
  showSizeChanger?: boolean
  showQuickJumper?: boolean
}

const AppTable: FC<IProps> = (props) => {
  const {
    className,
    data,
    onPageChange,
    pageSize,
    currentPage,
    totalCount,
    columns,
    rowSelection,
    expandedRowRender,
    showSizeChanger,
    showQuickJumper
  } = props

  return (
    <AppTableWrapper className={className}>
      <Table
        columns={columns}
        dataSource={data}
        className="h-full"
        rowSelection={rowSelection}
        rowKey="id"
        expandable={{ expandedRowRender }}
        scroll={{ y: 'calc(100% - 55px)', x: columns.reduce((pre, current) => pre + current.width, 0) + 32 - 200 }}
        pagination={{
          total: totalCount,
          showSizeChanger,
          showQuickJumper,
          showTotal: (total) => `总共 ${total} 条数据`,
          onChange: onPageChange,
          pageSize: pageSize,
          current: currentPage
        }}
      />
    </AppTableWrapper>
  )
}

AppTable.defaultProps = {
  showSizeChanger: true,
  showQuickJumper: true
}

export default memo(AppTable)
