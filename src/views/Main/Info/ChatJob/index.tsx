/*
 * @Author: hqk
 * @Date: 2023-04-17 13:02:05
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-17 14:10:19
 * @Description:
 */

import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { ChatJobWrapper } from './style'
import { useAppDispatch } from '@/hooks/useAppRedux'
import { getChattingJobListAction } from '@/store/features/info'
import { IDetailJobList } from '@/types/home/home'
import { useGoToCompany } from '@/hooks/useGoToCompany'
import { useGoToJob } from '@/hooks/useGoToJob'
import { Avatar, Divider, Empty, Skeleton } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useMemoizedFn } from 'ahooks'

interface IProps {
  children?: ReactNode
}

const ChatJob: FC<IProps> = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const [data, setData] = useState<IDetailJobList[]>([])

  const loadData = useMemoizedFn(async () => {
    setIsLoading(true)
    dispatch(getChattingJobListAction({ pageSize, currentPage }))
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

  const { handleGoToCompamyDetail } = useGoToCompany()
  const { handleGoToJobDetail } = useGoToJob()
  return (
    <ChatJobWrapper>
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
          <div className="center flex-col">
            {data.map((item) => {
              return (
                <div
                  key={item.jobId}
                  className="bg-white w-[90%] border-1 border-solid border-#eee  px-30px py-20px my-10px rounded-8px shadow-sm transition-all duration-600 hover:shadow-2xl hover:cursor-pointer ">
                  <div className="flex justify-between">
                    <div className="w-[400px] hoverBlue" onClick={() => handleGoToJobDetail(item.jobId)}>
                      <div className="flex  py-10px text-20px items-center">
                        <div className="truncate w-[200px]">{item.jobName}</div>
                        <div className=" text-[#0099CC] ml-30px">
                          {item.startMoney}K~{item.endMoney}K·{item.moneyMonth}薪
                        </div>
                      </div>
                      <div className="flex pb-6px">
                        {item.tag.slice(0, 5).map((tag) => {
                          return (
                            <div
                              title={tag}
                              className="border-1  max-w-70px truncate border-#eee border-solid px-8px py-4px mr-8px text-[#999]"
                              key={tag}>
                              {tag}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="w-[400px] hoverBlue" onClick={() => handleGoToCompamyDetail(item.companyId)}>
                      <div className="flex items-center">
                        <Avatar src={item.avatar} size={60} className="border" shape="square" />
                        <div className="ml-20px">
                          <div className="text-[18px] mb-8px">{item.companyName}</div>
                          <div className="flex items-center">
                            <div className="grayItem">{item.category}</div>
                            <div className="grayItem">{item.size}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-[400px] flex text-[#999] py-6px items-center " onClick={() => handleGoToJobDetail(item.jobId)}>
                      <div className="item">{item.city[0] + '-' + item.city[1]}</div>
                      <div className="item pl-10px">{item.jobRequire}</div>
                    </div>
                    <div className="w-[400px]" onClick={() => handleGoToCompamyDetail(item.companyId)}>
                      <div className="flex">
                        {item.weal.slice(0, 5).map((weal) => {
                          return (
                            <div key={weal} title={weal} className="grayItem max-w-80px truncate">
                              {weal}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
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
          description={<div className="!text-[#999]">暂无沟通岗位</div>}
        />
      )}
    </ChatJobWrapper>
  )
}

export default memo(ChatJob)
