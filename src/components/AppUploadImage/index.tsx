import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { AppUploadImageWrapper } from './style'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Modal, Upload } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile, UploadListType } from 'antd/es/upload/interface'
import { useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { v4 } from 'uuid'

interface IProps {
  children?: ReactNode
  maxCount?: number
  className?: string
  action: string
  disabled?: boolean
  listType: UploadListType
  onRemove?: (url: any) => Promise<boolean | void> | boolean | void
  onSuccess?: (url: any) => void
}

interface IHandler {
  clear: () => void
  setImages: (images: UploadFile[]) => void
  getSize: () => number
}

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>上传</div>
  </div>
)

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const AppUploadImage = forwardRef<IHandler, IProps>((props, ref) => {
  const { maxCount, className, action, listType, onRemove, disabled, onSuccess } = props

  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleCancel = () => setPreviewOpen(false)

  const { token } = useAppSelector((state) => {
    return {
      token: state.login.loginUser.token
    }
  }, useAppShallowEqual)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList, file }) => {
    if (file.status === 'done') {
      onSuccess && onSuccess(file.response.data.url)
    }
    setFileList(newFileList)
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        clear() {
          setFileList([])
        },
        setImages(images) {
          const imgs = images.map((item) => {
            return {
              uid: v4(),
              name: 'imgae',
              url: item,
              status: 'done'
            }
          })
          setFileList(imgs as any)
        },
        getSize() {
          return fileList.length
        }
      }
    },
    [fileList]
  )

  return (
    <AppUploadImageWrapper className={className}>
      <Upload
        action={action}
        accept="image/*"
        listType={listType}
        headers={{
          Authorization: 'Bearer ' + token
        }}
        disabled={disabled}
        maxCount={maxCount}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={onRemove}>
        {fileList.length >= (maxCount ?? 9) ? null : uploadButton}
      </Upload>

      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </AppUploadImageWrapper>
  )
})

export default memo(AppUploadImage)
