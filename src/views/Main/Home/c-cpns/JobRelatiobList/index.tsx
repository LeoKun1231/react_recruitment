/*
 * @Author: hqk
 * @Date: 2023-04-13 16:07:08
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-14 15:43:27
 * @Description:
 */

import { useAppDispatch } from '@/hooks/useAppRedux'
import { useGoToCompany } from '@/hooks/useGoToCompany'
import { useGoToJob } from '@/hooks/useGoToJob'
import { getJobRelationListAction } from '@/store'
import { IJobRelationList } from '@/types/home/home'
import { useMemoizedFn } from 'ahooks'
import { Avatar, Skeleton } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  firstLabel: string
  secondLabel: string
  thirdLabel: string
  isThird: boolean
  jobId?: string
}

const JobRelationList: FC<IProps> = (props) => {
  const { firstLabel, secondLabel, thirdLabel, isThird, jobId } = props
  const [data, setData] = useState<IJobRelationList[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useAppDispatch()
  const loadData = useMemoizedFn(async () => {
    const res = await dispatch(getJobRelationListAction({ firstLabel, secondLabel, thirdLabel, isThird, jobId })).unwrap()
    if (res.code == 200) {
      setData(res.data)
      setIsLoading(false)
    }
  })

  useEffect(() => {
    if (!firstLabel || !secondLabel || !thirdLabel) return
    loadData()
  }, [firstLabel, secondLabel, thirdLabel])

  const { handleGoToCompamyDetail } = useGoToCompany()
  const { handleGoToJobDetail } = useGoToJob()

  return (
    <div className="w-full flex-1 py-[16px]  mt-20px h-fit bg-white rounded-[8px] shadow-lg ">
      <h2 className="p-0 m-0 mb-10px pl-14px">其他岗位</h2>
      {isLoading ? (
        <div className="px-[16px] py-12px">
          {[1, 2, 3, 4, 5].map((item) => {
            return <Skeleton key={item} active paragraph={{ rows: 2 }} title={false} />
          })}
        </div>
      ) : (
        data.map((item) => {
          return (
            <div key={item.jobId} className="px-[16px] py-12px rounded-[8px]  hover:cursor-pointer hover:bg-[#eee] hoverBlue">
              <div className="between text-[16px] " onClick={() => handleGoToJobDetail(item.jobId)}>
                <div className="truncate w-[100px]">{item.jobName}</div>
                <div className=" text-[#0099CC] ml-30px">
                  {item.startMoney}K~{item.endMoney}K·{item.moneyMonth}薪
                </div>
              </div>
              <div className="between mt-10px" onClick={() => handleGoToCompamyDetail(item.companyId)}>
                <div className="flex items-center">
                  <Avatar className="border" src={item.avatar} size={25} />
                  <div className="ml-10px w-[100px] truncate">{item.companyName}</div>
                </div>
                <div className="item text-[#999]">{item.city[1]}</div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default memo(JobRelationList)
