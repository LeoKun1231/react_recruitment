/*
 * @Author: hqk
 * @Date: 2023-03-31 21:18:30
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-07 19:25:32
 * @Description:
 */
import React, { ElementRef, memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { CommentWrapper } from './style'
import { Tabs, Button, Table } from 'antd'
import type { TabsProps } from 'antd'
import { useCreation, useMemoizedFn } from 'ahooks'
import { IReportComment } from '@/types/home/community'
import { useAppDispatch } from '@/hooks/useAppRedux'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import AppConfirmModal from '@/components/AppConfirmModal'
import AppTable from '@/components/AppTable'
import { tableConifg } from './config/table.config'
import { deleteReportAction, getReportCommentListAction, recoverReportAction } from '@/store/features/admin'
import { ColumnProps } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'

interface IProps {
  children?: ReactNode
}

const expandedRowRender = (value: IReportComment) => {
  const columns: ColumnProps<any>[] = [
    {
      title: '举报原因',
      dataIndex: 'reason',
      key: 'reason',
      align: 'center',
      ellipsis: true,
      render: (_, { reason }) => {
        return <div className="text-left">{reason}</div>
      }
    }
  ]
  const data1 = []
  for (let i = 0; i < value.reason.length; ++i) {
    data1.push({
      key: i.toString(),
      reason: value.reason[i]
    })
  }
  return <Table columns={columns as any} dataSource={data1} pagination={false} />
}
const { columns } = tableConifg

const comment: FC<IProps> = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [pageSize, setPageSize] = useState(5)
  const [data, setData] = useState<IReportComment[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [type, setType] = useState(1)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const deleteModalRef = useRef<ElementRef<typeof AppConfirmModal>>(null)
  const recoverModalRef = useRef<ElementRef<typeof AppConfirmModal>>(null)

  const dispatch = useAppDispatch()
  const loadData = useMemoizedFn(async (currentPage: number, type: number) => {
    const res = await dispatch(getReportCommentListAction({ type, pageSize, currentPage })).unwrap()
    if (res.code == 200) {
      setData(res.data.records)
      setTotalCount(res.data.totalCount)
    }
  })

  const handlePageChange = useMemoizedFn((current: number) => {
    setCurrentPage(current)
    loadData(current, type)
  })

  const onChange = useMemoizedFn((type: string) => {
    setType(parseInt(type))
    setData([])
    setCurrentPage(1)
    loadData(1, parseInt(type))
  })
  useEffect(() => {
    loadData(1, 1)
  }, [])

  useEffect(() => {
    const el = document.querySelector('.ant-tabs-content-holder')
    el?.scrollTo(0, 0)
  }, [type])

  const handleDelete = useMemoizedFn(() => {
    deleteModalRef.current?.show()
  })

  const handleRecover = useMemoizedFn(() => {
    recoverModalRef.current?.show()
  })

  const handleDeleteConfirm = useMemoizedFn(async () => {
    const res = await dispatch(deleteReportAction({ data: selectedRowKeys as number[], page: 'comment' })).unwrap()
    if (res.code == 200) {
      setCurrentPage(1)
      loadData(1, type)
      setSelectedRowKeys([])
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  })

  const handleRecoverConfirm = useMemoizedFn(async () => {
    const res = await dispatch(recoverReportAction({ data: selectedRowKeys as number[], page: 'comment' })).unwrap()
    if (res.code == 200) {
      setCurrentPage(1)
      loadData(1, type)
      setSelectedRowKeys([])
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  })

  const onSelectChange = useMemoizedFn((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  })

  const rowSelection: any = useCreation(() => {
    return {
      selectedRowKeys,
      onChange: onSelectChange
    }
  }, [selectedRowKeys])

  const items: TabsProps['items'] = useCreation(() => {
    return [
      {
        key: '1',
        label: `举报最多`,
        children: (
          <AppTable
            columns={columns}
            className="h-full"
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            showQuickJumper={false}
            showSizeChanger={false}
            rowSelection={rowSelection}
            totalCount={totalCount}
            expandedRowRender={expandedRowRender}
            data={data}
          />
        )
      },
      {
        key: '2',
        label: `最新举报`,
        children: (
          <AppTable
            columns={columns}
            className="h-full"
            showQuickJumper={false}
            showSizeChanger={false}
            rowSelection={rowSelection}
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            expandedRowRender={expandedRowRender}
            data={data}
          />
        )
      }
    ]
  }, [data, selectedRowKeys, currentPage, pageSize])

  return (
    <CommentWrapper>
      <div className="px-20px py-40px bg-white flex flex-col h-[calc(100%-10px)] shadow-lg">
        <h2 className="p-0 m-0">评论举报管理</h2>
        <Tabs
          defaultActiveKey="1"
          className="mt-[20px] flex-1 h-[calc(100%-24px-32px-20px) overflow-hidden"
          items={items}
          onChange={onChange}
          tabBarExtraContent={
            <>
              <Button icon={<EditOutlined />} type="primary" onClick={handleRecover}>
                恢复
              </Button>
              <Button type="primary" className="ml-10px" icon={<DeleteOutlined />} onClick={handleDelete}>
                删除
              </Button>
            </>
          }
        />
      </div>
      <AppConfirmModal title="举报内容属实" onConfirm={handleDeleteConfirm} ref={deleteModalRef}>
        <div className="px-10px py-20px">删除后，评论不可恢复，请确定。</div>
      </AppConfirmModal>
      <AppConfirmModal title="举报内容不属实" onConfirm={handleRecoverConfirm} ref={recoverModalRef}>
        <div className="px-10px py-20px">删除举报信息，请确认。</div>
      </AppConfirmModal>
    </CommentWrapper>
  )
}

export default memo(comment)
