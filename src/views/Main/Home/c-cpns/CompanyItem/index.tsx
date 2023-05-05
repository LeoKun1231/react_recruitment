/*
 * @Author: hqk
 * @Date: 2023-04-12 21:18:02
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-12 21:18:15
 * @Description:
 */
import { useGoToCompany } from '@/hooks/useGoToCompany'
import { useGoToJob } from '@/hooks/useGoToJob'
import { IHomeCompanyList } from '@/types/home/home'
import { useMemoizedFn } from 'ahooks'
import { Avatar } from 'antd'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  item: IHomeCompanyList
}

const CompanyItem: FC<IProps> = (props) => {
  const { item } = props

  const { handleGoToCompamyDetail } = useGoToCompany(item.companyId)
  const { handleGoToJobDetail } = useGoToJob()

  return (
    <>
      <div
        className="title hoverBlue flex items-center pb-16px border-b-solid border-b-1 border-b-[#efefef] "
        onClick={handleGoToCompamyDetail}>
        <Avatar src={item.avatar} size={56} shape="square" className="border" />
        <div className="flex-1 ml-[16px]">
          <div className="text-17px font-500">{item.shortName}</div>
          <div className="mt-6px flex text-gray">
            <span className="pr-4px">{item.category}</span>
            <span className="px-4px">{item.level}</span>
            <span className="px-4px">{item.size}</span>
          </div>
        </div>
      </div>
      <div className="content">
        {item.jobList.map((job) => {
          return (
            <div key={job.id} className="py-8px" onClick={() => handleGoToJobDetail(job.id)}>
              <div className="between  h-[28px] leading-[28px]">
                <div className="hoverBlue truncate w-[140px] text-[16px] " title={job.jobName}>
                  {job.jobName}
                </div>
                <div className="text-16px text-[#0099CC]">
                  {job.startMoney}K~{job.endMoney}K·{job.moneyMonth}薪
                </div>
              </div>
              <div className="flex items-center text-[14px] my-[4px]">
                <div className="px-8px py-[2px] bg-[#f2f2f2] text-[#666] rounded-[4px] mr-[16px]">{job.city[0] + ' ' + job.city[1]}</div>
                <div className="px-8px py-[2px] bg-[#f2f2f2] text-[#666] rounded-[4px]">{job.jobRequire}</div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default memo(CompanyItem)
