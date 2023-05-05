import React, { ElementRef, memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { StudentWrapper } from './style'
import AppPage from '@/components/AppPage'
import { searchConfig } from './config/search.config'
import { Button, Col, Form, Input, Row, TreeSelect, Steps, UploadFile } from 'antd'
import { tableConifg } from './config/table.config'
import { useCreation, useMemoizedFn } from 'ahooks'
import { useRulesConfig } from './config/rule.config'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { getMajorTreeListAction } from '@/store/features/common'
import { CustomFormItem } from '@/types/common'
import { DownloadOutlined, FileExcelOutlined } from '@ant-design/icons'
import AppConfirmModal from '@/components/AppConfirmModal'
import AppUpload from '@/components/AppUpload'
import { batchAddAction } from '@/store/features/admin'

interface IProps {
  children?: ReactNode
}

const { accountRules, emailRules, nickNameRules, phoneRules, userNameRules } = useRulesConfig()

const Student: FC<IProps> = () => {
  const [current, setCurrent] = useState(0)
  const [majorId, setMajorId] = useState<number>()
  const [file, setFile] = useState<UploadFile>()
  const [isFirst, setIsFirst] = useState(true)

  const { items } = searchConfig
  const dispatch = useAppDispatch()

  const studentRef = useRef<HTMLDivElement | null>(null)
  const appModalRef = useRef<ElementRef<typeof AppConfirmModal>>(null)

  const { majorTreeList, userId } = useAppSelector((state) => {
    return {
      majorTreeList: state.common.marjorTreeList,
      userId: state.login.loginUser.id
    }
  }, useAppShallowEqual)

  useEffect(() => {
    dispatch(getMajorTreeListAction(userId))
  }, [])

  const majorTreeSelect: CustomFormItem = useCreation(() => {
    return {
      type: 'tree',
      label: '专业',
      name: 'majorId',
      treeData: majorTreeList
    }
  }, [majorTreeList])

  const handleExcelOpen = useMemoizedFn(() => {
    console.log(11)
    appModalRef.current?.show()
  })

  const handleExcelConfirm = useMemoizedFn(async () => {
    const form = new FormData()
    form.append('file', file as any)
    const res = await dispatch(batchAddAction({ file: form, majorId: majorId! })).unwrap()
    if (res.code == 200) {
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  })

  const handleModalCancel = useMemoizedFn(() => {
    setCurrent(0)
    setFile(undefined)
    setIsFirst(true)
  })

  const handleMajorChange = useMemoizedFn((value) => {
    setMajorId(value)
    if (isFirst) {
      setCurrent(1)
      setIsFirst(false)
    }
  })

  const handleReceiveFile = useMemoizedFn((file: UploadFile) => {
    setFile(file)
    setCurrent(2)
  })

  const handleFileRemove = useMemoizedFn(() => {
    setCurrent(1)
    setFile(undefined)
  })

  return (
    <StudentWrapper ref={studentRef}>
      <AppPage
        title="学生列表"
        userId={userId}
        searchConfig={{ items: [...items.slice(0, 4), majorTreeSelect, ...items.slice(4)] }}
        tableConfig={tableConifg}
        editComponent={
          <Button type="primary" className="mr-[8px]" icon={<FileExcelOutlined />} onClick={handleExcelOpen}>
            Excel导入
          </Button>
        }
        addAndEdit={(form, isEdit) => (
          <>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="account" label="帐号" rules={accountRules}>
                  <Input placeholder="请输入4到16位（字母，数字，下划线，减号）" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="nickName" label="用户名" rules={nickNameRules}>
                  <Input placeholder="请输入2到14位的字符" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="userName" label="姓名" rules={userNameRules}>
                  <Input placeholder="请输入中文字符" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="telephone" label="手机号码" rules={phoneRules}>
                  <Input placeholder="请输入手机号码" />
                </Form.Item>
              </Col>
            </Row>
            {isEdit ? (
              <Form.Item name="email" label="邮箱" rules={emailRules}>
                <Input placeholder="请输入邮箱" />
              </Form.Item>
            ) : (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="email" label="邮箱" rules={emailRules}>
                    <Input placeholder="请输入邮箱" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="password" label="密码">
                    <Input placeholder="此处可不填，默认密码为123456" />
                  </Form.Item>
                </Col>
              </Row>
            )}

            <Col span={24}>
              <Form.Item name="majorId" label="所在专业">
                <TreeSelect
                  treeData={majorTreeList?.map((item) => ({ ...item, disabled: true }))}
                  getPopupContainer={() => (studentRef.current ? studentRef.current : document.body)}
                  allowClear
                  treeLine
                  treeNodeFilterProp="title"></TreeSelect>
              </Form.Item>
            </Col>
          </>
        )}
      />
      <AppConfirmModal
        title="Excel导入"
        onConfirm={handleExcelConfirm}
        ref={appModalRef}
        disabled={current != 2}
        onCancel={handleModalCancel}>
        <div className="p-[10px]">
          <Steps
            direction="vertical"
            current={current}
            items={[
              {
                title: '所在专业:',
                description: (
                  <TreeSelect
                    treeData={majorTreeList?.map((item) => ({ ...item, disabled: true }))}
                    className="w-full"
                    getPopupContainer={() => (studentRef.current ? studentRef.current : document.body)}
                    treeLine
                    onChange={handleMajorChange}
                    treeNodeFilterProp="title"></TreeSelect>
                )
              },
              {
                title: 'Excel文件:',
                description: (
                  <AppUpload accept=".xls,.xlsx" control onFile={handleReceiveFile} onRemove={handleFileRemove} disabled={isFirst} />
                )
              }
            ]}
          />
          <Button icon={<DownloadOutlined />} type="link" href="https://hqk10.oss-cn-hangzhou.aliyuncs.com/2023/04/03/模板.xlsx">
            模板 点击此处进行下载
          </Button>
        </div>
      </AppConfirmModal>
    </StudentWrapper>
  )
}

export default memo(Student)
