import React, { ElementRef, memo, useState, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { UserOutlined, LikeOutlined, MessageOutlined, LikeFilled, EllipsisOutlined } from '@ant-design/icons'
import { Avatar, Input, Button, MenuProps, Dropdown } from 'antd'
import CommentChildren from './c-cpns/comment-children'
import IconText from './c-cpns/icon-text'
import { useMemoizedFn, useCreation } from 'ahooks'
import classNames from 'classnames'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import {
  addCommentAction,
  addCommentByNoRefreshAction,
  getMoreCommentAction,
  deleteArticleByIdAction,
  deleteCommentByIdAction
} from '@/store/features/community'
import { IComment } from '@/types/home/community'
import formatTimeago from '@/utils/date'
import useLike from '@/hooks/useLike'
import { formatNumber2KW } from '@/utils/number-format'
import AppConfirmModal from '../AppConfirmModal'
import AppReportConfirm from '../AppReportConfirm'
import AppRoleUserControl from '../AppRoleUserControl'
import { ROLECODE } from '@/constant'

interface IProps {
  children?: ReactNode
  comment: IComment
}

const Comment: FC<IProps> = (props) => {
  const { comment } = props

  const [isShowChildren, setIsShowChildren] = useState(false)
  const [value, setValue] = useState('')

  const appConfirmModal = useRef<ElementRef<typeof AppConfirmModal>>(null)
  const appReportModal = useRef<ElementRef<typeof AppReportConfirm>>(null)

  const { isCommentChildrenLoading, id, nickName, roleId, avatar } = useAppSelector((state) => {
    return {
      isCommentChildrenLoading: state.community.isCommentChildrenLoading,
      id: state.login.loginUser.id,
      nickName: state.login.loginUser.nickName,
      roleId: state.login.loginUser.roleId,
      avatar: state.login.loginUser.avatar
    }
  }, useAppShallowEqual)
  const { handleLike, isLike, likeCount } = useLike(comment, false, id)
  const onChange = useMemoizedFn((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  })

  const handleClick = useMemoizedFn(() => {
    //取反
    setIsShowChildren((b: boolean) => !b)
  })

  const dispatch = useAppDispatch()

  const handlePublishComment = useMemoizedFn(async () => {
    const res = await dispatch(
      addCommentAction({
        articleId: comment.articleId,
        rootId: comment.id,
        content: value,
        parentId: comment.id,
        userId: id,
        targetId: comment.userId
      })
    ).unwrap()
    if (res.code == 200) {
      setValue('')
      setIsShowChildren(false)
      dispatch(
        addCommentByNoRefreshAction({
          articleId: comment.articleId,
          rootId: comment.id,
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
          children: []
        })
      )
    }
  })

  const handleShowMore = useMemoizedFn(() => {
    dispatch(getMoreCommentAction({ articleId: comment.articleId, userId: id, rootId: comment.id }))
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
    <div className="py-[16px] flex border ">
      <div className="mt-[10px]">
        {comment.avatar ? <Avatar size={40} src={comment.avatar} /> : <Avatar size={40} icon={<UserOutlined />} />}
      </div>
      <div className="right ml-[16px] w-[calc(100%-56px)]">
        <div className="content-top between h-[26px] leading-[26px]">
          <div className="font-500 text-[var(--text-color)] text-[18px]">{comment.nickname}</div>
          <div className="text-[var(--text-gray-color)]">{formatTimeago(comment.createTime)}</div>
        </div>
        <div className="content mt-[8px] text-[var(--text-second-color)]">{comment.content}</div>
        <div className="mt-[22px] between h-[22px] leading-[22px] text-[16px] text-[var(--text-gray-color)] mb-[10px]">
          <div className="center">
            <div
              className="center  hover:cursor-pointer hover:text-[var(--hover-color)] mr-[10px] "
              onClick={(e) => handleLike(e, comment)}>
              {isLike ? <LikeFilled className="text-[var(--primary-color)]" /> : <LikeOutlined />}
              <div className="ml-[4px]">{formatNumber2KW(likeCount)}</div>
            </div>
            <IconText
              icon={MessageOutlined}
              className={classNames({ 'text-[var(--primary-color)]': isShowChildren })}
              text={isShowChildren ? '取消回复' : comment.children?.length || 0}
              onClick={handleClick}
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
        {comment.children!.length > 0 && (
          <div className="py-[16px] bg-[#f9fafb] ">
            <div className="bg-[var(--bg-gary-color)] p-[16px] pb-0">
              {comment.children!.map((item) => {
                return <CommentChildren comment={item} key={item.id} rootId={comment.id} fatherComment={comment} />
              })}

              {comment.commentCount > 2 && comment.children?.length != comment.commentCount && (
                <>
                  {isCommentChildrenLoading ? (
                    <div className="hover">加载中...</div>
                  ) : (
                    <div onClick={handleShowMore} className="hover">
                      展开更多
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        <AppConfirmModal title="删除评论提醒" onConfirm={() => handleDeleteConfirm(comment.id)} ref={appConfirmModal}>
          删除评论后不可恢复。
        </AppConfirmModal>
        <AppReportConfirm ref={appReportModal} id={comment.id} isArticle={false} />
      </div>
    </div>
  )
}
export default memo(Comment)
