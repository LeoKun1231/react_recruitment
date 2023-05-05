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
import { getCompanyCategoryAction, getHomeCompanyListAction } from '@/store'
import { IHomeCompanyList } from '@/types/home/home'
import CompanyItem from '../CompanyItem'
interface IProps {
  children?: ReactNode
}

const CompanyCategory: FC<IProps> = () => {
  const [tabNames, setTabNames] = useState<string[]>([])

  const [data, setData] = useState<IHomeCompanyList[]>([])
  const [count, setCount] = useState(0)
  const [pageSize, setPageSize] = useState(6)
  const [category, setCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isCategoryChange, setIsCategoryChange] = useState(false)
  const dispatch = useAppDispatch()

  const loadData = useMemoizedFn(async (currentPage: number) => {
    const res = await dispatch(getHomeCompanyListAction({ pageSize, currentPage, category })).unwrap()
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
    const res = await dispatch(getCompanyCategoryAction()).unwrap()
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
      title="全部公司"
      data={data}
      count={count}
      tabClick={handleTableClick}
      tabNames={tabNames}
      onMore={onMore}
      renderItem={(item: IHomeCompanyList) => {
        return <CompanyItem item={item} />
      }}
    />
  )
}

export default memo(CompanyCategory)
