/*
 * @Author: hqk
 * @Date: 2023-04-13 09:52:20
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-14 15:21:51
 * @Description:
 */
import { useAppDispatch } from '@/hooks/useAppRedux'
import { changeIsHomeAction, getJobListWithDetailTypeAction } from '@/store'
import { IDetailJobList } from '@/types/home/home'
import { useMemoizedFn } from 'ahooks'
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { JobListWrapper } from './style'
import { Affix, Avatar, Button, Empty, Tooltip } from 'antd'
import JobRelatiobList from '../JobRelatiobList'
import { LeftOutlined } from '@ant-design/icons'
import { useGoToCompany } from '@/hooks/useGoToCompany'
import { useGoToJob } from '@/hooks/useGoToJob'

interface IProps {
  children?: ReactNode
}

const JobList: FC<IProps> = () => {
  const [data, setData] = useState<IDetailJobList[]>([])
  const [count, setCount] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useAppDispatch()

  const {
    state: { label, firstLabel, secondLabel }
  } = useLocation()
  const loadData = useMemoizedFn(async (currentPage: number) => {
    const res = await dispatch(getJobListWithDetailTypeAction({ pageSize, currentPage, type: label })).unwrap()
    if (res.code == 200) {
      setData([...data, ...res.data.records])
      setCount(res.data.totalCount)
    }
  })

  useEffect(() => {
    loadData(currentPage)
  }, [currentPage])

  useEffect(() => {
    return () => {
      dispatch(changeIsHomeAction(true))
    }
  }, [])

  const navigate = useNavigate()
  const handleBack = useMemoizedFn(() => {
    navigate(-1)
  })

  const { handleGoToCompamyDetail } = useGoToCompany()
  const { handleGoToJobDetail } = useGoToJob()

  return (
    <JobListWrapper>
      <div className="w-[1200px] m-auto pt-40px flex ">
        <div className="w-[900px]">
          {data.map((item) => {
            return (
              <div
                key={item.jobId}
                className="bg-white px-30px py-20px my-20px rounded-8px shadow-sm transition-all duration-600 hover:shadow-2xl hover:cursor-pointer ">
                <div className="flex">
                  <div className="w-[420px] hoverBlue" onClick={() => handleGoToJobDetail(item.jobId)}>
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
                  <div className="w-[420px] hoverBlue" onClick={() => handleGoToCompamyDetail(item.companyId)}>
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
                <div className="flex items-center ">
                  <div className="w-[420px] flex text-[#999] py-6px items-center " onClick={() => handleGoToJobDetail(item.jobId)}>
                    <div className="item">{item.city[0] + '-' + item.city[1]}</div>
                    <div className="item pl-10px">{item.jobRequire}</div>
                  </div>
                  <div className="w-[420px]" onClick={() => handleGoToCompamyDetail(item.companyId)}>
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
          {data.length == 0 && (
            <Empty
              className="bg-white mt-20px h-518px shadow-lg center rounded-[12px] text-[18px] "
              description={<div className="!text-[#999]">暂无岗位</div>}
            />
          )}
        </div>
        <div className="mt-20px  ml-20px w-[270px]">
          <Affix offsetTop={100}>
            <Button icon={<LeftOutlined />} className="!w-full " size="large" type="primary" onClick={handleBack}>
              返回首页
            </Button>
            <JobRelatiobList firstLabel={firstLabel} secondLabel={secondLabel} thirdLabel={label} isThird={false} />
          </Affix>
        </div>
      </div>
    </JobListWrapper>
  )
}

export default memo(JobList)
