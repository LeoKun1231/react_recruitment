/*
 * @Author: hqk
 * @Date: 2023-04-02 13:57:08
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-02 17:45:43
 * @Description:
 */
import React, { ElementRef, memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { MajorWrapper } from './style'
import { Button, Form, Input, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { TableRowSelection } from 'antd/es/table/interface'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { addMajorAction, deleteMajorsAction, getAllMajorTreeListAction, updateMajorByIdAction } from '@/store/features/common'
import { ITree } from '@/types/common'
import { FileAddOutlined, EditOutlined } from '@ant-design/icons'
import { useCreation, useMemoizedFn } from 'ahooks'
import AppConfirmModal from '@/components/AppConfirmModal'
interface IProps {
  children?: ReactNode
}

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<ITree> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}

const Major: FC<IProps> = () => {
  const [id, setId] = useState(-1)
  const [isTopAdd, setIsTopAdd] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [editName, setEditName] = useState('')

  const appModal = useRef<ElementRef<typeof AppConfirmModal>>(null)
  const appDeleteModal = useRef<ElementRef<typeof AppConfirmModal>>(null)
  const [form] = Form.useForm()

  const { allMarjorTreeList } = useAppSelector((state) => {
    return {
      allMarjorTreeList: state.common.allMarjorTreeList
    }
  }, useAppShallowEqual)
  const dispatch = useAppDispatch()

  const handleAdd = useMemoizedFn((value: number) => {
    setId(value)
    setIsTopAdd(false)
    appModal.current?.show()
  })

  const handleAddGrade = useMemoizedFn(() => {
    setId(1)
    setIsTopAdd(true)
    appModal.current?.show()
  })

  const handleEdit = useMemoizedFn((value: number, title: string, children: any) => {
    setId(value)
    setEditName(title)
    form.setFieldValue('majorName', title)
    if (children) {
      setIsTopAdd(true)
    } else {
      setIsTopAdd(false)
    }
    appModal.current?.show()
  })

  const handleAddAndEditConfirm = useMemoizedFn(async () => {
    if (editName != '') {
      //是编辑
      try {
        await form.validateFields()
        const res = await dispatch(updateMajorByIdAction({ id: id, majorName: form.getFieldValue('majorName') })).unwrap()
        if (res.code == 200) {
          form.resetFields()
          setIsTopAdd(false)
          setId(-1)
          setEditName('')
          return Promise.resolve()
        }
        return Promise.reject()
      } catch (error) {
        return Promise.reject()
      }
    } else {
      //是添加
      try {
        await form.validateFields()
        const res = await dispatch(addMajorAction({ parentId: id, majorName: form.getFieldValue('majorName') })).unwrap()
        if (res.code == 200) {
          form.resetFields()
          setIsTopAdd(false)
          setId(-1)
          return Promise.resolve()
        }
        return Promise.reject()
      } catch (error) {
        return Promise.reject()
      }
    }
  })

  const handleSelectChange = useMemoizedFn((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  })

  const handleDelete = useMemoizedFn(() => {
    appDeleteModal.current?.show()
  })

  const handleDeleteConfirm = useMemoizedFn(async () => {
    try {
      const res = await dispatch(deleteMajorsAction(selectedRowKeys as number[])).unwrap()
      if (res.code == 200) {
        setSelectedRowKeys([])
        return Promise.resolve()
      }
      return Promise.reject()
    } catch (error) {
      return Promise.reject()
    }
  })
  const columns: ColumnsType<ITree> = useCreation(() => {
    return [
      {
        title: '专业名',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        width: 200,
        render: (_, { title, value, children }) => {
          return (
            <div>
              {children && (
                <Button type="link" icon={<FileAddOutlined />} onClick={(e) => handleAdd(value)}>
                  添加
                </Button>
              )}
              <Button type="link" icon={<EditOutlined />} onClick={(e) => handleEdit(value, title, children)}>
                修改
              </Button>
            </div>
          )
        }
      }
    ]
  }, [])

  useEffect(() => {
    dispatch(getAllMajorTreeListAction())
  }, [])

  return (
    <MajorWrapper>
      <div className="rounded-[12px] shadow-lg mb-[20px] bg-white px-[20px] py-[20px] h-[calc(100vh-78px-10px)]">
        <div className="mb-20px flex justify-end">
          <Button type="primary" icon={<FileAddOutlined />} onClick={handleAddGrade}>
            新建系别
          </Button>
          <Button type="primary" icon={<FileAddOutlined />} className="ml-[10px]" onClick={handleDelete}>
            删除
          </Button>
        </div>
        <Table
          columns={columns}
          rowKey="value"
          dataSource={allMarjorTreeList}
          rowSelection={{
            onChange: handleSelectChange
          }}
          pagination={false}
          bordered
          scroll={{ y: 'calc(100vh - 240px)' }}
        />
      </div>
      <AppConfirmModal ref={appModal} title={isTopAdd ? '新建系别' : '新建专业'} onConfirm={handleAddAndEditConfirm}>
        <Form layout="vertical" form={form}>
          {isTopAdd ? (
            <Form.Item name="majorName" label="系名" rules={[{ required: true, message: '系名不能为空' }]}>
              <Input />
            </Form.Item>
          ) : (
            <Form.Item name="majorName" label="专业名" rules={[{ required: true, message: '专业名不能为空' }]}>
              <Input />
            </Form.Item>
          )}
        </Form>
      </AppConfirmModal>

      <AppConfirmModal ref={appDeleteModal} title="删除提醒" onConfirm={handleDeleteConfirm}>
        <h4>你是否确定删除选中的数据？</h4>
      </AppConfirmModal>
    </MajorWrapper>
  )
}

export default memo(Major)
