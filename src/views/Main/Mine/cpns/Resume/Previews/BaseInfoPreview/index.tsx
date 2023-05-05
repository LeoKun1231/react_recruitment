/*
 * @Author: hqk
 * @Date: 2023-03-19 15:37:00
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-22 19:01:28
 * @Description:
 */
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import ImgCrop from 'antd-img-crop'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { Upload, Modal } from 'antd'
import { BaseInfoPreviewWrapper } from './style'
import { useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { v4 as uuidv4 } from 'uuid'
interface IProps {
  children?: ReactNode
  onClick: () => void
  className?: string
}

const BaseInfoPreview: FC<IProps> = (props) => {
  const { onClick, className } = props
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ])

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }
  const handleCancel = () => setPreviewOpen(false)

  const { data, templateId, token } = useAppSelector((state) => {
    return {
      data: state.resume.baseInfo,
      templateId: state.resume.templateId,
      token: state.login.loginUser.token
    }
  }, useAppShallowEqual)

  return (
    <BaseInfoPreviewWrapper onClick={onClick} className={className}>
      {
        <div className="baseInfo flex">
          <div className="flex-1 left ">
            {data.job && <h3 className="p-0 m-0">{'期望岗位：' + data.job}</h3>}
            {data.name && <h3 className="p-0 m-0">{data.name}</h3>}
            <div className="flex ">
              {data.telephone && <div className="item">{data.telephone}</div>}
              {data.email && <div className="item">{data.email}</div>}
              {data.likeCity && <div className="item">{data.likeCity}</div>}
            </div>
            <div className="flex ">
              {data.years && <div className="item">{data.years}岁</div>}
              {data.sex && <div className="item">{data.sex}</div>}
              {data.politics && <div className="item">{data.politics}</div>}
            </div>
            <div className="flex flex-wrap ">
              {data.customs.map((item) => {
                return (
                  <div className="item break-words !max-w-[600px]" key={uuidv4()}>
                    {item}
                  </div>
                )
              })}
            </div>
            <div className="mask"></div>
          </div>

          <div className="w-[80px]">
            <ImgCrop rotationSlider>
              <Upload
                action="http://localhost:8222/oss/upload"
                listType="picture-card"
                headers={{
                  Authorization: 'Bearer ' + token
                }}
                fileList={fileList}
                onChange={onChange}
                onPreview={handlePreview}>
                {fileList.length < 1 && '请上传头像'}
              </Upload>
            </ImgCrop>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </div>
      }
    </BaseInfoPreviewWrapper>
  )
}

export default memo(BaseInfoPreview)
