/*
 * @Author: hqk
 * @Date: 2023-03-24 13:02:04
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-17 10:57:11
 * @Description:
 */
/*
 * @Author: hqk
 * @Date: 2023-04-10 14:02:10
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-10 22:26:09
 * @Description:
 */
import React, { memo, useState, useRef, ElementRef, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { JobWrapper } from './style'
import JobInfo from './JobInfo'
import AppPage from '@/components/AppPage'
import { searchConfig } from './config/search.config'
import { tableConifg } from './config/table.config'
import { useCreation, useMemoizedFn } from 'ahooks'
import { Button, Switch, Modal, List, Avatar } from 'antd'
import { changeJobStatusAction } from '@/store/features/admin'
import MyResumeBg from '@/assets/img/myresume_red.png'
import AppPDFView from '@/components/AppPDFView'

interface IProps {
  children?: ReactNode
}

interface Resume {
  url: string
  fileName: string
}

const { columns, page, isFullPage } = tableConifg
const Job: FC<IProps> = (props) => {
  const appPageRef = useRef<ElementRef<typeof AppPage>>(null)
  const jobInfoRef = useRef<ElementRef<typeof JobInfo>>(null)
  const [editId, setEditId] = useState('-1')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [resumeList, setResumeList] = useState<Resume[]>([])
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [url, setUrl] = useState('')
  const jobRef = useRef<ElementRef<typeof JobWrapper>>(null)

  const { userId } = useAppSelector((state) => {
    return {
      userId: state.login.loginUser.id
    }
  }, useAppShallowEqual)

  const close = () => {
    appPageRef.current?.close()
  }

  const handleEdit = useMemoizedFn((id: string) => {
    setEditId(id)
  })

  const handleAdd = useMemoizedFn(() => {
    setEditId('')
    jobInfoRef.current?.reset()
  })

  const dispatch = useAppDispatch()
  const handleChange = useMemoizedFn(async (id: string) => {
    await dispatch(changeJobStatusAction(id)).unwrap()
  })

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleResumeOk = () => {
    setIsResumeOpen(false)
  }

  const handleResumeCancel = () => {
    setIsResumeOpen(false)
  }
  const handleResume = useMemoizedFn((resumes: Resume[]) => {
    setIsModalOpen(true)
    setResumeList(resumes)
    console.log(resumes)
  })

  const handleOpenResume = useMemoizedFn((url: string) => {
    setIsResumeOpen(true)
    setUrl(url)
  })
  const getBlobFile = useMemoizedFn((url) => {
    return new Promise((resolve) => {
      const xReq = new XMLHttpRequest()
      xReq.open('GET', url, true)
      xReq.responseType = 'blob'
      xReq.onload = () => {
        if (xReq.status === 200) {
          resolve(xReq.response)
        }
      }
      xReq.send()
    })
  })

  const handleDownload = useMemoizedFn((url: string, fileName: string) => {
    getBlobFile(url).then((blob) => {
      const a = document.createElement('a')
      a.href = window.URL.createObjectURL(blob as any)
      a.download = fileName
      a.click()
      a.remove()
    })
  })

  const customColumns = useCreation(() => {
    return [
      ...columns,
      {
        title: '是否招聘',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: 120,
        ellipsis: true,
        fixed: 'right',
        render(value: any, { id }: any) {
          return (
            <Switch
              checkedChildren="招聘中"
              unCheckedChildren="停止招聘"
              defaultChecked={value == 1}
              onChange={() => handleChange(id)}
              key={id}
            />
          )
        }
      },
      {
        title: '简历列表',
        dataIndex: 'resume',
        key: 'resume',
        align: 'center',
        width: 120,
        ellipsis: true,
        fixed: 'right',
        render(resume: Resume[]) {
          return (
            resume?.length > 0 && (
              <Button type="link" onClick={() => handleResume(resume)}>
                查看
              </Button>
            )
          )
        }
      }
    ]
  }, [])

  return (
    <>
      <JobWrapper ref={jobRef as any}>
        <AppPage
          title="岗位"
          ref={appPageRef}
          userId={userId}
          height="100vh"
          placement="top"
          isShowExtra={false}
          searchConfig={searchConfig}
          tableConfig={{ columns: customColumns as any, page, isFullPage }}
          onAdd={handleAdd}
          onEdit={handleEdit}
          topAdd={() => <JobInfo close={close} jobId={editId} ref={jobInfoRef} />}
        />
        <Modal
          title="简历列表"
          zIndex={1001}
          open={isModalOpen}
          onOk={handleOk}
          destroyOnClose
          wrapClassName="resume-list"
          onCancel={handleCancel}
          getContainer={() => jobRef.current as any}>
          <List
            className="h-full"
            dataSource={resumeList}
            renderItem={(item, index) => (
              <List.Item>
                <div className="flex items-center">
                  <Avatar size={44} shape="square" src={MyResumeBg} />
                  <div className="text-[18px] ml-[20px]">{item.fileName}</div>
                </div>
                <div>
                  <Button type="link" onClick={() => handleOpenResume(item.url)}>
                    查看
                  </Button>
                  <Button type="link" onClick={() => handleDownload(item.url, item.fileName)}>
                    下载
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </Modal>

        <Modal
          title="简历详情"
          width={1000}
          zIndex={1002}
          destroyOnClose
          open={isResumeOpen}
          wrapClassName="resume-detail"
          onOk={handleResumeOk}
          onCancel={handleResumeCancel}
          getContainer={() => jobRef.current as any}>
          <AppPDFView file={url} />
        </Modal>
      </JobWrapper>
    </>
  )
}

export default memo(Job)
