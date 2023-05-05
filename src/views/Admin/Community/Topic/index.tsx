/*
 * @Author: hqk
 * @Date: 2023-03-31 21:18:27
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-07 15:11:48
 * @Description:
 */
import React, { ElementRef, memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { TopicWrapper } from './style'
import { Button, Form, Input, Card, List, Skeleton, Divider, Pagination, Grid, Empty } from 'antd'
import { Icon } from '@iconify-icon/react'
import { DeleteOutlined, EditFilled, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/hooks/useAppRedux'
import { addTopicAction, deleteTopicByIdAction, getAdminTopicListAction, updateTopicByIdAction } from '@/store/features/admin'
import { ITopic } from '@/types/home/community'
import { useMemoizedFn } from 'ahooks'
import AppConfirmModal from '@/components/AppConfirmModal'

interface IProps {
  children?: ReactNode
}

const { Meta } = Card

const Topic: FC<IProps> = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [pageSize, setPageSize] = useState(12)
  const [data, setData] = useState<ITopic[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [editId, setEditId] = useState(-1)
  const [deleteId, setDeleteId] = useState(-1)

  const appModalRef = useRef<ElementRef<typeof AppConfirmModal>>(null)

  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  const loadData = useMemoizedFn(async (currentPage: number) => {
    const res = await dispatch(getAdminTopicListAction({ currentPage, pageSize })).unwrap()
    if (res.code == 200) {
      setData(res.data.records)
      setTotalCount(res.data.totalCount)
    }
  })

  useEffect(() => {
    loadData(1)
  }, [])

  const handleDeleteShow = useMemoizedFn((id: number) => {
    setDeleteId(id)
    appModalRef.current?.show()
  })

  const handleDeleteConfirm = useMemoizedFn(async () => {
    const res = await dispatch(deleteTopicByIdAction(deleteId)).unwrap()
    if (res.code == 200) {
      setDeleteId(-1)
      loadData(currentPage)
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  })

  const handlePageChange = useMemoizedFn((current: number) => {
    setCurrentPage(current)
    loadData(current)
  })

  const handleEdit = useMemoizedFn((id: number) => {
    if (id == editId) {
      setEditId(-1)
      return
    }
    setEditId(id)
  })

  const handleEditBlur = useMemoizedFn(async (e: any, id: number) => {
    const res = await dispatch(updateTopicByIdAction({ id, content: e.target.value })).unwrap()
    if (res.code == 200) {
      setEditId(-1)
      loadData(currentPage)
    }
  })

  const handleAdd = useMemoizedFn(async () => {
    const res = await dispatch(addTopicAction(form.getFieldsValue())).unwrap()
    if (res.code == 200) {
      loadData(1)
      setCurrentPage(1)
      form.resetFields()
    }
  })

  return (
    <TopicWrapper className="relative flex flex-col">
      <div className="h-[168px] px-40px py-20px rounded-[12px] bg-white">
        <h2 className="flex items-center">
          <Icon icon="icon-park-outline:topic-discussion" className="text-[var(--hover-color)] text-[30px]" />
          <div className="ml-[8px] relative top-[-1px]">话题管理</div>
        </h2>
        <Form size="large" form={form}>
          <div className="flex">
            <Form.Item name="content" label={<div className="font-600 text-[18px]">话题</div>} className="flex-1">
              <Input />
            </Form.Item>
            <Button type="primary" icon={<EditFilled />} className="ml-[20px]" onClick={handleAdd}>
              添加
            </Button>
          </div>
        </Form>
      </div>
      <div className="mt-16px flex-1 overflow-y-auto">
        <List
          grid={{
            gutter: 34,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item className="shadow-lg">
              <Card
                style={{ marginTop: 16 }}
                actions={[
                  <EditOutlined key="setting" onClick={() => handleEdit(item.id)} />,
                  <DeleteOutlined key="delete" onClick={() => handleDeleteShow(item.id)} />
                ]}>
                <Meta
                  avatar={<Icon icon="icon-park-solid:topic" className="text-[var(--hover-color)] text-[30px]" />}
                  title={
                    item.id == editId ? (
                      <Input defaultValue={item.content} onBlur={(e) => handleEditBlur(e, item.id)} />
                    ) : (
                      <div className="h-32px leading-32px">{item.content}</div>
                    )
                  }
                  description={<div>被引用数：{item.count}</div>}
                />
              </Card>
            </List.Item>
          )}></List>
        {data?.length == 0 && <Empty />}
      </div>

      <div className="py-40px center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalCount}
          onChange={handlePageChange}
          showTotal={(total) => `总共 ${total} 条数据`}
          showSizeChanger={false}
        />
      </div>

      <AppConfirmModal
        title={
          <div className="flex items-center">
            <ExclamationCircleOutlined className="text-red" />
            <span className="ml-8px">删除话题提醒</span>
          </div>
        }
        onConfirm={handleDeleteConfirm}
        ref={appModalRef}>
        <div className="py-10px">删除此话题后，被引用的文章将被清除，请慎重。</div>
      </AppConfirmModal>
    </TopicWrapper>
  )
}

export default memo(Topic)
