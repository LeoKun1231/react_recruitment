import React, { ElementRef, memo, useState, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { UserOutlined, LikeOutlined, MessageOutlined, LikeFilled, EllipsisOutlined } from '@ant-design/icons'
import { Avatar, Input, Button, Dropdown, MenuProps } from 'antd'
import IconText from './icon-text'
import { IComment } from '@/types/home/community'
import formatTimeago from '@/utils/date'
import classNames from 'classnames'
import { useCreation, useMemoizedFn } from 'ahooks'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { addCommentAction, addCommentByNoRefreshAction, deleteCommentByIdAction } from '@/store/features/community'
import { formatNumber2KW } from '@/utils/number-format'
import useLike from '@/hooks/useLike'
import AppConfirmModal from '../../AppConfirmModal'
import AppReportConfirm from '../../AppReportConfirm'
import AppRoleUserControl from '@/components/AppRoleUserControl'
import { ROLECODE } from '@/constant'

interface IProps {
  children?: ReactNode
  comment: IComment
  fatherComment: IComment
  rootId: number
}

const CommentChildren: FC<IProps> = (props) => {
  const { comment, rootId, fatherComment } = props
  const [isShowChildren, setIsShowChildren] = useState(false)

  const [value, setValue] = useState('')
  const appConfirmModal = useRef<ElementRef<typeof AppConfirmModal>>(null)
  const appReportModal = useRef<ElementRef<typeof AppReportConfirm>>(null)

  const onChange = useMemoizedFn((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  })

  const handleReply = useMemoizedFn((id: number) => {
    //取反
    setIsShowChildren((b: boolean) => !b)
  })
  const { id, nickName, roleId, avatar } = useAppSelector((state) => {
    return {
      id: state.login.loginUser.id,
      nickName: state.login.loginUser.nickName,
      roleId: state.login.loginUser.roleId,
      avatar: state.login.loginUser.avatar
    }
  }, useAppShallowEqual)
  console.log(id, '=====')

  const { handleLike, isLike, likeCount } = useLike(comment, false, id)
  const dispatch = useAppDispatch()
  const handlePublishComment = useMemoizedFn(async () => {
    const res = await dispatch(
      addCommentAction({
        articleId: comment.articleId,
        content: value,
        parentId: comment.id,
        userId: id,
        targetId: comment.userId,
        rootId
      })
    ).unwrap()
    if (res.code == 200) {
      dispatch(
        addCommentByNoRefreshAction({
          articleId: comment.articleId,
          rootId: comment.rootId,
          content: value,
          nickname: nickName,
          target: comment.nickname,
          targetContent: comment.content,
          avatar,
          isLike: false,
          createTime: new Date() + '',
          commentCount: 0,
          id: res.data.id,
          likeCount: 0,
          parentId: comment.id,
          userId: id,
          children: [],
          isSecond: true
        })
      )
      setValue('')
      setIsShowChildren(false)
    }
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
        <div className="px-[10px] py-[5px]" onClick={(e) => handleReport(e, comment.id)}>
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
    if (roleId == ROLECODE.ADMIN && id != comment.userId) {
      return [reportItem, deleteItem]
    }
    if (id == comment.userId || roleId == ROLECODE.ADMIN) {
      return [deleteItem]
    }
    if (id != comment.userId) {
      return [reportItem]
    }
  }, [comment.userId, roleId, id])

  const handleStopPropagation = useMemoizedFn((e: React.MouseEvent) => {
    e.stopPropagation()
  })

  const handleDeleteConfirm = useMemoizedFn(async (id: number) => {
    const res = await dispatch(deleteCommentByIdAction(id)).unwrap()
    if (res.code == 200) {
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  })

  return (
    <>
      <div className="flex text-[var(--text-gray-color)] mb-[24px]">
        <div className="mt-[10px]">
          {comment.avatar ? <Avatar size={40} src={comment.avatar} /> : <Avatar size={40} icon={<UserOutlined />} />}
        </div>
        <div className="right ml-[16px] w-[calc(100%-56px)]">
          <div className="content-top between h-[26px] leading-[26px]">
            <div className=" flex items-center">
              <div className="text-[var(--text-color)] font-500">{comment.nickname}</div>
              <div className="text-[#8a919f] mx-[8px]">回复</div>
              <div className="text-[var(--text-color)] font-500">{comment.target}</div>
            </div>
            <div className="text-[var(--text-gray-color)]">{formatTimeago(comment.createTime)}</div>
          </div>
          <div className="content mt-[8px] text-[var(--text-second-color)]">{comment.content}</div>

          {comment.targetContent ? (
            <div className="target-content flex h-[34px] leading-[34px] border-1 border-[#e4e6eb] border-solid rounded mt-[8px] px-[12px]  bg-[#f2f3f5] ">
              <div>“</div>
              <div className=" truncate ">{comment.targetContent}</div>
              <div>”</div>
            </div>
          ) : comment.parentId == comment.rootId ? (
            <div className="target-content flex h-[34px] leading-[34px] border-1 border-[#e4e6eb] border-solid rounded mt-[8px] px-[12px]  bg-[#f2f3f5] ">
              <div className=" truncate ">{fatherComment.content}</div>
            </div>
          ) : (
            <div className="target-content flex h-[34px] leading-[34px] border-1 border-[#e4e6eb] border-solid rounded mt-[8px] px-[12px]  bg-[#f2f3f5] ">
              <div className=" truncate ">该评论已经被删除</div>
            </div>
          )}

          <div className="mt-[20px] between h-[22px] leading-[22px] text-[16px] text-[var(--text-gray-color)]">
            <div className="center">
              <div
                className="center hover:cursor-pointer hover:text-[var(--hover-color)] mr-[10px]"
                onClick={(e) => handleLike(e, comment)}>
                {isLike ? <LikeFilled className="text-[var(--primary-color)]" /> : <LikeOutlined />}
                <div className="ml-[4px]">{formatNumber2KW(likeCount)}</div>
              </div>
              <IconText
                icon={MessageOutlined}
                className={classNames({ 'text-[var(--primary-color)]': isShowChildren })}
                text={isShowChildren ? '取消回复' : '回复'}
                onClick={() => handleReply(comment.id)}
                isClick={isShowChildren}
              />
            </div>
            <Dropdown menu={{ items }} placement="bottom" arrow>
              <EllipsisOutlined className="text-[24px] hover:cursor-pointer" onClick={handleStopPropagation} />
            </Dropdown>
          </div>
          {isShowChildren && (
            <div className="reply pb-[10px]">
              <Input.TextArea
                showCount
                value={value}
                maxLength={1000}
                onChange={onChange}
                placeholder="输入评论"
                className="mt-[12px] mb-[24px]"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
              <div className="flex justify-end">
                <Button type="primary" className="px-[36px] h-[36px]" disabled={value == ''} onClick={handlePublishComment}>
                  发表
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <AppConfirmModal title="删除评论提醒" onConfirm={() => handleDeleteConfirm(comment.id)} ref={appConfirmModal}>
        删除评论后不可恢复。
      </AppConfirmModal>
      <AppReportConfirm ref={appReportModal} id={comment.id} isArticle={false} />
    </>
  )
}

export default memo(CommentChildren)
