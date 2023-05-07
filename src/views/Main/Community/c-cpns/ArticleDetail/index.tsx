/*
 * @Author: hqk
 * @Date: 2023-03-09 14:36:02
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-25 17:21:06
 * @Description:
 */
import React, { ElementRef, memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { ArticleDetailWrapper } from './style'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, Divider, Tag, Input, Button, Skeleton } from 'antd'
import {
  EyeOutlined,
  UserOutlined,
  DownOutlined,
  DeleteOutlined,
  LeftOutlined,
  InfoOutlined,
  MessageOutlined,
  LikeOutlined,
  LikeFilled
} from '@ant-design/icons'
import Comment from '@/components/Comment'
import { useMemoizedFn } from 'ahooks'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import {
  addCommentAction,
  getCommentListAction,
  saveCommentListAction,
  saveCommentListCountAction,
  getArticleDetailAction,
  addCommentByNoRefreshAction,
  getArticleRelationAction,
  addWatchCountAction,
  deleteArticleByIdAction,
  resetArticleSearchOptionsAction
} from '@/store/features/community'
import { IArticleDetail, IArticleRelation } from '@/types/home/community'

import Prism from 'prismjs'
import AppConfirmModal from '@/components/AppConfirmModal'
import useLike from '@/hooks/useLike'
import AppReportConfirm from '@/components/AppReportConfirm'
import classNames from 'classnames'
import AppRoleUserControl from '@/components/AppRoleUserControl'

interface IProps {
  children?: ReactNode
  isAdmin?: boolean
  articleId?: number
}

const ArticleDetail: FC<IProps> = (props) => {
  const { isAdmin, articleId } = props
  const params = useParams()
  const [id, setId] = useState(() => {
    return params.id ? parseInt(params.id) : articleId ? articleId : 0
  })

  const [articleDetail, setArticleDetail] = useState<IArticleDetail>({} as IArticleDetail)
  const [relationArticleList, setRelationArticleList] = useState<IArticleRelation[]>([])

  const [value, setValue] = useState('')
  const appConfirmModal = useRef<ElementRef<typeof AppConfirmModal>>(null)
  const appReportModal = useRef<ElementRef<typeof AppReportConfirm>>(null)

  const onChange = useMemoizedFn((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  })

  const { commentList, totalCount, isCommentLoading, userId, nickName, avatar } = useAppSelector((state) => {
    return {
      commentList: state.community.commentList,
      totalCount: state.community.commentCount,
      isCommentLoading: state.community.isCommentLoading,
      userId: state.login.loginUser.id,
      nickName: state.login.loginUser.nickName,
      avatar: state.login.loginUser.avatar
    }
  }, useAppShallowEqual)
  const dispatch = useAppDispatch()
  const handlePublishComment = useMemoizedFn(async () => {
    const res = await dispatch(addCommentAction({ rootId: 0, articleId: id, content: value, parentId: 0, userId })).unwrap()
    if (res.code == 200) {
      setValue('')
      dispatch(
        addCommentByNoRefreshAction({
          articleId: id,
          rootId: 0,
          content: value,
          nickname: nickName,
          avatar,
          target: '',
          targetContent: '',
          isLike: false,
          createTime: new Date() + '',
          commentCount: 0,
          id: res.data.id,
          likeCount: 0,
          parentId: 0,
          userId,
          children: []
        })
      )
    }
  })

  useEffect(() => {
    //回到顶部
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    //开启代码高亮
    Prism?.highlightAll()
  })

  useEffect(() => {
    //请求文章详情 y以及获取评论列表
    dispatch(getArticleDetailAction(id))
      .unwrap()
      .then((res) => {
        if (res.code == 200) {
          setArticleDetail(res.data.data)
        }
      })
    if (!isAdmin) {
      dispatch(getCommentListAction({ articleId: id, userId }))
    }
    return () => {
      if (!isAdmin) {
        //重置
        dispatch(saveCommentListAction([]))
        dispatch(saveCommentListCountAction(0))
      }
    }
  }, [])

  const loadArticleRelationData = useMemoizedFn(async () => {
    const res = await dispatch(getArticleRelationAction(id)).unwrap()
    setRelationArticleList(res.data.list)
  })

  useEffect(() => {
    if (!isAdmin) {
      //获取相关文章
      loadArticleRelationData()
      //增加文章浏览量
      dispatch(addWatchCountAction(id))
    }

    return () => {
      if (!isAdmin) {
        dispatch(resetArticleSearchOptionsAction())
      }
    }
  }, [])

  const handleLoadMore = useMemoizedFn(() => {
    dispatch(getCommentListAction({ articleId: id, userId }))
  })

  const handleGoToAnthor = useMemoizedFn((e: React.MouseEvent, id: number) => {
    window.open(`/main/community/articleDeatil/${id}`)
  })

  const navigate = useNavigate()
  const handleBack = useMemoizedFn(() => {
    navigate(-1)
  })

  const handleArticleDelete = useMemoizedFn(() => {
    appConfirmModal.current?.show()
  })

  const handleDeleteConfirm = useMemoizedFn(async (id: number) => {
    const res = await dispatch(deleteArticleByIdAction(id)).unwrap()
    if (res.code == 200) {
      navigate(-1)
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  })

  const { handleLike, isLike, likeCount } = useLike(articleDetail, true, userId)

  const handleReport = useMemoizedFn(() => {
    appReportModal.current?.show()
  })

  return (
    <ArticleDetailWrapper isAdmin={isAdmin!} className="!w-full">
      <div className={classNames({ 'w-[1200px] m-auto pt-[30px]': !isAdmin })}>
        <div className="flex justify-between">
          <div className={classNames({ 'w-[860px] bg-white h-full shadow-xl rounded-[14px]': !isAdmin, 'w-full': isAdmin })}>
            <div className={classNames({ 'px-[24px]': true, ' py-[30px]': !isAdmin })}>
              <h1 className="title">{articleDetail.title}</h1>
              <div className="avatar bg-[#efefef] rounded-[8px] px-[10px] py-[8px] mt-[20px] flex items-center">
                {articleDetail.avatar ? <Avatar src={articleDetail.avatar} size={60} /> : <Avatar icon={<UserOutlined />} size={60} />}
                <div className="ml-[10px]">
                  <div className="text-[22px] mb-[10px]">{articleDetail.nickname}</div>
                  <div className="flex text-[16px] h-[20px] leading-[20px] text-[#999]">
                    <div>{articleDetail.createTime}</div>
                    <div className="ml-[12px] flex items-center">
                      <EyeOutlined className="mr-[2px] relative top-[1px]" />
                      <div>阅读量 {!isAdmin ? articleDetail.watchCount / 1 + 1 : articleDetail.watchCount / 1}</div>
                      <MessageOutlined className="ml-[12px] mr-[2px] relative top-[1px]" />
                      <div>评论量 {articleDetail.commentCount / 1}</div>
                      <LikeOutlined className="ml-[12px] mr-[2px] relative top-[1px]" />
                      <div>点赞量 {likeCount / 1}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: articleDetail.content
                }}
                className="content py-[20px] border"></div>
              <div className={classNames({ 'topic flex items-center mt-[20px]': true, 'pb-20px': isAdmin })}>
                <div className="mr-[10px]">话题：</div>
                <Tag color="blue" className="px-[10px] py-[6px] !text-[14px]">
                  {articleDetail.topicContent}
                </Tag>
              </div>
            </div>
          </div>
          {!isAdmin && (
            <div className="">
              <div className="back flex  py-[20px] w-[200px] fixed left-[calc(calc(calc(100vw-1200px)/2)+900px)]  rounded-[14px]">
                <Button
                  type="primary"
                  icon={<LeftOutlined />}
                  shape="circle"
                  className="mx-[10px]"
                  title="返回"
                  disabled={window.history.length == 1}
                  onClick={handleBack}></Button>
                <Button
                  type="primary"
                  icon={isLike ? <LikeFilled /> : <LikeOutlined />}
                  shape="circle"
                  className="mx-[10px]"
                  title={isLike ? '取消点赞' : '点赞'}
                  onClick={(e) => handleLike(e, articleDetail)}></Button>

                <AppRoleUserControl userId={articleDetail.userId} owner>
                  <Button
                    type="primary"
                    icon={<InfoOutlined />}
                    shape="circle"
                    className="mx-[10px]"
                    title="举报"
                    onClick={handleReport}></Button>
                </AppRoleUserControl>
                <AppRoleUserControl userId={articleDetail.userId}>
                  <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    shape="circle"
                    className="mx-[10px]"
                    title="删除"
                    onClick={handleArticleDelete}></Button>
                </AppRoleUserControl>
              </div>
              <div className="shadow-xl rounded-[14px] fixed left-[calc(calc(calc(100vw-1200px)/2)+900px)] mt-[80px] w-[200px] bg-white px-[24px] py-[20px]">
                <h3 className="p-0 m-0 pb-[10px] border">相关文章</h3>
                <div className="py-[4px]">
                  {relationArticleList.map((item, index) => {
                    return (
                      <div
                        className="py-[10px] border group hover:cursor-pointer"
                        key={item.id + Math.random() + ''}
                        title={item.title}
                        onClick={(e) => handleGoToAnthor(e, item.id)}>
                        <div className="truncate text-[15px] group-hover:text-[var(--hover-color)]">{item.title}</div>
                        <div className="flex mt-[6px] text-[#8a919f]">
                          <div className="mr-[10px]">{item.watchCount} 阅读</div>
                          <div>{item.commentCount} 评论</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        {!isAdmin && (
          <div className="comment mt-[40px] w-[860px] bg-white  shadow-2xl rounded-[14px]">
            <div className="px-[24px] py-[30px]">
              <h1 className="mb-[20px]">评论</h1>
              <div className="reply border pb-[10px]">
                <Input.TextArea
                  showCount
                  value={value}
                  maxLength={1000}
                  onChange={onChange}
                  placeholder="输入评论"
                  className="mt-[12px] mb-[24px]"
                  autoSize={{ minRows: 5, maxRows: 9 }}
                />
                <div className="flex justify-end">
                  <Button type="primary" className="px-[36px] h-[36px]" disabled={value == ''} onClick={handlePublishComment}>
                    发表
                  </Button>
                </div>
              </div>
              {commentList.length > 0 && (
                <>
                  <h1 className="mt-[16px]">全部评论</h1>
                  {commentList.map((item) => {
                    return <Comment comment={item} key={item.id} />
                  })}
                  {isCommentLoading && <Skeleton active avatar paragraph={{ rows: 4 }} title={false} className="py-[16px]" />}
                  {commentList.length != totalCount ? (
                    <div
                      onClick={handleLoadMore}
                      className="bg-[#f7f8fa] h-[50px] leading-[50px] text-[16px] text-center mt-[10px] center hover">
                      {isCommentLoading ? (
                        <>加载中...</>
                      ) : (
                        <>
                          更多评论
                          <DownOutlined className="ml-[10px]" />
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="bg-[#f7f8fa] h-[50px] leading-[50px] text-[16px] text-center mt-[10px]">暂无更多数据</div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {!isAdmin && (
        <>
          <AppConfirmModal title="删除文章提醒" onConfirm={() => handleDeleteConfirm(articleDetail.id)} ref={appConfirmModal}>
            删除文章后不可恢复。
          </AppConfirmModal>
          <AppReportConfirm id={articleDetail.id} isArticle ref={appReportModal} />
        </>
      )}
    </ArticleDetailWrapper>
  )
}

ArticleDetail.defaultProps = {
  isAdmin: false
}

export default memo(ArticleDetail)
