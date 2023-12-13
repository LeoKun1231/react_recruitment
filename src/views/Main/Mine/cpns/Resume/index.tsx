/*
 * @Author: hqk
 * @Date: 2023-03-16 10:33:31
 * @LastEditors: Leo
 * @LastEditTime: 2023-08-02 18:30:56
 * @Description:
 */
import React, { ChangeEvent, ElementRef, memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { ResumeWrapper } from './style'
import ResumeEditor from './ResumeEditor'
import ResumePreview from './ResumePreview'
import { TwitterPicker } from 'react-color'
import { Button, Popover, Modal, Input, notification, Dropdown, Form, message } from 'antd'
import { useCreation, useMemoizedFn } from 'ahooks'
import { EditorComponent, ROLECODE } from '@/constant'
import type { MenuProps } from 'antd'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { changeCustomListAction, changePreviewsAction, changeTemplateIdAction } from '@/store/features/resume'
import { v4 } from 'uuid'
import { outputPDF } from '@/utils/pdf'
import classNames from 'classnames'
import TemplatePreview from './ResumeSection/cpns/TemplatePreview'
import AppConfirmModal from '@/components/AppConfirmModal'
import { uploadResumeAction } from '@/store'
interface IProps {
  children?: ReactNode
}
const items: MenuProps['items'] = [
  {
    label: '公司经历',
    key: EditorComponent.COMPANY_EXPERIENCE
  },
  {
    label: '教育经历',
    key: EditorComponent.EDUCATION_INFO
  },
  {
    label: '专业技能',
    key: EditorComponent.MAJOR_SKILL
  },
  {
    label: '荣誉经历',
    key: EditorComponent.HONORARY_EXPERIENCE
  },
  {
    label: '校园经历',
    key: EditorComponent.SCHOOL_EXPERIENCE
  },
  {
    label: '技能/证书及其他',
    key: EditorComponent.SKILLS_CERTIFICATES_AND_MORE
  },
  {
    label: '自定义模块',
    key: 'custom'
  }
]

const Resume: FC<IProps> = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [color, setColor] = useState('')
  const [moduleName, setModuleName] = useState('')
  const [notify, contextHolder] = notification.useNotification()
  const [messageApi, messageHolder] = message.useMessage()
  const [componentName, setComponentName] = useState<EditorComponent>(EditorComponent.BASE_INFO)
  const [titleName, setTitleName] = useState<string>('自定义题目')
  const [id, setId] = useState<string>('')
  const [menus, setMenus] = useState<any[]>([])
  const [type, setType] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const appConfirmModal = useRef<ElementRef<typeof AppConfirmModal>>(null)

  const [form] = Form.useForm()

  const dispatch = useAppDispatch()

  const handleColorChange = useMemoizedFn((value: any) => {
    setIsOpen(false)
    setColor(value.hex)
    document.documentElement.style.setProperty('--resume-color', value.hex)
  })

  const { previews, customList, templateId, roleId } = useAppSelector((state) => {
    return {
      previews: state.resume.previews,
      customList: state.resume.customList,
      templateId: state.resume.templateId,
      roleId: state.login.loginUser.roleId
    }
  }, useAppShallowEqual)

  const handleOk = useMemoizedFn(() => {
    if (moduleName.length <= 1) {
      notify.error({
        message: '模块名不能少于两个字符',
        key: 'moduleName'
      })
      return
    }
    dispatch(
      changeCustomListAction([
        ...customList,
        {
          id: v4(),
          title: moduleName,
          text: '<p>请输入属于你自己的模块</p>'
        }
      ])
    )
    setIsModalOpen(false)
  })

  const handleCancel = useMemoizedFn(() => {
    setIsModalOpen(false)
  })

  const handleAddModule = useMemoizedFn((e: ChangeEvent<HTMLInputElement>) => {
    setModuleName(e.target.value)
  })

  const handleComponentChange = useMemoizedFn((name: EditorComponent, title?: string, idValue?: string) => {
    setComponentName(name)
    title && setTitleName(title)
    idValue && setId(idValue)
  })

  const handleMenuClick: MenuProps['onClick'] = useMemoizedFn((e) => {
    if (e.key == 'custom') {
      setModuleName('')
      setIsModalOpen(true)
      return
    }
    dispatch(changePreviewsAction([...previews, e.key]))
  })

  useEffect(() => {
    const arr = items.filter((item) => !previews?.includes(item?.key as any))
    setMenus(arr)
  }, [previews])

  const menuProps = useCreation(
    () => ({
      items: menus,
      onClick: handleMenuClick
    }),
    [menus]
  )
  const handleSave = useMemoizedFn(async () => {
    setType(1)
    appConfirmModal.current?.show()
  })
  const handleExport = useMemoizedFn(async () => {
    setType(2)
    appConfirmModal.current?.show()
  })

  const handleTemplateChange = useMemoizedFn((index: number) => {
    dispatch(changeTemplateIdAction(index))
  })

  const handleConfirm = useMemoizedFn(async () => {
    const title = form.getFieldValue('title')
    if (!title || title.trim() == '') {
      notify.error({ message: '文件名不能为空' })
      return Promise.reject()
    }

    const element = document.querySelector('.pdfExport')
    const header = document.querySelector('.pdf-header')
    const footer = document.querySelector('.pdf-footer')
    try {
      message.loading({ content: '正在上传中，请不要做任何操作' })
      const res = await outputPDF({
        element: element,
        footer: footer,
        header: header,
        filename: form.getFieldValue('title') + '.pdf',
        contentWidth: 592.28,
        isSave: type == 2
      })
      if (type == 1) {
        const formData = new FormData()
        formData.append('file', res as any)
        dispatch(uploadResumeAction(formData))
      }
      form.resetFields()
    } catch (error) {
      console.log(error)
    }
    return Promise.resolve()
  })

  return (
    <ResumeWrapper className={classNames({ 'mt-[12px]': templateId != 3 })}>
      {contextHolder}
      {messageHolder}
      <div className="content flex py-10px h-full">
        <ResumeEditor ComponentName={componentName} title={titleName} id={id} />
        <div>
          <div className="!w-[672px] ml-[568px] h-[40px] bg-white  shadow-2xl rounded-[8px] mb-[10px] flex justify-end items-center px-[24px]">
            <Popover
              placement="bottom"
              content={
                <TwitterPicker
                  color={color}
                  colors={['#254665', '#0693e3', '#8ed1fc', '#abb8c3', '#9900ef', '#339933', '#FF6666', '#99CCCC', '#009999', '#996699']}
                  className="!shadow-none [&>:nth-child(1)]:!border-none"
                  onChange={handleColorChange}
                />
              }
              trigger="click">
              <Button type="primary" ghost>
                修改主题颜色
              </Button>
            </Popover>
            <Button type="primary" ghost onClick={handleExport} className="mx-[10px]">
              导出
            </Button>
            {roleId == ROLECODE.STUDENT && (
              <Button type="primary" ghost onClick={handleSave} className="mr-10px">
                保存到我的简历
              </Button>
            )}
            <Popover placement="bottom" content={<TemplatePreview onChange={handleTemplateChange} />} trigger="click">
              <Button type="primary" ghost>
                更改模版
              </Button>
            </Popover>
            <Dropdown menu={menuProps} className="text-center">
              <Button type="primary" ghost className="mx-[10px]">
                添加模块
              </Button>
            </Dropdown>
          </div>
          <div className="h-full w-full ml-[548px] " id="pdfExport">
            <ResumePreview onChangeComponent={handleComponentChange} />
            <div
              className="pdf-header"
              style={{
                fontWeight: 'bold',
                padding: '15px 8px',
                width: '100%',
                color: 'rgba(0, 0, 0, 0.85)',
                position: 'fixed',
                top: '-100vh'
              }}></div>
            <div
              className="pdf-footer"
              style={{
                fontWeight: 'bold',
                padding: '15px 8px',
                width: '100%',
                color: 'rgba(0, 0, 0, 0.85)',
                position: 'fixed',
                top: '-100vh'
              }}></div>
          </div>
        </div>
        <Modal title="请添加模块名" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Input onChange={handleAddModule} maxLength={10} showCount value={moduleName} />
        </Modal>
      </div>
      <AppConfirmModal ref={appConfirmModal} title="请输入文件名" onConfirm={handleConfirm}>
        <Form className="py-20px" form={form}>
          <Form.Item name="title">
            <Input placeholder="例如：张三-Java工程师" />
          </Form.Item>
        </Form>
      </AppConfirmModal>
    </ResumeWrapper>
  )
}

export default memo(Resume)
