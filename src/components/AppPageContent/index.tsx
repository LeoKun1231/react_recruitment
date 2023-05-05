/*
 * @Author: hqk
 * @Date: 2023-03-27 16:47:11
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-15 12:57:39
 * @Description:
 */
import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react'
import type { FC, ReactNode } from 'react'
import AppTable from '../AppTable'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { changePageAction, deleteDataByIdAction, getDataListAction } from '@/store/features/admin'
import { TableRowSelection } from 'antd/es/table/interface'
import { useMemoizedFn, useCreation } from 'ahooks'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'

interface IProps {
  children?: ReactNode
  title?: string
  columns: any[]
  userId?: number
  isFullPage?: boolean
  onSelect?: (isSelect: boolean) => void
  onEdit?: (data: any) => void
  isShowEdit?: boolean
}

interface IHandler {
  getSelects: () => React.Key[]
  clear: () => void
}

const AppPageContent = forwardRef<IHandler, IProps>((props, ref) => {
  const { title, columns, onSelect, onEdit, userId, isFullPage, isShowEdit } = props
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const { dataList, pageSize, currentPage, totalCount } = useAppSelector((state) => {
    return {
      dataList: state.admin.dataList,
      pageSize: state.admin.pageSize,
      currentPage: state.admin.currentPage,
      totalCount: state.admin.totalCount
    }
  }, useAppShallowEqual)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let obj = null
    if (userId) {
      obj = { currentPage, pageSize, userId }
    } else {
      obj = { currentPage, pageSize }
    }
    dispatch(getDataListAction({ page: title!, data: obj, isFullPage }))
  }, [userId, title, currentPage, pageSize])

  const onPageChange = useMemoizedFn((currentPage, pageSize) => {
    dispatch(changePageAction({ currentPage, pageSize }))
  })

  const onSelectChange = useMemoizedFn((newSelectedRowKeys: React.Key[]) => {
    if (newSelectedRowKeys.length > 0) {
      onSelect && onSelect(true)
    } else {
      onSelect && onSelect(false)
    }
    setSelectedRowKeys(newSelectedRowKeys)
  })

  const rowSelection: TableRowSelection<any> = useCreation(() => {
    return {
      selectedRowKeys,
      onChange: onSelectChange
    }
  }, [selectedRowKeys])

  const actionColumn = useCreation(() => {
    return isShowEdit
      ? {
          title: '操作',
          align: 'center',
          key: 'operation',
          fixed: 'right',
          width: 200,
          render: (_: any, data: any) => (
            <div className="between">
              <Button icon={<EditOutlined />} type="link" onClick={(e) => handleEdit(e, data)}>
                编 辑
              </Button>
              <Popconfirm
                placement="top"
                title={'您是否删除此数据？'}
                onConfirm={(e) => handleDelete(e, data.id)}
                okText="确 定"
                cancelText="取 消">
                <Button icon={<DeleteOutlined />} type="link">
                  删 除
                </Button>
              </Popconfirm>
            </div>
          )
        }
      : {}
  }, [isShowEdit])

  const handleEdit = useMemoizedFn((e: React.MouseEvent, data: any) => {
    onEdit && onEdit(data)
  })
  const handleDelete = useMemoizedFn((e: any, id: number) => {
    dispatch(deleteDataByIdAction({ page: title!, id, isFullPage }))
  })

  useImperativeHandle(
    ref,
    useMemoizedFn(() => {
      return {
        getSelects() {
          return selectedRowKeys
        },
        clear() {
          setSelectedRowKeys([])
        }
      }
    }),
    [selectedRowKeys]
  )
  return (
    <AppTable
      className="h-[calc(100%-64px)]"
      onPageChange={onPageChange}
      pageSize={pageSize}
      data={dataList}
      rowSelection={isShowEdit ? rowSelection : undefined}
      columns={[...columns, actionColumn]}
      currentPage={currentPage}
      totalCount={totalCount}
    />
  )
})

AppPageContent.defaultProps = {
  isShowEdit: true
}

export default memo(AppPageContent)
