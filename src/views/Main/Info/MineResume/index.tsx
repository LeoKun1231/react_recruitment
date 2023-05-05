/*
 * @Author: hqk
 * @Date: 2023-04-17 10:40:04
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-17 12:32:39
 * @Description:
 */
import React, { ElementRef, memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { MineResumeWrapper } from './style'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { Button, Modal, message, Upload } from 'antd'
import { MonitorOutlined, PaperClipOutlined, InboxOutlined, FilePdfOutlined, LeftOutlined } from '@ant-design/icons'
import { useCreation, useMemoizedFn } from 'ahooks'
import AppPDFView from '@/components/AppPDFView'
import {} from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { getResumeURLAction } from '@/store'

interface IProps {
  children?: ReactNode
}

const { Dragger } = Upload
const MineResume: FC<IProps> = () => {
  const [url, setURL] = useState('')
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const dispatch = useAppDispatch()
  const [isShowUpload, setIsShowUpload] = useState(false)
  const [hasResume, setHasResume] = useState(false)

  const mineResumeRef = useRef<HTMLDivElement>(null)

  const { token } = useAppSelector((state) => {
    return {
      token: state.login.loginUser.token
    }
  }, useAppShallowEqual)

  useEffect(() => {
    dispatch(getResumeURLAction())
      .unwrap()
      .then((res) => {
        if (res.code == 200) {
          setURL(res.data.url)
          setHasResume(true)
        } else {
          setIsShowUpload(true)
          setHasResume(false)
        }
      })
  }, [])
  const handleOpenResume = useMemoizedFn(() => {
    setIsResumeOpen(true)
  })

  const handleResumeOk = () => {
    setIsResumeOpen(false)
  }

  const handleResumeCancel = () => {
    setIsResumeOpen(false)
  }

  const handleShowUpload = useMemoizedFn(() => {
    setIsShowUpload(true)
  })

  const handleBack = useMemoizedFn(() => {
    setIsShowUpload(false)
  })

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    accept: '.pdf',
    maxCount: 1,
    headers: {
      Authorization: 'Bearer ' + token
    },
    action: import.meta.env.VITE_BASE_URL + '/home/upload/resume',
    onChange(info) {
      const { status } = info.file
      if (status === 'error') {
        message.error(`${info.file.name} 上传失败.`)
      }
      if (status === 'done') {
        message.success('上传简历成功')
        dispatch(getResumeURLAction())
          .unwrap()
          .then((res) => {
            if (res.code == 200) {
              setURL(res.data.url)
              setHasResume(true)
              setIsShowUpload(false)
            }
          })
      }
    }
  }

  return (
    <MineResumeWrapper className="h-full">
      <div ref={mineResumeRef} className="h-full">
        {isShowUpload ? (
          <div className="h-full px-20px py-20px">
            <div className="mb-10px w-[70%] flex items-center justify-start">
              {hasResume && (
                <Button type="link" icon={<LeftOutlined />} onClick={handleBack}>
                  返回
                </Button>
              )}
            </div>
            <div className="center h-[calc(100%-62px)]">
              <div className="h-[50%] w-[70%]">
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <FilePdfOutlined />
                  </p>
                  <p className="ant-upload-text">点击上传或拖拽PDF到此处</p>
                  <p className="ant-upload-hint">仅支持pdf上传</p>
                </Dragger>
              </div>
            </div>
          </div>
        ) : (
          <div className="center h-full">
            <Button icon={<PaperClipOutlined />} size="large" className="mr-10px" onClick={handleShowUpload}>
              替换简历
            </Button>
            <Button type="primary" icon={<MonitorOutlined />} size="large" className="ml-10px" onClick={handleOpenResume}>
              查看简历
            </Button>
          </div>
        )}
        <Modal
          title="简历详情"
          width={1000}
          zIndex={1002}
          open={isResumeOpen}
          wrapClassName="resume-detail"
          onOk={handleResumeOk}
          onCancel={handleResumeCancel}
          getContainer={() => mineResumeRef.current as any}>
          <AppPDFView file={url} />
        </Modal>
      </div>
    </MineResumeWrapper>
  )
}

export default memo(MineResume)
