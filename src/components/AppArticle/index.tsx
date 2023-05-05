/*
 * @Author: hqk
 * @Date: 2023-03-06 19:07:52
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-17 15:31:01
 * @Description:
 */
import React, { ElementRef, memo, useEffect, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { AppArticleWrapper } from './style'
import { Avatar, MenuProps, Dropdown } from 'antd'
import { LikeFilled, EllipsisOutlined, EyeOutlined, LikeOutlined, MessageOutlined, LinkOutlined, UserOutlined } from '@ant-design/icons'
import formatTimeago from '@/utils/date'
import { IArticle } from '@/types/home/community'
import { useCreation, useMemoizedFn } from 'ahooks'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { deleteArticleByIdAction } from '@/store/features/community'
import { useNavigate } from 'react-router-dom'
import { formatNumber2KW } from '@/utils/number-format'
import useLike from '@/hooks/useLike'
import AppConfirmModal from '../AppConfirmModal'
import AppReportConfirm from '../AppReportConfirm'
import classNames from 'classnames'
import AppRoleControl from '../AppRoleControl'
import AppRoleUserControl from '../AppRoleUserControl'
import { ROLECODE } from '@/constant'

interface IProps {
  children?: ReactNode
  item: IArticle
  isShowTopic?: boolean
  isEdit?: boolean
  classname?: string
}

const AppArticle: FC<IProps> = (props) => {
  const { item, isShowTopic, isEdit, classname } = props

  const appConfirmModal = useRef<ElementRef<typeof AppConfirmModal>>(null)
  const appReportModal = useRef<ElementRef<typeof AppReportConfirm>>(null)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { userId, roleId } = useAppSelector((state) => {
    return {
      userId: state.login.loginUser.id,
      roleId: state.login.loginUser.roleId
    }
  }, useAppShallowEqual)

  const { handleLike, isLike, likeCount } = useLike(item, true, userId)

  const goToTopicDetail = useMemoizedFn((e: React.MouseEvent, id: number) => {
    if (!isEdit) return
    e.stopPropagation()
    navigate(`/main/community/topicDetail/${id}`)
  })

  const handleArticleClick = useMemoizedFn((e: React.MouseEvent, id: number) => {
    if (!isEdit) return
    navigate(`/main/community/articleDeatil/${id}`)
  })

  const handleReport = useMemoizedFn((e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    appReportModal.current?.show()
  })

  const handleDelete = useMemoizedFn((e: React.MouseEvent) => {
    e.stopPropagation()
    appConfirmModal.current?.show()
  })

  const items: MenuProps['items'] = useCreation(() => {
    const reportItem = {
      key: '1',
      label: (
        <div className="px-[10px] py-[5px]" onClick={(e) => handleReport(e, item.id)}>
          举报
        </div>
      )
    }
    const deleteItem = {
      key: '2',
      label: (
        <div className="px-[10px] py-[5px]" onClick={handleDelete}>
          删除
        </div>
      )
    }
    if (roleId == ROLECODE.ADMIN && userId != item.userId) {
      return [reportItem, deleteItem]
    }
    if (userId == item.userId || roleId == ROLECODE.ADMIN) {
      return [deleteItem]
    }
    if (userId != item.userId) {
      return [reportItem]
    }
  }, [item.userId, roleId, userId])

  const handleDeleteConfirm = useMemoizedFn(async (id: number) => {
    const res = await dispatch(deleteArticleByIdAction(id)).unwrap()
    if (res.code == 200) {
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  })

  const handleStopPropagation = useMemoizedFn((e: React.MouseEvent) => {
    e.stopPropagation()
  })

  const showEl = (
    <div onClick={(e) => handleArticleClick(e, item.id)}>
      <div className="header w-full flex items-center h-[32px] leading-[30px]">
        <div className="avatar">{item.avatar ? <Avatar size={36} src={item.avatar} /> : <Avatar size={40} icon={<UserOutlined />} />}</div>
        <div className="between w-full">
          <div className="flex items-center">
            <div className="text-[14px] ml-[10px]">{item.nickname}</div>
            <div className="mx-[10px] w-[2px] h-[20px] bg-[#efefef] "></div>

            {item.majorName != '' && item.majorName && (
              <>
                <div className="text-[12px]  text-[#86909c] ">{item.majorName}</div>
                <div className="mx-[10px] w-[2px] h-[20px] bg-[#efefef] "></div>
              </>
            )}
            <div className="text-[#86909c] text-[12px]">{formatTimeago(item.createTime)}</div>
          </div>
          {isEdit && (
            <Dropdown menu={{ items }} placement="bottom" arrow>
              <EllipsisOutlined className="text-[24px] hover:cursor-pointer" onClick={handleStopPropagation} />
            </Dropdown>
          )}
        </div>
      </div>
      <div className="title mt-[16px] text-[24px] font-600 truncate " title={item.title}>
        {item.title}
      </div>
      <div className="content  text-[#86909c]  mt-[12px] ">{item.contentPreview}...</div>
      {isShowTopic && (
        <div
          className="w-fit px-[16px] py-[10px] bg-[#f8f8f8] rounded-[13px] mt-[12px] text-[var(--hover-color)] center hover:cursor-pointer hover:opacity-70"
          onClick={(e) => goToTopicDetail(e, item.topicId)}>
          <LinkOutlined />
          <span className="ml-[6px]">{item.topicContent}</span>
        </div>
      )}
      <div className="mt-[12px] pb-[10px] flex items-center text-[14px] ">
        <div className="center hover:cursor-pointer hover:text-[var(--hover-color)]">
          <EyeOutlined />
          <div className="ml-[6px]">{formatNumber2KW(item.watchCount)}</div>
        </div>
        {isEdit ? (
          <div className="center ml-[6px] hover:cursor-pointer hover:text-[var(--hover-color)]" onClick={(e) => handleLike(e, item)}>
            {isLike ? <LikeFilled className="text-[var(--primary-color)]" /> : <LikeOutlined />}
            <div className="ml-[6px]">{formatNumber2KW(likeCount)}</div>
          </div>
        ) : (
          <div className="center ml-[6px] hover:cursor-pointer hover:text-[var(--hover-color)]">
            {isLike ? <LikeFilled className="text-[var(--primary-color)]" /> : <LikeOutlined />}
            <div className="ml-[6px]">{formatNumber2KW(likeCount)}</div>
          </div>
        )}
        <div className="center ml-[6px] hover:cursor-pointer hover:text-[var(--hover-color)]">
          <MessageOutlined />
          <div className="ml-[6px]">{formatNumber2KW(item.commentCount)}</div>
        </div>
      </div>
    </div>
  )

  return (
    <AppArticleWrapper className={classNames({ 'hover:cursor-pointer hover:bg-[#fafafa]': isEdit, [classname!]: true })}>
      {item ? showEl : <div></div>}
      <AppConfirmModal title="删除文章提醒" onConfirm={() => handleDeleteConfirm(item.id)} ref={appConfirmModal}>
        删除文章后不可恢复。
      </AppConfirmModal>
      <AppReportConfirm ref={appReportModal} id={item.id} isArticle />
    </AppArticleWrapper>
  )
}

AppArticle.defaultProps = {
  isEdit: true
}

export default memo(AppArticle)
