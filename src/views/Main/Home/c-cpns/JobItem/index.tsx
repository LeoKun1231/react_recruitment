/*
 * @Author: hqk
 * @Date: 2023-04-12 21:17:56
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-17 13:13:15
 * @Description:
 */
import { useGoToCompany } from '@/hooks/useGoToCompany'
import { useGoToJob } from '@/hooks/useGoToJob'
import { IHomeJobList } from '@/types/home/home'
import { Avatar } from 'antd'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  item: IHomeJobList
}

const JobItem: FC<IProps> = (props) => {
  const { item } = props

  const { handleGoToCompamyDetail } = useGoToCompany(item.companyId)
  const { handleGoToJobDetail } = useGoToJob(item.jobId)
  return (
    <>
      <div className="title  pb-16px border-b-solid border-b-1 border-b-[#efefef] hoverBlue" onClick={handleGoToJobDetail}>
        <div className="between h-[36px] leading-[36px] w-full text-[18px] ">
          <div className=" truncate w-[140px]">{item.jobName}</div>
          <div className=" text-[#0099CC]">
            {item.startMoney}K~{item.endMoney}K·{item.moneyMonth}薪
          </div>
        </div>
        <div className="between text-gray">
          <div>{item.city[0] + '-' + item.city[1]}</div>
          <div>{item.jobRequire}</div>
        </div>
        <div className="flex  mt-[10px] truncate">
          {item.tag.slice(0, 3).map((item) => (
            <div key={item} title={item} className="max-w-[100px] truncate px-8px py-[2px] mr-[8px] bg-[#f2f2f2] text-[#666] rounded-[4px]">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="content mt-[12px] hoverBlue flex items-center pb-16px  " onClick={handleGoToCompamyDetail}>
        <Avatar src={item.avatar} size={48} shape="square" className="border" />
        <div className="flex-1 ml-[16px]">
          <div className="text-16px font-500">{item.companyName}</div>
          <div className="mt-4px flex text-gray">
            <span className="pr-4px">{item.category}</span>
            <span className="pr-4px">{item.level}</span>
            <span className="px-4px">{item.size}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(JobItem)
