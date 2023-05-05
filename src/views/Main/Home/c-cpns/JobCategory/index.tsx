/*
 * @Author: hqk
 * @Date: 2023-04-12 21:42:42
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-12 21:42:50
 * @Description:
 */

import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import HomeSectionV2 from '../HomeSectionV2'
import { useAppDispatch } from '@/hooks/useAppRedux'
import { useMemoizedFn } from 'ahooks'
import { getHomeJobListAction, getJobTypeListAction } from '@/store'
import { IHomeCompanyList, IHomeJobList } from '@/types/home/home'
import JobItem from '../JobItem'

interface IProps {
  children?: ReactNode
}

const JobCategory: FC<IProps> = () => {
  const [tabNames, setTabNames] = useState<string[]>([])

  const [data, setData] = useState<IHomeJobList[]>([])
  const [count, setCount] = useState(0)
  const [pageSize, setPageSize] = useState(6)
  const [category, setCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [isCategoryChange, setIsCategoryChange] = useState(false)

  const dispatch = useAppDispatch()

  const loadData = useMemoizedFn(async (currentPage: number) => {
    const res = await dispatch(getHomeJobListAction({ pageSize, currentPage, type: category })).unwrap()
    if (res.code == 200) {
      if (isCategoryChange) {
        setData(res.data.records)
        setIsCategoryChange(false)
      } else {
        setData([...data, ...res.data.records])
      }
      setCount(res.data.totalCount)
    }
  })
  const loadCategory = useMemoizedFn(async () => {
    const res = await dispatch(getJobTypeListAction()).unwrap()
    if (res.code == 200) {
      setTabNames(res.data)
      setCategory(res.data[0])
    }
  })

  useEffect(() => {
    loadCategory()
  }, [])

  useEffect(() => {
    if (!category || category == '') {
      return
    }
    loadData(currentPage)
  }, [currentPage, category])

  const onMore = useMemoizedFn(() => {
    setCurrentPage((c) => c + 1)
  })

  const handleTableClick = useMemoizedFn((index: number, item: string) => {
    setCategory(item)
    setCurrentPage(1)
    setPageSize(6)
    setIsCategoryChange(true)
  })

  return (
    <HomeSectionV2
      title="全部岗位"
      data={data}
      count={count}
      tabClick={handleTableClick}
      tabNames={tabNames}
      onMore={onMore}
      renderItem={(item: any) => {
        return <JobItem item={item} />
      }}
    />
  )
}

export default memo(JobCategory)
