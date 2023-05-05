/*
 * @Author: hqk
 * @Date: 2023-04-17 13:38:42
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-17 14:38:09
 * @Description:
 */
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { MineArticleWrapper } from './style'
import { useAppDispatch } from '@/hooks/useAppRedux'
import { getChattingJobListAction, getMineArtilceByIdAction } from '@/store/features/info'
import { useGoToCompany } from '@/hooks/useGoToCompany'
import { useGoToJob } from '@/hooks/useGoToJob'
import { Avatar, Divider, Empty, Skeleton } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useMemoizedFn } from 'ahooks'
import AppArticle from '@/components/AppArticle'

interface IProps {
  children?: ReactNode
}

const MineArticle: FC<IProps> = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const [data, setData] = useState<any[]>([])

  const loadData = useMemoizedFn(async () => {
    setIsLoading(true)
    dispatch(getMineArtilceByIdAction({ pageSize, currentPage }))
      .unwrap()
      .then((res) => {
        setIsLoading(false)
        setData([...data, ...res.data.records])
        setTotalCount(res.data.totalCount)
      })
      .catch((err) => {
        setIsLoading(false)
      })
    setCurrentPage(currentPage + 1)
  })

  useEffect(() => {
    loadData()
  }, [])

  return (
    <MineArticleWrapper>
      {data.length > 0 && (
        <InfiniteScroll
          dataLength={data.length}
          height={500}
          next={() => loadData()}
          hasMore={data.length < totalCount}
          loader={null}
          endMessage={
            <Divider plain className="px-[20px] !text-[18px]">
              暂无更多数据
            </Divider>
          }>
          <div className="center flex-col py-20px ">
            {data.map((item, index) => {
              return <AppArticle key={index} item={item} isShowTopic={true} />
            })}
          </div>
          {isLoading && (
            <>
              {Array.from({ length: 1 }).map((item, index) => {
                return (
                  <div key={index} className="py-[20px] px-[20px]">
                    <Skeleton avatar paragraph={{ rows: 3 }} active />
                  </div>
                )
              })}
            </>
          )}
        </InfiniteScroll>
      )}
      {data.length == 0 && (
        <Empty
          className="bg-white  h-full overflow-hidden center rounded-[12px] text-[18px] "
          description={<div className="!text-[#999]">暂无发表的文章</div>}
        />
      )}
    </MineArticleWrapper>
  )
}

export default memo(MineArticle)
