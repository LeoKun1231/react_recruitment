/*
 * @Author: hqk
 * @Date: 2023-03-09 16:16:37
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-05 22:15:44
 * @Description:
 */
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { ArticleListWrapper } from './style'
import { Divider, Button, Skeleton, Result, Empty } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import AppArticle from '../AppArticle'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { getArticleListAction, resetArticleSearchOptionsAction } from '@/store/features/community'
import { useMemoizedFn } from 'ahooks'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  title?: string
  topicId?: number
  userId?: number
  typedId?: number
  categoryId?: number
  sortId?: number
  otherId?: number
}

const AppArticleList: FC<IProps> = (props) => {
  const { title, topicId, userId, typedId, categoryId, sortId, otherId } = props

  const { articleList, count, isArticleLoading } = useAppSelector((state) => {
    return {
      articleList: state.community.articleList,
      count: state.community.articleTotalCount,
      isArticleLoading: state.community.isArticleLoading
    }
  }, useAppShallowEqual)

  const dispatch = useAppDispatch()

  const loadData = useMemoizedFn((isNext?: boolean) => {
    //如果没有搜索参数则不发送网络请求
    if (title || topicId || userId || typedId || categoryId || sortId || otherId || isNext) {
      dispatch(getArticleListAction({ title, topicId, userId, typedId, categoryId, sortId, otherId }))
    }
  })

  useEffect(() => {
    loadData()
    return () => {
      //重置页数和当前页
      dispatch(resetArticleSearchOptionsAction())
    }
  }, [])

  const navigate = useNavigate()
  const goToPublish = useMemoizedFn(() => {
    navigate('/main/community/writeArticle')
  })

  return (
    <ArticleListWrapper>
      <InfiniteScroll
        dataLength={articleList.length}
        next={() => loadData(true)}
        hasMore={articleList.length < count}
        loader={null}
        endMessage={
          articleList.length > 10 && (
            <Divider plain className="px-[20px] !text-[18px]">
              暂无更多数据
            </Divider>
          )
        }>
        {articleList.length > 0
          ? articleList.map((item, index) => {
              return <AppArticle key={index} item={item} isShowTopic={!topicId} />
            })
          : !isArticleLoading && (
              <Result
                icon={<Empty description={null} />}
                title="抱歉，暂无该分类的文章"
                extra={
                  <Button type="primary" onClick={goToPublish}>
                    去发表文章
                  </Button>
                }
              />
            )}
        {isArticleLoading && (
          <>
            {Array.from({ length: 1 }).map((item, index) => {
              return (
                <div key={index} className="py-[20px] px-[20px]">
                  <Skeleton avatar paragraph={{ rows: 6 }} active />
                </div>
              )
            })}
          </>
        )}
      </InfiniteScroll>
    </ArticleListWrapper>
  )
}

export default memo(AppArticleList)
