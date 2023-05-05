import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AppUploadWrapper } from './style'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd'
import { message, Upload } from 'antd'
import { useCreation } from 'ahooks'

interface IProps {
  children?: ReactNode
  action?: string
  accept: string
  control?: boolean
  disabled?: boolean
  onFile?: (file: UploadFile) => void
  onRemove?: () => void
}

const { Dragger } = Upload

const AppUpload: FC<IProps> = (props) => {
  const { accept, action, control, onFile, onRemove, disabled } = props

  const uploadProps: UploadProps = useCreation(() => {
    return {
      accept,
      multiple: false,
      maxCount: 1,
      action,
      beforeUpload(file) {
        if (file.size / 1024 / 1024 > 1024 * 1024 * 10) {
          message.error({
            content: '文件大小过大,请重新上传'
          })
          return Upload.LIST_IGNORE
        }
        onFile && onFile(file)
        return !control
      },
      onRemove() {
        onRemove && onRemove()
      }
    }
  }, [])

  return (
    <AppUploadWrapper>
      <Dragger {...uploadProps} disabled={disabled}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="text-gray m-0 p-0">点击或者拖拽文件到此</p>
        <p className="text-gray m-0 p-0 text-[12px]">文件大小不超过10MB</p>
      </Dragger>
    </AppUploadWrapper>
  )
}

export default memo(AppUpload)
