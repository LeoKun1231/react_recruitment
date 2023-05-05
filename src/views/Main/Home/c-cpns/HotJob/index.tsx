/*
 * @Author: hqk
 * @Date: 2023-04-12 18:12:41
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-12 20:47:01
 * @Description:
 */

import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import HomeSection from '../HomeSection'
import { useMemoizedFn } from 'ahooks'
import { useAppDispatch } from '@/hooks/useAppRedux'
import { getHotCompanyListAction, getHotJobListAction } from '@/store'
import { Avatar, Tag } from 'antd'
import JobItem from '../JobItem'
import { IHomeJobList } from '@/types/home/home'

interface IProps {
  children?: ReactNode
}

const HotJob: FC<IProps> = () => {
  const [data, setData] = useState<IHomeJobList[]>([])
  const [count, setCount] = useState(0)
  const [pageSize, setPageSize] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useAppDispatch()
  const loadData = useMemoizedFn(async (currentPage: number) => {
    const res = await dispatch(getHotJobListAction({ pageSize, currentPage })).unwrap()
    if (res.code == 200) {
      setData((c) => [...c, ...res.data.records])
      setCount(res.data.totalCount)
    }
  })

  useEffect(() => {
    loadData(currentPage)
  }, [currentPage])

  const onMore = useMemoizedFn(() => {
    setCurrentPage((c) => c + 1)
  })

  return (
    <HomeSection
      title="热门岗位"
      data={data}
      count={count}
      onMore={onMore}
      renderItem={(item: IHomeJobList) => {
        return <JobItem item={item} />
      }}
    />
  )
}

export default memo(HotJob)
