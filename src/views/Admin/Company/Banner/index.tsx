/*
 * @Author: hqk
 * @Date: 2023-04-14 22:53:23
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-29 10:00:25
 * @Description:
 */
import React, { ElementRef, memo, useEffect, useMemo, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { BannerWrapper } from './style'
import AppUploadImage from '@/components/AppUploadImage'
import { Button, Form, Input, Modal } from 'antd'
import { useCreation, useMemoizedFn } from 'ahooks'
import { useAppDispatch } from '@/hooks/useAppRedux'
import { getBannerDetailAction, removeBannerImageAction, saveBannerAction } from '@/store'

interface IProps {
  children?: ReactNode
}

const Banner: FC<IProps> = () => {
  const [form] = Form.useForm()

  const appUploadRef = useRef<ElementRef<typeof AppUploadImage>>(null)
  const dispatch = useAppDispatch()
  const [isDisabled, setIsDisabled] = useState(false)

  const handleRemove = useMemoizedFn(async () => {
    await dispatch(removeBannerImageAction())
  })

  const onFinish = async (values: any) => {
    try {
      await form.validateFields()
      const size = appUploadRef.current?.getSize()
      if (size == 0) {
        Modal.error({ content: '轮播图不能为空' })
        return
      }
      const res = await dispatch(saveBannerAction(form.getFieldsValue())).unwrap()
      if (res.code == 200) {
        setIsDisabled(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onReset = () => {
    form.resetFields()
    appUploadRef.current?.setImages([])
  }

  useEffect(() => {
    dispatch(getBannerDetailAction())
      .unwrap()
      .then((res) => {
        if (res.code == 200) {
          form.setFieldsValue(res.data.data)
          if (res.data.data.imgUrl) {
            setIsDisabled(true)
            appUploadRef.current?.setImages([res.data.data.imgUrl])
          }
        }
      })
  }, [])

  const onEdit = useMemoizedFn(() => {
    setIsDisabled(false)
  })

  return (
    <BannerWrapper className="center ">
      <div className="bg-white  w-[500px] px-40px py-30px">
        <Form form={form} layout="horizontal" labelCol={{ flex: '100px' }} wrapperCol={{ span: 20 }} disabled={isDisabled}>
          <Form.Item label="跳转链接" name="govUrl" rules={[{ message: 'url不能为空', required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="轮播图">
            <AppUploadImage
              listType="picture-card"
              maxCount={1}
              disabled={isDisabled}
              ref={appUploadRef}
              action={import.meta.env.VITE_BASE_URL + '/company/banner/upload'}
              onRemove={handleRemove}
            />
          </Form.Item>
        </Form>
        <div className="center">
          {isDisabled ? (
            <Button type="primary" className="mr-10px" onClick={onEdit}>
              编辑
            </Button>
          ) : (
            <Button type="primary" className="mr-10px" onClick={onFinish} disabled={isDisabled}>
              提交
            </Button>
          )}
          <Button onClick={onReset} className="ml-10px" disabled={isDisabled}>
            重置
          </Button>
        </div>
      </div>
    </BannerWrapper>
  )
}

export default memo(Banner)
