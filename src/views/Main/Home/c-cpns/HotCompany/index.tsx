/*
 * @Author: hqk
 * @Date: 2023-04-12 18:12:41
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-13 17:47:20
 * @Description:
 */

import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import HomeSection from '../HomeSection'
import { IHomeCompanyList } from '@/types/home/home'
import { useMemoizedFn } from 'ahooks'
import { useAppDispatch } from '@/hooks/useAppRedux'
import { getHotCompanyListAction } from '@/store'
import CompanyItem from '../CompanyItem'

interface IProps {
  children?: ReactNode
}

const HotCompany: FC<IProps> = () => {
  const [data, setData] = useState<IHomeCompanyList[]>([])
  const [count, setCount] = useState(0)
  const [pageSize, setPageSize] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useAppDispatch()
  const loadData = useMemoizedFn(async (currentPage: number) => {
    const res = await dispatch(getHotCompanyListAction({ pageSize, currentPage })).unwrap()
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
      title="热门企业"
      data={data}
      count={count}
      onMore={onMore}
      renderItem={(item: IHomeCompanyList) => {
        return <CompanyItem item={item} />
      }}
    />
  )
}

export default memo(HotCompany)
