/*
 * @Author: hqk
 * @Date: 2023-04-10 09:49:59
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-29 21:48:00
 * @Description:
 */

import React, { ElementRef, memo, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { Form, Input, Steps } from 'antd'
import { useCreation, useMemoizedFn } from 'ahooks'
import AppDrawer from '@/components/AppDrawer'
import CompanyInfo from '@/views/Admin/Company/Detail/CompanyInfo'
import AppConfirmModal from '@/components/AppConfirmModal'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { checkCompanyAction, getDataListAction } from '@/store/features/admin'

interface IProps {
  children?: ReactNode
  value: number
  userId: number
}

const MySteps: FC<IProps> = (props) => {
  const { value, userId } = props

  const appDrawerRef = useRef<ElementRef<typeof AppDrawer>>(null)
  const appModalRef = useRef<ElementRef<typeof AppConfirmModal>>(null)

  const { pageSize, currentPage } = useAppSelector((state) => {
    return {
      pageSize: state.admin.pageSize,
      currentPage: state.admin.currentPage
    }
  }, useAppShallowEqual)

  const dispatch = useAppDispatch()
  const handleStepChange = useMemoizedFn(() => {
    if (value == 0 || value == 2) return
    appDrawerRef.current?.showDrawer()
  })

  const loadData = useMemoizedFn(() => {
    dispatch(getDataListAction({ page: 'boss', data: { pageSize, currentPage } }))
  })

  const StepItems = useCreation(() => {
    return [
      {
        title: '未完善资料',
        description: '未完善资料'
      },
      {
        title: '未审核',
        description: value != 1 ? '未审核' : '点击进行审核',
        onClick: handleStepChange
      },
      {
        title: value == 3 ? '审核不通过' : '已审核',
        description: value == 3 ? '审核不通过' : '已审核'
      }
    ]
  }, [value])

  const [form] = Form.useForm()

  const handleConfirm = useMemoizedFn(async () => {
    const res = await dispatch(checkCompanyAction({ id: userId, isSuccess: true })).unwrap()
    if (res.code == 200) {
      loadData()
      appDrawerRef.current?.close()
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  })

  const handleCancel = useMemoizedFn(() => {
    appModalRef.current?.show()
    return Promise.resolve()
  })

  const handleModalConfirm = useMemoizedFn(async () => {
    try {
      await form.validateFields()
      const res = await dispatch(checkCompanyAction({ id: userId, reason: form.getFieldValue('reason'), isSuccess: false })).unwrap()
      if (res.code == 200) {
        form.resetFields()
        setTimeout(() => {
          loadData()
          appDrawerRef.current?.close()
        }, 400)
        return Promise.resolve()
      } else {
        return Promise.reject()
      }
    } catch (error) {
      return Promise.reject()
    }
  })

  return (
    <>
      <Steps style={{ marginTop: 8 }} type="inline" current={value} status={value == 1 ? 'error' : 'process'} items={StepItems} />
      <AppDrawer
        ref={appDrawerRef}
        placement="top"
        okText="通过"
        onConfirm={handleConfirm}
        cancelText="不通过"
        noLogicCancel
        onCancel={handleCancel}
        height="100vh">
        <CompanyInfo userId={userId} disabled={true} />
      </AppDrawer>
      <AppConfirmModal ref={appModalRef} title="审核失败原因" onConfirm={handleModalConfirm}>
        <Form className="px-10px" form={form}>
          <Form.Item name="reason" rules={[{ message: '审核失败原因不能为空', required: true }]}>
            <Input.TextArea placeholder="请填写审核失败原因" style={{ resize: 'none' }} rows={4} maxLength={500} showCount />
          </Form.Item>
        </Form>
      </AppConfirmModal>
    </>
  )
}

export default memo(MySteps)
