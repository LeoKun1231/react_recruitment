/*
 * @Author: hqk
 * @Date: 2023-03-05 13:42:30
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-05 22:37:44
 * @Description:
 */
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Divider, List, Skeleton } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { TopicWrapper } from './style'
import { useMemoizedFn } from 'ahooks'
import { ITopic } from '@/types/home/community'
import { getAdminTopicListAction } from '@/store/features/admin'

interface IProps {
  children?: ReactNode
  onTopic: (item: ITopic) => void
}

const TopicList: FC<IProps> = (props) => {
  const { onTopic } = props
  const [currentPage, setCurrentPage] = useState(1)

  const [pageSize, setPageSize] = useState(12)
  const [data, setData] = useState<ITopic[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const loadData = useMemoizedFn(async () => {
    if (loading) {
      return
    }
    setLoading(true)
    const res = await dispatch(getAdminTopicListAction({ currentPage, pageSize })).unwrap()
    if (res.code == 200) {
      setData([...data, ...res.data.records])
      setCurrentPage(currentPage + 1)
      setTotalCount(res.data.totalCount)
      setLoading(false)
    }
  })

  useEffect(() => {
    loadData()
  }, [])

  //处理点击
  const handleListItemClick = useMemoizedFn((e: any, item: ITopic) => {
    onTopic(item)
  })

  return (
    <TopicWrapper>
      <div
        id="scrollableDiv"
        style={{
          height: 200,
          overflowY: 'auto',
          padding: '0 6px'
        }}>
        {data.length > 0 && (
          <InfiniteScroll
            className="!overflow-hidden"
            dataLength={data.length}
            next={loadData}
            hasMore={data.length < totalCount}
            loader={null}
            endMessage={<Divider>已经到底了</Divider>}
            scrollableTarget="scrollableDiv">
            <List
              dataSource={data}
              className="mb-75px"
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  className="group hover:bg-[#1890ff] cursor-pointer !px-[5px]"
                  onClick={(e) => handleListItemClick(e, item)}>
                  <div className="max-w-[200px] truncate !group-hover:text-white">#{item.content}</div>
                  <div className="ml-[30px] text-[12px] text-[#bbbbbb] !group-hover:text-white">被引用数({item.count})</div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        )}
      </div>
    </TopicWrapper>
  )
}

export default memo(TopicList)
