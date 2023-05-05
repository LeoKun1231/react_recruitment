/*
 * @Author: hqk
 * @Date: 2023-04-04 16:03:44
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-07 10:32:44
 * @Description:
 */
import React, { ElementRef, forwardRef, memo, useImperativeHandle, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import AppConfirmModal from '../AppConfirmModal'
import { useMemoizedFn } from 'ahooks'
import { useAppDispatch } from '@/hooks/useAppRedux'
import { Input, Form } from 'antd'
import { reportByIdAction } from '@/store/features/admin'

interface IProps {
  children?: ReactNode
  id: number
  isArticle: boolean
}

interface IHandler {
  show: () => void
}

const AppReportConfirm = forwardRef<IHandler, IProps>((props, ref) => {
  const { id, isArticle } = props
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const appModalRef = useRef<ElementRef<typeof AppConfirmModal>>(null)

  const handleConfirm = useMemoizedFn(async () => {
    const reason = form.getFieldValue('reason')
    let res = null
    if (isArticle) {
      res = await dispatch(reportByIdAction({ data: { articleId: id, reason }, page: 'article' })).unwrap()
    } else {
      res = await dispatch(reportByIdAction({ data: { commentId: id, reason }, page: 'comment' })).unwrap()
    }
    if (res.code == 200) {
      form.resetFields()
      return Promise.resolve()
    }
    return Promise.reject()
  })

  useImperativeHandle(
    ref,
    useMemoizedFn(() => {
      return {
        show() {
          appModalRef.current?.show()
        }
      }
    }),
    []
  )

  return (
    <AppConfirmModal title="举报" onConfirm={handleConfirm} ref={appModalRef}>
      <div className="p-[10px]">
        <Form form={form}>
          <Form.Item name="reason" label="原因">
            <Input.TextArea showCount maxLength={50} />
          </Form.Item>
        </Form>
      </div>
    </AppConfirmModal>
  )
})

export default memo(AppReportConfirm)
