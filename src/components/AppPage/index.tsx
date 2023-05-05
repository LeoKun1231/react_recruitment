/*
 * @Author: hqk
 * @Date: 2023-03-24 13:02:02
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-29 09:59:05
 * @Description:
 */
import React, { ElementRef, forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { AppPageWrapper } from './style'
import AppFormSearch from '@/components/AppFormSearch'
import { Button, Form, FormInstance, message } from 'antd'
import { DeleteOutlined, UserAddOutlined } from '@ant-design/icons'
import AppPageContent from '@/components/AppPageContent'
import { useMemoizedFn } from 'ahooks'
import AppDrawer from '@/components/AppDrawer'
import { useAppDispatch } from '@/hooks/useAppRedux'
import {
  addDataAction,
  batchDeleteDataAction,
  changeSeachParamsAction,
  checkAdminPhoneAction,
  getDataListAction,
  resetPageAction,
  updateDataByIdAction
} from '@/store/features/admin'
import classNames from 'classnames'
import AppConfirmModal from '@/components/AppConfirmModal'
import { ISearchConfig, ITableConfig } from '@/types/common'

interface IProps {
  children?: ReactNode
  searchConfig: ISearchConfig
  tableConfig: ITableConfig<any>
  title: string
  userId?: number
  height?: number | string
  onEdit?: (id: string) => void
  onAdd?: () => void
  placement?: 'left' | 'right' | 'top' | 'bottom' | undefined
  isShowExtra?: boolean
  isShowAdd?: boolean
  addAndEdit?: (form: FormInstance, isEdit: boolean) => ReactNode
  topAdd?: () => ReactNode
  editComponent?: ReactNode
}
interface IHandler {
  close: () => void
}

const AppPage = forwardRef<IHandler, IProps>((props, ref) => {
  const {
    searchConfig,
    tableConfig,
    title,
    addAndEdit,
    userId,
    editComponent,
    height,
    placement,
    topAdd,
    isShowExtra,
    onEdit,
    onAdd,
    isShowAdd
  } = props
  const { page, columns, isFullPage } = tableConfig

  const [, setIsSelect] = useState(false)
  const [deleteClass, setDeleteClass] = useState(['display-none'])
  const [addClass, setAddClass] = useState([''])
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState(-1)

  const drawerRef = useRef<ElementRef<typeof AppDrawer>>(null)
  const appPageContentRef = useRef<ElementRef<typeof AppPageContent>>(null)
  const appConfirmModalRef = useRef<ElementRef<typeof AppConfirmModal>>(null)
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()

  //搜索
  const handleSearch = useMemoizedFn(async (data: any) => {
    let obj = null
    if (userId) {
      obj = { page: page!, data: { ...data, userId }, isFullPage }
    } else {
      obj = { page: page!, data, isFullPage }
    }
    dispatch(changeSeachParamsAction(data))
    const res = await dispatch(getDataListAction(obj)).unwrap()
    if (res.code == 200) {
      dispatch(resetPageAction())
    }
  })

  //打开添加修改
  const handleAdd = useMemoizedFn(() => {
    setIsEdit(false)
    onAdd && onAdd()
    form.resetFields()
    drawerRef.current?.showDrawer()
  })

  //添加/修改确认
  const handleDrawerConfirm = useMemoizedFn(async () => {
    if (!isEdit) {
      try {
        await form.validateFields()

        const telephone = form.getFieldValue('telephone')
        if (telephone) {
          const res = await dispatch(checkAdminPhoneAction(telephone)).unwrap()
          if (res.code != 200) {
            return Promise.reject()
          }
        }

        const res = await dispatch(addDataAction({ page, data: form.getFieldsValue(), isFullPage })).unwrap()
        if (res.code == 200) {
          form.resetFields()
          return Promise.resolve()
        } else {
          return Promise.reject()
        }
      } catch (error) {
        return Promise.reject()
      }
    } else {
      try {
        await form.validateFields()
        const telephone = form.getFieldValue('telephone')
        if (telephone) {
          const res = await dispatch(checkAdminPhoneAction(telephone)).unwrap()
          if (res.code != 200) {
            return Promise.reject()
          }
        }
        const res = await dispatch(updateDataByIdAction({ page, isFullPage, data: { ...form.getFieldsValue(), id: editId } })).unwrap()
        if (res.code == 200) {
          form.resetFields()
          setIsEdit(false)
          setEditId(-1)
          return Promise.resolve()
        } else {
          return Promise.reject()
        }
      } catch (error) {
        return Promise.reject()
      }
    }
  })

  //批量删除选中
  const handleSelect = useMemoizedFn((isSelect: boolean) => {
    if (isSelect) {
      setAddClass([' transition-transform  -translate-x-100px ease-in-out duration-700'])
      setTimeout(() => {
        setDeleteClass(['absolute animate-fade-in'])
      }, 700)
    } else {
      setDeleteClass(['absolute  animate-fade-out duration-500'])
      setTimeout(() => {
        setDeleteClass(['display-none'])
        setAddClass(['transition-transform  translate-x-0px ease-in-out duration-500'])
      }, 500)
    }
    setIsSelect(isSelect)
  })

  //打开确认页面
  const handleBatchDelte = useMemoizedFn(() => {
    appConfirmModalRef.current?.show()
  })

  //批量删除确认
  const handleBatchDelteConfirm = useMemoizedFn(async () => {
    const res = await dispatch(
      batchDeleteDataAction({ page, isFullPage, ids: appPageContentRef.current?.getSelects() as number[] })
    ).unwrap()
    if (res.code == 200) {
      appPageContentRef.current?.clear()
      return Promise.resolve()
    }
    return Promise.reject()
  })

  //打开编辑
  const handleEdit = useMemoizedFn(async (data: any) => {
    setIsEdit(true)
    setEditId(data.id)

    const newValue = { ...data }
    drawerRef.current?.showDrawer()

    if (onEdit) {
      onEdit(data.id)
      return
    }
    //判断是否是管理员
    if (newValue.majorIds?.includes(1)) {
      newValue.majorIds = []
    }
    form.setFieldsValue({ ...newValue })
  })

  useEffect(() => {
    return () => {
      dispatch(changeSeachParamsAction({}))
      dispatch(resetPageAction())
    }
  }, [])

  useImperativeHandle(
    ref,
    () => {
      return {
        close() {
          drawerRef.current?.close()
        }
      }
    },
    []
  )

  return (
    <AppPageWrapper>
      <AppFormSearch searchConfig={searchConfig} onSearch={handleSearch} />
      <div className="mt-[16px] pt-[24px] px-[36px] bg-white rounded-[8px] shadow-lg h-[calc(100%-266px)]">
        <div className="between pb-[16px]">
          <h2 className="p-0 m-0">{title}</h2>
          <div className="flex">
            <div className={classNames(addClass)}>
              {editComponent}
              {isShowAdd && (
                <>
                  <Button type="primary" icon={<UserAddOutlined />} onClick={handleAdd} className="mr-[8px]">
                    新 建
                  </Button>
                  <Button type="primary" icon={<DeleteOutlined />} className={classNames(deleteClass)} onClick={handleBatchDelte}>
                    删 除
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        <AppPageContent
          ref={appPageContentRef}
          isFullPage={isFullPage}
          userId={userId}
          title={page}
          columns={columns}
          onSelect={handleSelect}
          onEdit={handleEdit}
          isShowEdit={isShowAdd}
        />
      </div>
      <AppDrawer ref={drawerRef} onConfirm={handleDrawerConfirm} height={height} placement={placement} isShowExtra={isShowExtra}>
        <Form layout="vertical" form={form}>
          {addAndEdit && addAndEdit(form, isEdit)}
        </Form>
        {topAdd && topAdd()}
      </AppDrawer>
      <AppConfirmModal ref={appConfirmModalRef} title="提示" onConfirm={handleBatchDelteConfirm}>
        <h4>你是否确定删除选中的数据？</h4>
      </AppConfirmModal>
    </AppPageWrapper>
  )
})

AppPage.defaultProps = {
  isShowAdd: true
}

export default memo(AppPage)
