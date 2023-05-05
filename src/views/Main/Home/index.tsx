/*
 * @Author: hqk
 * @Date: 2023-03-04 16:58:46
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-23 13:24:56
 * @Description:
 */
import React, { Suspense, memo, useEffect, useMemo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { HomeWrapper } from './style'
import AppRemoteSelect from '@/components/AppRemoteSelect'
import { resetArticleSearchOptionsAction } from '@/store/features/community'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import Job from '@/assets/data/job.json'
import { Carousel, Spin } from 'antd'
import Swiper01 from '@/assets/img/swiper_01.png'
import Swiper02 from '@/assets/img/swiper_02.png'
import { RightOutlined } from '@ant-design/icons'
import { useEventEmitter, useMemoizedFn } from 'ahooks'
import classNames from 'classnames'
import HomeSection from './c-cpns/HomeSection'
import HotCompany from './c-cpns/HotCompany'
import HotJob from './c-cpns/HotJob'
import CompanyCategory from './c-cpns/CompanyCategory'
import JobCategory from './c-cpns/JobCategory'
import { Outlet, useNavigate } from 'react-router-dom'
import { changeIsHomeAction, getHomeBannerListAction } from '@/store'
interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = () => {
  const [jobName, setJobName] = useState('技术')

  const [banners, setBanners] = useState<{ imgUrl: string; govUrl: string }[]>([])

  const { isHome } = useAppSelector((state) => {
    return {
      isHome: state.home.isHome
    }
  }, useAppShallowEqual)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getHomeBannerListAction())
      .unwrap()
      .then((res) => {
        if (res.code == 200) {
          console.log(res.data)
          setBanners(res.data)
        }
      })
    return () => {
      dispatch(resetArticleSearchOptionsAction())
    }
  }, [])

  const findJobItem = useMemoizedFn((jobName: string) => {
    return Job.find((item) => item.label == jobName)
  })

  const handleJobChange = useMemoizedFn((jobName: string) => {
    setJobName(jobName)
  })

  const navigate = useNavigate()
  const handleJobClick = useMemoizedFn((firstLabel: string, secondLabel: string, thirdLabel: string) => {
    dispatch(changeIsHomeAction(false))
    navigate('/main/home/jobList', {
      state: {
        firstLabel,
        secondLabel,
        label: thirdLabel
      }
    })
  })

  const handleBannerClick = useMemoizedFn((url: string) => {
    window.open(url)
  })

  return (
    <HomeWrapper className="home">
      <div className="community_logo"></div>
      <div className="w-[1200px] m-auto flex mt-[30px]">
        <div className="job bg-white w-[500px] mr-[17px] h-[350px]  rounded-[10px] shadow-lg px-20px py-10px">
          <h2 className="p-0 m-0 mb-4px ">岗位搜索</h2>
          <div className="flex h-[calc(100%-28px)]">
            <div className="search-left w-150px overflow-y-auto">
              {Job.map((item) => {
                return (
                  <div
                    key={item.label}
                    className={classNames({
                      'py-4px pl-20px hover:cursor-pointer': true,
                      'bg-[var(--hover-color)] text-white hover:cursor-pointer': item.label == jobName
                    })}
                    onMouseEnter={() => handleJobChange(item.label)}>
                    <div className="text-[16px] ">{item.label}</div>
                  </div>
                )
              })}
            </div>
            <div className="ml-10px flex-1 overflow-y-auto">
              {findJobItem(jobName)?.children?.map((item) => {
                return (
                  <div key={item.label}>
                    <div>{item.label}</div>
                    <div className="flex flex-wrap p-10px text-gray ">
                      {item.children.map((iten) => {
                        return (
                          <div
                            key={iten.label}
                            onClick={() => handleJobClick(jobName, item.label, iten.label)}
                            className="rounded-[10px] px-[10px] py-4px hover:!text-[#1684FC] hover:cursor-pointer hover:bg-[#E1ECF9] ">
                            {iten.label}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className=" w-[685px] rounded-[10px] shadow-lg overflow-hidden">
          <div className=" bg-white rounded-[10px] shadow-lg">
            <Carousel autoplay>
              {banners.length > 0 ? (
                banners.map((banner) => {
                  return (
                    <div key={banner.imgUrl} onClick={() => handleBannerClick(banner.govUrl)} className="hover:cursor-pointer">
                      <img src={banner.imgUrl} className="w-full h-370px" />
                    </div>
                  )
                })
              ) : (
                <div>
                  <div className="flex">
                    <img src={Swiper01} className="w-full h-370px" />
                  </div>
                </div>
              )}
            </Carousel>
          </div>
        </div>
      </div>
      <div className="w-[1200px] m-auto pt-40px">
        <HotCompany />
        <HotJob />
        <CompanyCategory />
        <JobCategory />
      </div>
    </HomeWrapper>
  )
}

export default memo(Home)
